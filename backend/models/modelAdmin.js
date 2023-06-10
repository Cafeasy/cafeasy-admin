require("../config/database");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({

    idAdmin: {
        type: String, required: true
    },
    emailCafe:{
        type: String, required: true
    },
    username: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },
    namaCafe: {
        type: String, required: true
    },
    alamatCafe: {
        type: String, required: true
    },
    deskripsiCafe: {
        type: String, required: true
    },
    namaPemilikCafe: {
        type: String, required: true
    },
    noHpCafe: {
        type: Number, required: true
    },
    fotoCafe: {
        type: String, required: true
    }

},{versionKey : false,})


module.exports = mongoose.model('DataAdmin', adminSchema, 'dataAdmin');