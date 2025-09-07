import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !phone) {
      return NextResponse.json({ error: 'All form fields are required.' }, { status: 400 });
    }

    // Environment variables for Google Sheets API credentials
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'); // Handle escaped newlines
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    if (!clientEmail || !privateKey || !spreadsheetId) {
      console.error('Missing Google Sheets API credentials in environment variables.');
      return NextResponse.json({ error: 'Server configuration error: Missing credentials.' }, { status: 500 });
    }

    // Authenticate with Google
    const auth = new JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Append row to the Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:E', // Assuming your sheet name is 'Sheet1' and you want to append to columns A-E
      valueInputOption: 'RAW',
      requestBody: {
        values: [[name, email, phone, message, new Date().toISOString()]], // Add timestamp
      },
    });

    return NextResponse.json({ success: true, message: 'Form data submitted successfully!' });
  } catch (error) {
    console.error('Error submitting form data to Google Sheets:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit form data.' }, { status: 500 });
  }
}
