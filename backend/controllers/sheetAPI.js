require('dotenv');
const { google } = require('googleapis');
const sheets = google.sheets('v4');
const path = require('path');
const {authenticate} = require('@google-cloud/local-auth');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

exports.getSpreadsheet = (req, res) => {


    async function main() {
        const authClient = await authorize();
        const request = {
            spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
            ranges: [SPREADSHEET_RANGE],
            includeGridData: false,
            auth: authClient,
        };

        try {
            const response = (await sheets.spreadsheets.get(request)).data;
            res.status(200).json({ message: "Berhasil Get Spreadsheet", data: response })
            console.log(JSON.stringify(response, null, 2));
        } catch (err) {
            res.status(400).json({ message: "Gagal Get Spreadsheet", data: err })
            console.error(err);
        }
    }
    main();
}
async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}

async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}
async function authorize() {

    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}