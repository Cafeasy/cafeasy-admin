require('dotenv');
const path = require('path');
const process = require('process');

const { google } = require('googleapis');


const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];


const keyFile = process.env.SPREADSHEET_SERVICE_ACCOUNT_KEY;
const spreadsheetId = process.env.SPREADSHEET_ID;
const rangeSheet = process.env.SPREADSHEET_RANGE;

async function authentication() {
    const auth = new google.auth.GoogleAuth({
        keyFile: keyFile.toString(),
        scopes: SCOPES,
    });
    const authClient = await auth.getClient();
    return google.sheets({
        version: 'v4',
        auth: authClient,
    });
}

async function readSpreadsheet(client, sheetId, range) {
    const res = await client.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: range
    });
    return res.data.values;
}

async function _writeSpreadsheet(client, sheetId, range, data) {
    await client.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: range,
        valueInputOption: 'RAW',
        insertDataOption: 'OVERWRITE',
        resource: {
            "majorDimension": "ROWS",
            "values": data
        },
    });

}


exports.getSpreadsheet = async (req, res) => {
    const client = await authentication();
    try {
        const result = await readSpreadsheet(client, spreadsheetId, rangeSheet);
        res.status(200).json({ message: "Success Retreive data", data: result })
    } catch (err) {
        res.status(404).json({ message: "Failed Retreive data", data: err })
    }

}
exports.writeSpreadsheet = async (req, res) => {
    const client = await authentication();
    const newData = new Set([req.body.data]);
    const data = Array.from(newData);
    try {
        await _writeSpreadsheet(client, spreadsheetId, rangeSheet, data);
        console.log(data);
        res.status(200).json({ message: "Success Insert data", data: data })
    } catch (err) {
        res.status(404).json({ message: "Failed Insert data", data: err })
    }

}
