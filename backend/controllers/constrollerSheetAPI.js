require("dotenv").config({ path: "../.env" });
const path = require('path');

const { google } = require('googleapis');


const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];


const keyFile = process.env.GOOGLE_CREDENTIALS;
const spreadsheetId = process.env.SPREADSHEET_ID;
// const rangeSheet = process.env.SPREADSHEET_RANGE;
const bookkeepingRange = process.env.BOOKKEEPING_SS_RANGE;
async function authentication() {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
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
    return res.data;
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

async function pembukuanHarian(client, spreadsheetId, rangeSummary, data) {


    const request = await (client.spreadsheets.values.batchUpdate({
        spreadsheetId: spreadsheetId,
        requestBody: {
            "valueInputOption": 'RAW',
            "data": [{
                "range": rangeSummary,
                "values": data
            }]


        },
    }));
    return request;
}
function modusPelanggan(data) {
    var max = 0;
    var counts = {};
    let langganan;
    for (let i = 0; i < data.length; i++) {
        counts[data[i][1]] = (counts[data[i][1]] + 1) || 1;
    }
    for (var key in counts) {
        if (counts.hasOwnProperty(key)) {

            if (counts[key] > max) {
                max = counts[key];
                langganan = key;
            }
        }
    }
    return (langganan + "+" + max);
}
exports.createSpreadsheet = async (req, res) => {
    const client = await authentication();
    const sheetName = req.body.sheetName;
    const data = req.body.data;

    const newData = [
        "Id Menu",
        "Nama Menu",
        "Deskripsi Menu",
        "Harga Menu",
        "Stok Menu",
        "Tanggal Update Terakhir",
    ];

    try {
        await getSpreadSheet(client, spreadsheetId, sheetName);
        const responseWrite = await _writeSpreadsheet(client, spreadsheetId, sheetName, data)
        res.status(200).json({ message: "Success Create New Spreadsheet", data: responseWrite });

    } catch {
        data.unshift(newData);
        try {
            const response = await createNewSpreadsheet(client, spreadsheetId, sheetName);
            await _writeSpreadsheet(client, spreadsheetId, sheetName, data);
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
        res.status(200).json({ message: "Success Retreive data", data: result.data.sheets })
    } catch (err) {
        res.status(404).json({ message: "Failed Retreive data", data: client })
    }

}
exports.writeSpreadsheet = async (req, res) => {
    const client = await authentication();
    const newData1 = req.body.data;
    const rangeSheet = 'Pembukuan Harian!A:Z';

    try {
        const response = await _writeSpreadsheet(client, spreadsheetId, rangeSheet, newData1);
        res.status(200).json({ message: "Success Create New Spreadsheet", data: JSON.stringify(response), dataSS: newData1[1] });

    } catch (err) {
        res.status(400).json({ message: "Failed Insert data", data: err })
    }

}
exports.writeBookkeepingSpreadsheet = async (req, res) => {
    const client = await authentication();
    const data = req.body.data;
    const rangeSheet = 'Pembukuan Harian!A:Z';
    let dataHarian = [];
    let tglCek, tgl, bln, tahun, tahunCek, blnCek, saveData, tglCek2, blnCek2, tahunCek2, saveData2;
    var count = 0;
    const spreadSheetHeader = ['Id Transaksi', 'Nama Pelanggan', 'Tanggal Transaksi', 'Total Pembayaran', 'Status Transaksi'];

    var totalPendapatan = 0;
    let dataSummary = [];

    try {
        const langganan = modusPelanggan(data).split("+");
        for (let i = 0; i < data.length; i++) {
            saveData = data[i][2].split("/");
            if (data[i + 1] != null) {
                saveData2 = data[i + 1][2].split("/");
            } else {
                saveData2 = data[i][2].split("/");
            }
            tglCek = parseInt(saveData[0], 10);
            blnCek = parseInt(saveData[1], 10);
            tahunCek = parseInt(saveData2[2], 10);
            tglCek2 = parseInt(saveData2[0], 10);
            blnCek2 = parseInt(saveData2[1], 10);
            tahunCek2 = parseInt(saveData2[2], 10);
            if (tglCek == tglCek2 && blnCek == blnCek2 && tahunCek == tahunCek2) {
                dataHarian.push(data[i]);
                count = count + 1;
            } else {
                tahun = `${tglCek}/${blnCek}/${tahunCek}`;
                tgl = tahun;
                dataHarian.splice(dataHarian.length - count, 0, ["Data Transaksi Pada Tanggal " + tgl]);
                dataHarian.splice(dataHarian.length - count, 0, spreadSheetHeader);
                dataHarian.push(data[i]);
                count = 0;
            }
            totalPendapatan = parseFloat(data[i][3]) + totalPendapatan;
        }
        dataSummary.push(['Summary Bookkeeping'], ["Total Pendapatan", "=", totalPendapatan], ["Pelanggan Paling Sering Memesan", "=", langganan[0].toString()], [`Total Pelanggan ${langganan[0]} Melakukan Pemesanan`, "=", langganan[1]])
        await _writeSpreadsheet(client, spreadsheetId, rangeSheet, dataHarian);
        await pembukuanHarian(client, spreadsheetId, bookkeepingRange, dataSummary);
        res.status(200).json({
            message: "OK"
        });
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
