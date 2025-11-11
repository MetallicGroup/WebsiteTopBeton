import { google } from 'googleapis';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-sheet',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Google Sheet not connected');
  }
  return accessToken;
}

async function getUncachableGoogleSheetClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.sheets({ version: 'v4', auth: oauth2Client });
}

const SPREADSHEET_ID = '149AaASULSQglAzT9kc6dyNgs7d6JAI2Kzn-YjsiAGVg';
const SHEET_NAME = 'Cereri Oferte';

export interface QuoteSubmission {
  timestamp: string;
  sourcePage: string;
  formType: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  projectDetails?: string;
  metadataJSON: string;
}

export class SheetsService {
  async initialize() {
    try {
      const sheets = await getUncachableGoogleSheetClient();
      
      const response = await sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID,
      });

      const sheetExists = response.data.sheets?.some(
        sheet => sheet.properties?.title === SHEET_NAME
      );

      if (!sheetExists) {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: SPREADSHEET_ID,
          requestBody: {
            requests: [{
              addSheet: {
                properties: {
                  title: SHEET_NAME,
                }
              }
            }]
          }
        });

        await this.addHeaderRow();
      } else {
        const headerResponse = await sheets.spreadsheets.values.get({
          spreadsheetId: SPREADSHEET_ID,
          range: `${SHEET_NAME}!A1:I1`,
        });

        if (!headerResponse.data.values || headerResponse.data.values.length === 0) {
          await this.addHeaderRow();
        }
      }
    } catch (error) {
      console.error('Error initializing Google Sheet:', error);
      throw error;
    }
  }

  private async addHeaderRow() {
    const sheets = await getUncachableGoogleSheetClient();
    
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1:I1`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          'Timestamp',
          'Source Page',
          'Form Type',
          'Name',
          'Email',
          'Phone',
          'Message',
          'Project Details',
          'Metadata'
        ]]
      }
    });
  }

  async appendQuote(submission: QuoteSubmission): Promise<void> {
    try {
      const sheets = await getUncachableGoogleSheetClient();

      const values = [[
        submission.timestamp,
        submission.sourcePage,
        submission.formType,
        submission.name,
        submission.email,
        submission.phone || '',
        submission.message,
        submission.projectDetails || '',
        submission.metadataJSON
      ]];

      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:I`,
        valueInputOption: 'RAW',
        requestBody: {
          values
        }
      });
    } catch (error) {
      console.error('Error appending to Google Sheet:', error);
      throw error;
    }
  }
}

export const sheetsService = new SheetsService();
