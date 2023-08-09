const dataBanner = require("../models/modelBanner");
const {validationResult} = require('express-validator');
const config = require('../config/firebaseConfig');

const {initializeApp} = require('firebase/app');
const {getStorage} = require('firebase/storage');
const {ref} = require('firebase/storage');
const {getDownloadURL} = require('firebase/storage');
const {uploadBytesResumable} = require('firebase/storage');
const {deleteObject} = require('firebase/storage');
const {listAll} = require('firebase/storage');

initializeApp(config.firebaseConfig);
const storage = getStorage();

exports.getAllBanner = (req, res, next) => {
    dataBanner.find({}).then(result => {
        res.status(200).json({
            message: "Data semua banner berhasil dipanggil",
            data: result
        })
    }).catch(err => {
        next(err);
    })
}

exports.getBannerById = (req, res, next) => {
    const idBanner = req.params.idBanner;
    dataBanner.findOne({idBanner: idBanner}).then(result => {
        res.status(200).json({
            message: "Data banner berdasarkan id berhasil dipanggil",
            data: result
        })
    }).catch(err => {
        next(err);
    })
}

exports.insertNewBanner = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error("input form tidak sesuai");
        err.errorStatus = 400;
        err.data = errors.array();
        return res.send(err);
    }

    if(!req.file) {
        const err = new Error("image harus diupload, pastikan format image berupa png/jpg/jpeg");
        err.errorStatus = 422;
        return res.send(err.message);
    }

    var uniqueid = (Math.random()).toString(32).slice(2, 8);
    var idBanner = "banner-" + uniqueid;
    
    const storageRef = ref(storage, `bannerPict/${idBanner}`);

    const metadata = {
        contentType: req.file.mimetype,
    };

    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);

    const insertNewBanner = new dataBanner({
        idBanner: idBanner,
        namaBanner: req.body.namaBanner,
        image: `bannerPict/${idBanner}`,
        imageUrl: downloadURL
    })

    insertNewBanner.save().then(result => {
        res.status(200).json({
            message: "Banner berhasil ditambahkan",
            data: result
        })
    }).catch(err => {
        next(err);
    })
}

exports.deleteBannerById = async (req, res, next) => {
    const idBanner = req.params.idBanner;
    const storageRef = ref(storage, `bannerPict/${idBanner}`);

    getDownloadURL(storageRef).then(() => {
        deleteObject(storageRef);
        dataBanner.deleteOne({idBanner: `${idBanner}`}).then(result => {
            res.status(200).json({
                message: "Berhasil menghapus banner berdasarkan id",
                data: result
            })
        })
    }).catch(error => {
        if(error.code === 'storage/object-not-found'){
            res.status(404).json({
                message: "Gagal menghapus banner berdasarkan id, gambar tidak terdapat pada cloud storage",
                error: error
            })
        } else {
            next(error);
        }
    })
}

exports.deleteAllBanner = async (req, res, next) => {
    const storageRef = ref(storage, `bannerPict/`);
    listAll(storageRef).then((listResults) => {
        const promises = listResults.items.map((item) => {
          return deleteObject(item);
        });
        Promise.all(promises);
        dataBanner.deleteMany({}).then(result => {
            res.status(200).json({
                message: "Berhasil menghapus semua banner",
                data: result
            })
        })
    }).catch(error => {
        next(error);
    })
}