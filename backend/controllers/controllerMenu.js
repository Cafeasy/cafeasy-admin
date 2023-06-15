const Menu = require("../models/modelMenu");
const {validationResult} = require('express-validator');
const config = require('../config/firebaseConfig');

const {initializeApp} = require('firebase/app');
const {getStorage} = require('firebase/storage');
const {ref} = require('firebase/storage');
const {getDownloadURL} = require('firebase/storage');
const {uploadBytesResumable} = require('firebase/storage');
const {deleteObject} = require('firebase/storage');

initializeApp(config.firebaseConfig);
const storage = getStorage();

exports.getAllMenu = (req, res, next) => {
    Menu.find({}).then(result => {
        if(result) {
            res.status(200).json({
                message: 'Data semua menu berhasil dipanggil',
                data: result
            })
        } else if(!result) {
            res.status(404).json({
                message: 'Data semua menu gagal dipanggil',
                data: result
            })
        }
    }).catch(err => {
        next(err)
    })
}

exports.getAvailableMenu = (req, res, next) => {
    Menu.find({ stokMenu: {$gt: 0} })
        .then(result => {
            if(result) {
                res.status(200).json({
                    message: 'Data menu available berhasil dipanggil',
                    data: result
                })
            } else if(!result) {
                res.status(404).json({
                    message: 'Data menu available gagal dipanggil',
                    data: result
                })
            }
        }).catch(err => {
            next(err);
    })
}

exports.getNotAvailableMenu = (req, res, next) => {
    Menu.find({ stokMenu: {$lt: 1} })
        .then(result => {
            if(result) {
                res.status(200).json({
                    message: 'Data menu not available berhasil dipanggil',
                    data: result
                })
            } else if(!result) {
                res.status(404).json({
                    message: 'Data menu not available gagal dipanggil',
                    data: result
                })
            }
        }).catch(err => {
            next(err);
    })
    
}

exports.getMenuByCategory = (req, res, next) => {
    const kategoriMenu = req.params.kategoriMenu;
    Menu.find({ kategoriMenu: `${kategoriMenu}` })
        .then(result => {
            if(result) {
                res.status(200).json({
                    message: 'Data menu berdasarkan kategori berhasil dipanggil',
                    data: result
                })
            } else if(!result) {
                res.status(404).json({
                    message: 'Data menu berdasarkan kategori gagal dipanggil',
                    data: result
                })
            }
        })
        .catch(err => {
            next(err);
    })
}

exports.getMenuDetail = (req, res, next) => {
    const idMenu = req.params.idMenu;
    Menu.find({ idMenu: `${idMenu}` })
        .then(result => {
            if(result) {
                res.status(200).json({
                    message: 'Data detail menu berhasil dipanggil',
                    data: result
                })
            } else if(!result) {
                res.status(404).json({
                    message: 'Data detail menu gagal dipanggil',
                    data: result
                })
            }
        }
        )
        .catch(err => {
            next(err);
    })
}

exports.insertNewMenu = async (req, res, next) => { 
    //check inputan form valid
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('input form tidak sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        return res.send(err);
    }

    if(!req.file) {
        const err = new Error('image harus diupload, pastikan format image berupa png/jpg/jpeg');
        err.errorStatus = 422;
        return res.send(err.message);
    }

    var uniqueid = (Math.random()).toString(32).slice(2, 8);
    var idMenu = "menu-" + uniqueid;
    var namaMenu = req.body.namaMenu;

    const menu = await Menu.findOne({namaMenu: namaMenu})
        if(!menu) {
            const storageRef = ref(storage, `menuPict/${idMenu}`);

            const metadata = {
                contentType: req.file.mimetype,
            };

            const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);

            const insertNewMenu = new Menu({
                idMenu: idMenu,
                namaMenu: namaMenu,
                hargaMenu: req.body.hargaMenu,
                stokMenu: req.body.stokMenu,
                deskripsiMenu: req.body.deskripsiMenu,
                kategoriMenu: req.body.kategoriMenu,
                image: `menuPict/${idMenu}`,
                imageUrl: downloadURL
            })
        
            insertNewMenu.save().then(result => {
                res.status(200).json({
                    message: "Menu berhasil ditambahkan",
                    data: result
                })
            }).catch(err => {
                next(err)
            })
        } else if (menu) {
            res.json({
                message: "nama menu sudah ada, coba menu lain"
            })
        }
}

exports.updateDataMenu = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const err = new Error('input form tidak sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        return res.send(err);
    }

    if(!req.file) {
        const err = new Error('image harus diupload, pastikan format image berupa png/jpg/jpeg');
        err.errorStatus = 422;
        return res.send(err.message);
    }
    
    const idMenu = req.params.idMenu;
    const namaMenu = req.body.namaMenu;
    const hargaMenu = req.body.hargaMenu;
    const stokMenu = req.body.stokMenu;
    const deskripsiMenu = req.body.deskripsiMenu;
    const kategoriMenu = req.body.kategoriMenu;

    const storageRef = ref(storage, `menuPict/${idMenu}`);
    if(storageRef==true){
        await deleteObject(storageRef);
    }

    const metadata = {
        contentType: req.file.mimetype,
    };

    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);

    const image = `menuPict/${idMenu}`;
    const imageUrl = downloadURL;

    Menu.findOneAndUpdate({idMenu: `${idMenu}`}, 
    { $set: { 
        namaMenu: `${namaMenu}`, 
        hargaMenu: `${hargaMenu}`, 
        stokMenu: `${stokMenu}`,
        deskripsiMenu: `${deskripsiMenu}`,
        kategoriMenu: `${kategoriMenu}`,
        image: `${image}`,
        imageUrl: `${imageUrl}`
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

exports.deleteMenuById = (req, res, next) => {
    const idMenu = req.params.idMenu;

    Menu.deleteOne({idMenu: `${idMenu}`}).then(result => {
        if(result) {
            res.status(200).json({
                message: "Berhasil menghapus menu berdasarkan id",
                data: result
            })
        } else if(!result) {
            res.status(404).json({
                message: "Gagal menghapus menu berdasarkan id"
            })
        }
    })
}

exports.deleteAllMenu = (req, res, next) => {
    Menu.deleteMany({}).then(result => {
        if(result) {
            res.status(200).json({
                message: "Berhasil menghapus semua menu",
                data: result
            })
        } else if(!result) {
            res.status(400).json({
                message: "Gagal menghapus semua menu",
                data: result
            })
        }
    })
}