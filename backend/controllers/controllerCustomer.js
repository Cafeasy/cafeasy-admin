const { validationResult } = require("express-validator");
const DataCustomer = require("../models/modelCustomer");

exports.getAllCustomer = (req, res, next) => {

    try {
        DataCustomer.find({}).then(result => {
            res.status(200).json({
                message: "Berhasil memanggil semua data customer",
                data: result
            })
        }).catch(error => {
            next(error);
        })
    } catch (error) {
        res.status(400).json({ message: "gagal mengambil data customer", data: error })
    }
}

exports.deleteCustomerById = (req, res, next) => {
    const idPelanggan = req.params.idPelanggan;

    try {
        DataCustomer.deleteOne(({id: `${idPelanggan}`}))
        .then(result => {
            res.status(200).json({
                message: "Berhasil menghapus data customer berdasarkan id",
                data: result
            })
        }).catch(error => {
            next(error);
        })
    } catch (error) {
        res.status(400).json({ message: "gagal menghapus data customer", data: error })
    }
}

exports.deleteAllCustomer = (req, res, next) => {

    try {
        DataCustomer.deleteMany({}).then(result => {
            res.status(200).json({
                message: "Berhasil menghapus semua data customer",
                data: result
            })
        }).catch(error => {
            next(error);
        })
    } catch (error) {
        res.status(400).json({ message: "gagal menghapus data customer", data: error })
    }
}