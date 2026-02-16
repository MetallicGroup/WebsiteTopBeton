import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { quoteRequestSchema } from "@shared/schema";
import { sheetsService } from "./sheets";
import { sendPriceQuoteEmails, type PriceQuoteEmail } from "./email";
import { z } from "zod";

const STATION_ADDRESS = "Strada Barajului 7, Cornetu, Ilfov";

const PRETURI_BETON: Record<string, number> = {
  "C 8/10": 315,
  "C 12/15": 325,
  "C 16/20": 335,
  "C 20/25": 350,
  "C 25/30": 370,
  "C 30/37": 390,
};

const calculatorSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email(),
  zona: z.string().min(2),
  strada: z.string().min(2),
  cantitate: z.number().positive(),
  pompa: z.enum(["DA", "NU"]),
  clasa: z.string().refine(c => c in PRETURI_BETON, "Clasă invalidă"),
});

async function getDistanceKM(startAddress: string, endAddress: string): Promise<number> {
  const apiKey = process.env.ORS_API_KEY;
  if (!apiKey) return -1;

  try {
    const startRes = await fetch(
      `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(startAddress)}&boundary.country=RO`
    );
    const startData = await startRes.json() as any;
    const startCoords = startData.features?.[0]?.geometry?.coordinates;
    if (!startCoords) return -1;

    const endRes = await fetch(
      `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(endAddress)}&boundary.country=RO`
    );
    const endData = await endRes.json() as any;
    const endCoords = endData.features?.[0]?.geometry?.coordinates;
    if (!endCoords) return -1;

    const routeRes = await fetch(
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coordinates: [startCoords, endCoords] }),
      }
    );
    const routeData = await routeRes.json() as any;
    const meters = routeData.routes?.[0]?.summary?.distance;
    if (!meters) return -1;

    return parseFloat((meters / 1000).toFixed(1));
  } catch {
    return -1;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  try {
    await sheetsService.initialize();
    console.log('Google Sheets service initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Google Sheets service:', error);
  }

  app.post("/api/quotes", async (req, res) => {
    try {
      const validatedData = quoteRequestSchema.parse(req.body);

      const submission = {
        timestamp: new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' }),
        sourcePage: validatedData.sourcePage,
        formType: validatedData.formType,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message,
        projectDetails: validatedData.projectDetails,
        metadataJSON: validatedData.metadata ? JSON.stringify(validatedData.metadata) : '{}',
      };

      await sheetsService.appendQuote(submission);

      res.json({
        success: true,
        message: 'Cererea a fost trimisă cu succes'
      });
    } catch (error) {
      console.error('Error submitting quote:', error);

      if (error instanceof Error && 'issues' in error) {
        return res.status(400).json({
          success: false,
          message: 'Datele formularului sunt invalide',
          errors: error
        });
      }

      res.status(500).json({
        success: false,
        message: 'A apărut o eroare la trimiterea cererii'
      });
    }
  });

  app.post("/api/calculator", async (req, res) => {
    try {
      const data = calculatorSchema.parse(req.body);

      const pretMC = PRETURI_BETON[data.clasa];
      const costBeton = data.cantitate * pretMC;

      let costPompa = 0;
      if (data.pompa === "DA") {
        costPompa = Math.max(700, data.cantitate * 25);
      }

      const fullAddress = data.zona + ", " + data.strada;
      const kmOneWay = await getDistanceKM(STATION_ADDRESS, fullAddress);

      if (kmOneWay < 0) {
        return res.status(400).json({
          success: false,
          message: "Nu am putut calcula distanța. Verificați adresa introdusă.",
        });
      }

      const drumuri = Math.ceil(data.cantitate / 9);
      const kmTotal = kmOneWay * 2 * drumuri;
      const kmFacturati = Math.max(0, kmTotal - 20);
      const costTransport = kmFacturati * 15;

      const totalFaraTVA = costBeton + costPompa + costTransport;
      const totalCuTVA = Math.round(totalFaraTVA * 1.21);

      const emailData: PriceQuoteEmail = {
        clientName: data.name,
        clientPhone: data.phone,
        clientEmail: data.email,
        zona: data.zona,
        strada: data.strada,
        cantitate: data.cantitate,
        pompa: data.pompa,
        clasa: data.clasa,
        pretMC,
        costBeton,
        costPompa,
        costTransport,
        kmOneWay,
        drumuri,
        totalFaraTVA,
        totalCuTVA,
      };

      try {
        await sendPriceQuoteEmails(emailData);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }

      try {
        await sheetsService.appendQuote({
          timestamp: new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' }),
          sourcePage: '/calculator',
          formType: 'calculator_pret',
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: `${data.clasa} / ${data.cantitate} mc / pompă: ${data.pompa}`,
          projectDetails: `Zonă: ${data.zona}, Strada: ${data.strada} | Distanță: ${kmOneWay} km | Total: ${totalCuTVA} lei cu TVA`,
          metadataJSON: JSON.stringify(emailData),
        });
      } catch (sheetError) {
        console.error('Google Sheets logging failed:', sheetError);
      }

      res.json({
        success: true,
        totalCuTVA,
        totalFaraTVA,
        costBeton,
        costPompa,
        costTransport,
        pretMC,
        kmOneWay,
        drumuri,
      });
    } catch (error) {
      console.error('Calculator error:', error);

      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Datele introduse sunt invalide',
        });
      }

      res.status(500).json({
        success: false,
        message: 'A apărut o eroare la calcularea prețului',
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
