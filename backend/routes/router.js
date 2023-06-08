require("dotenv").config();
const router = require("express").Router();
const express = require('express');
const app = express();
const {body} = require('express-validator');

//call auth to required
const authenticate = require('../auth/authenticate');

//here for call all controllers
const adminController = require('../controllers/admin');
const Spreadsheet = require('../controllers/sheetAPI');

//here for routing
router.post('/registerAdmin', [
    body('username').isLength({min: 4}).withMessage('Username minimal 4 karakter'), 
    body('password').isLength({min: 8}).withMessage('Password minimal 8 karakter'),
    body('namaCafe').isLength({min: 2}).withMessage('Nama Cafe minimal 2 karakter'),
    body('alamatCafe').isLength({min: 4}).withMessage('Alamat Cafe minimal 4 karakter'),
    body('namaPemilikCafe').isLength({min: 3}).withMessage('Nama Pemilik minimal 3 karakter'),
    body('noHpCafe').isLength({min: 9}).withMessage('Nomor Hp terkait minimal 9 karakter')],
    adminController.createAdmin);
router.post('/loginAdmin', adminController.loginAdmin);
router.get('/profile/:idAdmin', authenticate, adminController.getProfileAdmin);

router.get('/getSpreadsheet', Spreadsheet.getSpreadsheet);
module.exports = router;