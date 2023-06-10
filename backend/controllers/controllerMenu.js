const Menu = require("../models/modelMenu");
const {validationResult} = require('express-validator');

exports.getAvailableMenu = (req, res, next) => {
    Menu.find({ stokMenu: {$gt: 0} })
        .then(result => {
            res.status(200).json({
                message: 'Data menu available berhasil dipanggil',
                data: result
            })
        }).catch(err => {
            next(err);
        })
    
}

exports.getNotAvailableMenu = (req, res, next) => {
    Menu.find({ stokMenu: {$lt: 1} })
        .then(result => {
            res.status(200).json({
                message: 'Data menu not available berhasil dipanggil',
                data: result
            })
        }).catch(err => {
            next(err);
        })
    
}

exports.getMenuByCategory = (req, res, next) => {
    const kategoriMenu = req.params.kategoriMenu;
    Menu.find({ kategoriMenu: `${kategoriMenu}` })
        .then(result => {
            res.status(200).json({
                message: 'Data menu berdasarkan kategori berhasil dipanggil',
                data: result
            })
        })
        .catch(err => {
            next(err);
        })
}

exports.getMenuDetail = (req, res, next) => {
    const idMenu = req.params.idMenu;
    Menu.find({ idMenu: `${idMenu}` })
        .then(result => {
            res.status(200).json({
                message: 'Data detail menu berhasil dipanggil',
                data: result
            })
        }
        )
        .catch(err => {
            next(err);
        })
}

exports.insertNewMenu = async (req, res, next) => { //belum di tambah ke api perlu min input
    //check inputan form valid
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('input form tidak sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        return res.send(err);
    }

    if(!req.file) {
        const err = new Error('image harus diupload');
        err.errorStatus = 422;
        return res.send(err.message);
    }

    var uniqueid = (Math.random()).toString(32).slice(2, 8);
    var idMenu = "menus-" + uniqueid;
    var namaMenu = req.body.namaMenu;

    Menu.findOne({namaMenu: namaMenu}).then(result => {
        if(!result) {
            const insertNewMenu = new Menu({
                idMenu: idMenu,
                namaMenu: namaMenu,
                hargaMenu: req.body.hargaMenu,
                stokMenu: req.body.stokMenu,
                deskripsiMenu: req.body.deskripsiMenu,
                kategoriMenu: req.body.kategoriMenu,
                image: req.file.path
            })
        
            insertNewMenu.save().then(result => {
                res.status(200).json({
                    message: "Menu berhasil ditambahkan",
                    data: result
                })
            }).catch(err => {
                next(err)
            })
        }
    })
}

exports.updateDataMenu = async (req, res, next) => { //belum di tambah ke api perlu min input
    const idMenu = req.params.idMenu;
    const namaMenu = req.body.namaMenu;
    const hargaMenu = req.body.hargaMenu;
    const stokMenu = req.body.stokMenu;
    const deskripsiMenu = req.body.deskripsiMenu;
    const kategoriMenu = req.body.kategoriMenu;

    Menu.findOneAndUpdate({idMenu: `${idMenu}`}, 
    { $set: { 
        namaMenu: `${namaMenu}`, 
        hargaMenu: `${hargaMenu}`, 
        stokMenu: `${stokMenu}`,
        deskripsiMenu: `${deskripsiMenu}`,
        kategoriMenu: `${kategoriMenu}`
        } }, { new: true })
        .then(result => {
            res.status(200).json({
                message: 'Berhasil update data menu',
                data: result
            })
        })
        .catch(err => {
            next(err);
    })
}

exports.updateFotoMenu = (req, res, next) => { //belum di tambah ke api perlu min input
    const idMenu = req.params.idMenu;
    const image = req.file.path;

    Menu.findOneAndUpdate({idMenu: `${idMenu}`}, { $set: {image: image} }, { new: true })
        .then(result => {
            res.status(200).json({
                message: 'Berhasil update foto menu',
                data: result
            })
        })
        .catch(err => {
            next(err);
    })
}