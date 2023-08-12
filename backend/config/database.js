require("dotenv").config({path: '../.env'});
const express = require("express");
const app = express();
const mongoose = require('mongoose');

const url = process.env.MONGO_SERVER_URL;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const client = mongoose.connection;
client.on('error', (error) => console.log(error));
client.once('open', () => console.log('Database Connected...'));