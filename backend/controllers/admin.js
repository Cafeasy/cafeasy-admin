const DataAdmin = require("../models/admin")
var md5 = require('md5');

exports.createAdmin = (req, res, next) => {
    const uniqueid = "adm-" + (Math.random()).toString(32).slice(3);

    const username = req.body.username;
    const password = req.body.password;
    const namaCafe = req.body.namaCafe;
    const alamatCafe = req.body.alamatCafe;
    const deskripsiCafe = req.body.deskripsiCafe;
    const namaPemilikCafe = req.body.namaPemilikCafe;
    const noHpCafe = req.body.noHpCafe;

    const registerAdmin = new DataAdmin ({
        idAdmin: uniqueid,
        username: username,
        password: md5(password),
        namaCafe: namaCafe,
        alamatCafe: alamatCafe,
        deskripsiCafe: deskripsiCafe,
        namaPemilikCafe: namaPemilikCafe,
        noHpCafe: noHpCafe
    })

    registerAdmin.save().then(result => {
        res.status(200).json({
            message: "Berhasil mendaftar",
            data: result
        })
    }).catch(err => {
        console.log('err : ', err);
    })
}

exports.getProfileAdmin = (req, res, next) => {
    const idAdmin = req.params.idAdmin;

    DataAdmin.find({idAdmin: `${idAdmin}`}).then(result => {
        res.status(200).json({
            message: "Data profil admin berhasil dipanggil",
            data: result
        })
    }).catch(err => {
        next(err);
    })
}