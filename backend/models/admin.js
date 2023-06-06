require("../config/database");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminModel = new Schema({

    id: {
        type: String, required: true
    },
    username: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },

},{versionKey : false,})


module.exports = mongoose.model('Admin', adminModel, 'admin');