const { validationResult } = require("express-validator");
const DataCustomer = require("../models/modelCustomer");

exports.getAllCustomer = (req, res, next) => {
    DataCustomer.find({}).then(result => {
        res.status(200).json({
            message: "Berhasil memanggil semua data customer",
            data: result
        })
    }).catch(error => {
        res.status(404).json({
            message: "Gagal memanggil semua data customer",
            error: error
        })
    })
}

exports.deleteCustomerById = (req, res, next) => {
    const idPelanggan = req.params.idPelanggan;
    DataCustomer.deleteOne(({id: `${idPelanggan}`}))
    .then(result => {
        res.status(200).json({
            message: "Berhasil menghapus data customer berdasarkan id",
            data: result
        })
    }).catch(error => {
        res.status(404).json({
            message: "Gagal menghapus data customer berdasarkan id",
            error: error
        })
    })
}

exports.deleteAllCustomer = (req, res, next) => {
    DataCustomer.deleteMany({}).then(result => {
        res.status(200).json({
            message: "Berhasil menghapus semua data customer",
            data: result
        })
    }).catch(error => {
        res.status(404).json({
            message: "Gagal menghapus semua data customer",
            error: error
        })
    })
}