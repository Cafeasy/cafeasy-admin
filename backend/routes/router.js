require("dotenv").config();
const router = require("express").Router();
const express = require('express');
const app = express();

//here for call all controllers
const adminController = require('../controllers/admin');
const Spreadsheet = require('../controllers/sheetAPI');
//here for routing
router.post('/registerAdmin', adminController.createAdmin);
router.get('/profile/:idAdmin', adminController.getProfileAdmin);

router.get('/getSpreadsheet', Spreadsheet.getSpreadsheet);
module.exports = router;