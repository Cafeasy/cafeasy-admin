const kategoriMenu = require("../models/modelKategoriMenu");
const {validationResult} = require('express-validator');

exports.getAllKategoriMenu = (req, res, next) => {

    try {
        kategoriMenu.find({}).then(result => {
            res.status(200).json({
                message: 'Data semua kategori menu berhasil dipanggil',
                data: result
            })
        }).catch(error => {
            next(error);
        })
    } catch (error) {
        res.status(401).send({ message: "gagal mengambil data kategori", data: error });
    }
}

exports.insertKategoriMenu = async (req, res, next) => {
    //check inputan form valid
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('input form tidak sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        return res.send(err);
    }

    var uniqueid = (Math.random()).toString(32).slice(2, 8);
    var idKategori = "kt-" + uniqueid;
    var namaKategori = req.body.namaKategori;

    try {

        const ktMenu = await kategoriMenu.findOne({namaKategori: namaKategori})
            if(!ktMenu) {
                const insertKategoriMenu = new kategoriMenu({
                    idKategori: idKategori,
                    namaKategori: namaKategori,
                })
            
                insertKategoriMenu.save().then(result => {
                    res.status(200).json({
                        message: "Kategori menu berhasil ditambahkan",
                        data: result
                    })
                }).catch(error => {
                    next(error);
                })
            } else if (ktMenu) {
                res.json({
                    message: "Nama kategori menu sudah ada, coba nama lain"
                })
            }
    } catch (error) {
        res.status(401).send({ message: "gagal insert kategori", data: error });
    }
}

exports.updateKategoriMenu = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const err = new Error('input form tidak sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        return res.send(err);
    }
    
    const idKategori = req.params.idKategori;
    const namaKategori = req.body.namaKategori;

    try {

        kategoriMenu.findOneAndUpdate({idKategori: `${idKategori}`}, 
        { $set: { 
            namaKategori: `${namaKategori}`
            } }, { new: true })
            .then(result => {
                res.status(200).json({
                    message: 'Berhasil update data kategori menu',
                    data: result
                })
            })
            .catch(error => {
                next(error);
            })
    } catch (error) {
        res.status(401).send({ message: "gagal update kategori", data: error });
    }
}

exports.deleteKategoriMenuById = (req, res, next) => {
    const idKategori = req.params.idKategori;
    
    try {
        kategoriMenu.deleteOne({idKategori: `${idKategori}`}).then(result => {
            res.status(200).json({
                message: "Berhasil menghapus kategori menu berdasarkan id",
                data: result
            })
        }).catch(error => {
            next(error);
        })
    } catch (error) {
        res.status(401).send({ message: "gagal hapus kategori", data: error });
    }
}

exports.deleteAllKategoriMenu = (req, res, next) => {

    try {
        kategoriMenu.deleteMany({}).then(result => {
            res.status(200).json({
                message: "Berhasil menghapus semua kategori menu",
                data: result
            })
        }).catch(error => {
            next(error);
        })
    } catch(error) {
        res.status(401).send({ message: "gagal hapus kategori", data: error });
    }
}