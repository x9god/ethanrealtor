import { google } from 'googleapis';
import * as XLSX from 'xlsx';

export async function GET() {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                type: 'service_account',
                project_id: process.env.GOOGLE_PROJECT_ID,
                private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
            },
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        });

        const drive = google.drive({ version: 'v3', auth });
        const fileId = process.env.GOOGLE_DRIVE_FILE_ID;

        if (!fileId) {
            return new Response(JSON.stringify({ error: 'Missing GOOGLE_FILE_ID' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const response = await drive.files.get(
            { fileId, alt: 'media' },
            { responseType: 'arraybuffer' }
        );



        const workbook = XLSX.read(response.data, { type: 'buffer' });
        // const firstSheetName = workbook.SheetNames[0];
        // const sheet = workbook.Sheets[firstSheetName];
        // const jsonData = XLSX.utils.sheet_to_json(sheet);
        const allSheets = {};
        workbook.SheetNames.forEach((sheetName) => {
            const sheet = workbook.Sheets[sheetName];
            allSheets[sheetName] = XLSX.utils.sheet_to_json(sheet);
        });

        return new Response(JSON.stringify(allSheets, null, 2), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Failed to parse Excel' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
