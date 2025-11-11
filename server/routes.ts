import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { quoteRequestSchema } from "@shared/schema";
import { sheetsService } from "./sheets";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize Google Sheets service
  try {
    await sheetsService.initialize();
    console.log('✅ Google Sheets service initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize Google Sheets service:', error);
  }

  // Quote request submission endpoint
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

  const httpServer = createServer(app);

  return httpServer;
}
