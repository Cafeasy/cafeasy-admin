require("dotenv").config({ path: "../.env" });
const path = require('path');

const { google } = require('googleapis');


const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];


const keyFile = process.env.GOOGLE_CREDENTIALS;
const spreadsheetId = process.env.SPREADSHEET_ID;
const rangeSheet = process.env.SPREADSHEET_RANGE;

async function authentication() {
    const auth = new google.auth.GoogleAuth({
        keyFile: '../backend/credentials.json',
        scopes: SCOPES,
    });
    const authClient = await auth.getClient();
    return google.sheets({
        version: 'v4',
        auth: authClient,
    });
}

async function getSheetList(client, sheetId) {
    const response = await client.spreadsheets.get({
        spreadsheetId: sheetId,
    })
    return response;
}
async function readSpreadsheet(client, sheetId, range) {
    const res = await client.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: range
    });
    return res.data.values;
}

async function _writeSpreadsheet(client, sheetId, range, data) {
    const request = await (client.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: range,
        valueInputOption: 'RAW',
        insertDataOption: 'OVERWRITE',
        requestBody: {

            "values": data
        },
    }));
    return request;
}

async function createNewSpreadsheet(client, sheetsId, title) {

    const response = await client.spreadsheets.batchUpdate({
        spreadsheetId: sheetsId,
        resource: {
            requests: [{
                addSheet: {

                    properties: {

                        title: title,

                        sheetType: "GRID",

                    }
                }
            }]
        }
    });
    return response;

}

async function getSpreadSheet(client, sheetsId) {
    const response = await client.spreadsheets.get({
        spreadsheetId: sheetsId,
    })
    return response;
}

exports.createSpreadsheet = async (req, res) => {
    const client = await authentication();
    const sheetName = req.body.sheetName;
    const data = req.body.data
    try {
        await getSpreadSheet(client, spreadsheetId, sheetName);
        const responseWrite = await _writeSpreadsheet(client, spreadsheetId, sheetName, data)
        res.status(200).json({ message: "Success Create New Spreadsheet", data: responseWrite });

    } catch {
        try {
            const response = await createNewSpreadsheet(client, spreadsheetId, sheetName);
            await _writeSpreadsheet(client, spreadsheetId, sheetName, data)
            res.status(201).json({ message: "Success Create New Spreadsheet", data: response });
        } catch (er) {
            res.status(400).json({ message: "Failed Retreive data", data: er })
        }
    }

}


exports.getSpreadsheet = async (req, res) => {
    const client = await authentication();
    try {
        const result = await getSheetList(client, spreadsheetId);
        res.status(200).json({ message: "Success Retreive data", data: result.data.sheets, auth: client })
    } catch (err) {
        res.status(404).json({ message: "Failed Retreive data", data: client })
    }

}
exports.writeSpreadsheet = async (req, res) => {
    const client = await authentication();
    const newData1 = req.body.data;
    try {
        const response = await _writeSpreadsheet(client, spreadsheetId, rangeSheet, newData1);
        res.status(200).json({ message: "Success Create New Spreadsheet", data: JSON.stringify(response) });

    } catch (err) {
        res.status(400).json({ message: "Failed Insert data", data: err })
    }

}

exports.readSpreadsheets = async (req, res) => {
    const client = await authentication();

    try {
        const sheetList = await getSheetList(client, spreadsheetId);
        let sheetListValue = [];
        let sheetValues = [];
        let response;
        let sheetRanges;
        for (var i = 0; i < sheetList.data.sheets.length; i++) {
            sheetRanges = sheetList.data.sheets[i].properties.title.toString() + '!A:Z';
            response = await readSpreadsheet(client, spreadsheetId, sheetRanges);
            sheetListValue[i] = sheetRanges;
            sheetValues[i] = response;
        }

        res.status(200).json({
            message: "Get Sheet Data", data: {
                sheet: sheetListValue,
                values: sheetValues
            }
        })

    } catch (err) {
        res.status(400).json({ message: "Failed Read Data", err: err })
    }
}