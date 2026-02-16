import { Resend } from 'resend';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? 'depl ' + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return { apiKey: connectionSettings.settings.api_key, fromEmail: connectionSettings.settings.from_email };
}

async function getUncachableResendClient() {
  const { apiKey, fromEmail } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail
  };
}

export interface PriceQuoteEmail {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  zona: string;
  strada: string;
  cantitate: number;
  pompa: string;
  clasa: string;
  pretMC: number;
  costBeton: number;
  costPompa: number;
  costTransport: number;
  kmOneWay: number;
  drumuri: number;
  totalFaraTVA: number;
  totalCuTVA: number;
}

function buildEmailHTML(data: PriceQuoteEmail, isForClient: boolean): string {
  const title = isForClient
    ? `Oferta dumneavoastră de preț - Top Beton SRL`
    : `Cerere nouă de ofertă - ${data.clientName}`;

  const greeting = isForClient
    ? `Stimate/Stimată ${data.clientName},`
    : `O nouă cerere de ofertă a fost primită:`;

  const footer = isForClient
    ? `<p style="margin-top:24px;">Un agent vă va contacta în scurt timp pentru confirmarea comenzii.</p>
       <p>Cu stimă,<br/><strong>Echipa Top Beton SRL</strong><br/>Tel: 0752 400 200<br/>Email: office@topbeton.ro</p>`
    : `<p style="margin-top:24px;"><strong>Contact client:</strong><br/>Tel: ${data.clientPhone}<br/>Email: ${data.clientEmail}</p>`;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333;">
  <div style="background:#2d7a50;padding:20px;border-radius:8px 8px 0 0;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:22px;">Top Beton SRL</h1>
    <p style="color:#e8f5e9;margin:4px 0 0;">Mergi pe calitate.</p>
  </div>

  <div style="background:#fff;border:1px solid #e0e0e0;border-top:none;padding:24px;border-radius:0 0 8px 8px;">
    <h2 style="color:#2d7a50;margin-top:0;">${title}</h2>
    <p>${greeting}</p>

    <table style="width:100%;border-collapse:collapse;margin:16px 0;">
      <tr style="background:#f5f5f5;">
        <td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Client</td>
        <td style="padding:10px;border:1px solid #ddd;">${data.clientName}</td>
      </tr>
      <tr>
        <td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Telefon</td>
        <td style="padding:10px;border:1px solid #ddd;">${data.clientPhone}</td>
      </tr>
      <tr style="background:#f5f5f5;">
        <td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Email</td>
        <td style="padding:10px;border:1px solid #ddd;">${data.clientEmail}</td>
      </tr>
      <tr>
        <td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Locație</td>
        <td style="padding:10px;border:1px solid #ddd;">${data.zona}, ${data.strada}</td>
      </tr>
    </table>

    <h3 style="color:#2d7a50;margin-top:24px;">Detalii ofertă</h3>
    <table style="width:100%;border-collapse:collapse;margin:16px 0;">
      <tr style="background:#f5f5f5;">
        <td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Clasă beton</td>
        <td style="padding:10px;border:1px solid #ddd;">${data.clasa}</td>
      </tr>
      <tr>
        <td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Cantitate</td>
        <td style="padding:10px;border:1px solid #ddd;">${data.cantitate} mc</td>
      </tr>
      <tr style="background:#f5f5f5;">
        <td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Pompă</td>
        <td style="padding:10px;border:1px solid #ddd;">${data.pompa === 'DA' ? 'Da' : 'Nu'}</td>
      </tr>
      <tr>
        <td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Preț/mc</td>
        <td style="padding:10px;border:1px solid #ddd;">${data.pretMC} lei</td>
      </tr>
      <tr style="background:#f5f5f5;">
        <td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Cost beton</td>
        <td style="padding:10px;border:1px solid #ddd;">${data.costBeton} lei</td>
      </tr>
      <tr>
        <td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Cost pompă</td>
        <td style="padding:10px;border:1px solid #ddd;">${data.costPompa} lei</td>
      </tr>
      <tr style="background:#f5f5f5;">
        <td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Distanță</td>
        <td style="padding:10px;border:1px solid #ddd;">${data.kmOneWay} km (${data.drumuri} ${data.drumuri === 1 ? 'transport' : 'transporturi'})</td>
      </tr>
      <tr>
        <td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Cost transport</td>
        <td style="padding:10px;border:1px solid #ddd;">${data.costTransport} lei</td>
      </tr>
    </table>

    <div style="background:#2d7a50;color:#fff;padding:16px;border-radius:8px;text-align:center;margin-top:20px;">
      <p style="margin:0;font-size:14px;">TOTAL (fără TVA): ${data.totalFaraTVA} lei</p>
      <p style="margin:8px 0 0;font-size:22px;font-weight:bold;">TOTAL cu TVA: ${data.totalCuTVA} lei</p>
    </div>

    ${footer}
  </div>

  <div style="text-align:center;margin-top:16px;color:#999;font-size:12px;">
    <p>Top Beton SRL | Str. Barajului nr. 7, Cornetu, Ilfov | 0752 400 200</p>
  </div>
</body>
</html>`;
}

export async function sendPriceQuoteEmails(data: PriceQuoteEmail): Promise<void> {
  const { client, fromEmail } = await getUncachableResendClient();

  const senderEmail = fromEmail || 'onboarding@resend.dev';

  await client.emails.send({
    from: `Top Beton SRL <${senderEmail}>`,
    to: [data.clientEmail],
    subject: `Oferta de preț beton ${data.clasa} - ${data.cantitate} mc | Top Beton SRL`,
    html: buildEmailHTML(data, true),
  });

  await client.emails.send({
    from: `Top Beton Calculator <${senderEmail}>`,
    to: ['danudda2810@gmail.com'],
    subject: `Cerere nouă: ${data.clientName} - ${data.clasa} / ${data.cantitate} mc`,
    html: buildEmailHTML(data, false),
  });
}
