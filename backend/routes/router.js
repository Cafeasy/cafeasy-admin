require("dotenv").config();
const router = require("express").Router();
const express = require('express');
const app = express();
const { body } = require('express-validator');

//call auth to required
const authenticate = require('../auth/authenticate');

//here for call all controllers
const adminController = require('../controllers/controllerAdmin');
const transaksiController = require('../controllers/controllerTransaksi');
const menuController = require('../controllers/controllerMenu');
const kategoriMenuController = require('../controllers/controllerKategoriMenu');
const bannerController = require('../controllers/controllerBanner');
const customerController = require('../controllers/controllerCustomer');
const Spreadsheet = require('../controllers/constrollerSheetAPI');


//here for routing
//routes regis-login-logout admin
router.post('/registerAdmin', [
    body('username').isLength({ min: 4 }).withMessage('Username minimal 4 karakter'),
    body('password').isLength({ min: 8 }).withMessage('Password minimal 8 karakter'),
    body('namaCafe').isLength({ min: 2 }).withMessage('Nama Cafe minimal 2 karakter'),
    body('alamatCafe').isLength({ min: 4 }).withMessage('Alamat Cafe minimal 4 karakter'),
    body('namaPemilikCafe').isLength({ min: 3 }).withMessage('Nama Pemilik minimal 3 karakter'),
    body('noHpCafe').isLength({ min: 9 }).withMessage('Nomor Hp terkait minimal 9 karakter')],
    adminController.createAdmin);
router.post('/login', adminController.loginAdmin);
router.post('/logout', adminController.logoutAdmin);

//routes kelola data profile
router.get('/profile/:idAdmin', adminController.getProfileAdmin);
router.put('/updateProfile/:idAdmin', [
    body('username').isLength({ min: 4 }).withMessage('Username minimal 4 karakter'),
    body('password').isLength({ min: 8 }).withMessage('Password minimal 8 karakter'),
    body('namaCafe').isLength({ min: 2 }).withMessage('Nama Cafe minimal 2 karakter'),
    body('alamatCafe').isLength({ min: 4 }).withMessage('Alamat Cafe minimal 4 karakter'),
    body('namaPemilikCafe').isLength({ min: 3 }).withMessage('Nama Pemilik minimal 3 karakter'),
    body('noHpCafe').isLength({ min: 9 }).withMessage('Nomor Hp terkait minimal 9 karakter')],
    adminController.updateProfileAdmin);

router.get('/getAdminByName/:username', adminController.getProfileAdminByName);

//routes kelola data transaksi
router.get('/transaksi', transaksiController.getAllTransaksiPelanggan);
router.get('/detailTransaksi/:idTransaksi', transaksiController.getDetailTransaksi);
router.delete('/deleteAllTransaksi', transaksiController.deleteAllTransaksi);
router.delete('/deleteTransaksiById/:idTransaksi', transaksiController.deleteTransaksiById);
router.put('/updateStatusBayarCash/:idTransaksi', transaksiController.updateStatusBayarCash);

//routes kelola data menu
router.get('/menu', menuController.getAllMenu);
router.get('/availableMenu', menuController.getAvailableMenu);
router.get('/notAvailableMenu', menuController.getNotAvailableMenu);
router.get('/menuByCategory/:kategoriMenu', menuController.getMenuByCategory);
router.get('/detailMenu/:idMenu', menuController.getMenuDetail);
router.post('/insertMenu', [
    body('namaMenu').isLength({ min: 3 }).withMessage('Nama Menu minimal 3 karakter'),
    body('hargaMenu').isInt({ min: 2000 }).withMessage('Harga Menu minimal diatas Rp.2000'),
    body('stokMenu').isInt({ min: 1 }).withMessage('Stok Menu minimal 1'),
], menuController.insertNewMenu);
router.put('/updateDataMenu/:idMenu', [
    body('namaMenu').isLength({ min: 3 }).withMessage('Nama Menu minimal 3 karakter'),
    body('hargaMenu').isInt({ min: 2000 }).withMessage('Harga Menu minimal diatas Rp.2000'),
    body('stokMenu').isInt({ min: 1 }).withMessage('Stok Menu minimal 1'),
], menuController.updateDataMenu);
router.delete('/deleteMenuById/:idMenu', menuController.deleteMenuById);
router.delete('/deleteAllMenu', menuController.deleteAllMenu);

//routes kelola data kategori menu
router.get('/kategoriMenu', kategoriMenuController.getAllKategoriMenu);
router.post('/insertKategoriMenu', [
    body('namaKategori').isLength({ min: 3 }).withMessage('Nama Kategori Menu minimal 3 karakter')
], kategoriMenuController.insertKategoriMenu);
router.put('/updateKategoriMenu/:idKategori', [
    body('namaKategori').isLength({ min: 3 }).withMessage('Nama Kategori Menu minimal 3 karakter')
], kategoriMenuController.updateKategoriMenu);
router.delete('/deleteKategoriMenuById/:idKategori', kategoriMenuController.deleteKategoriMenuById);
router.delete('/deleteAllKategoriMenu', kategoriMenuController.deleteAllKategoriMenu);

//router kelola data customer
router.get('/customer', customerController.getAllCustomer);
router.delete('/deleteCustomerById/:idPelanggan', customerController.deleteCustomerById);
router.delete('/deleteAllCustomer', customerController.deleteAllCustomer);

//router kelola data banner
router.get('/banner', bannerController.getAllBanner);
router.get('/bannerById/:idBanner', bannerController.getBannerById);
router.post('/insertBanner', [
    body('namaBanner').isLength({ min: 3 }).withMessage('Nama banner minimal 3 karakter')
], bannerController.insertNewBanner);
router.delete('/deleteBannerById/:idBanner', bannerController.deleteBannerById);
router.delete('/deleteAllBanner', bannerController.deleteAllBanner);

router.get('/getSpreadsheet', Spreadsheet.getSpreadsheet);
router.get('/getSheet/:sheetName', Spreadsheet.getSheets);
router.post('/createNewSpreadsheet', Spreadsheet.createSpreadsheet);
router.post('/writeSpreadsheet', Spreadsheet.writeSpreadsheet);
module.exports = router;