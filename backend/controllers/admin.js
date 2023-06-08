const DataAdmin = require("../models/admin")
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createAdmin = (req, res, next) => {
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

    //sign username request from body
    const uniqueid = "adm-" + (Math.random()).toString(32).slice(3);
    var username = req.body.username;

    //check username admin exist
    DataAdmin.findOne({username:username})
    .then(admin => {
        if(!admin){
            bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
                if(err){
                    res.json({
                        error: err
                    })
                }
        
                const registerAdmin = new DataAdmin ({
                    idAdmin: uniqueid,
                    username: username,
                    password: hashedPass,
                    namaCafe: req.body.namaCafe,
                    alamatCafe: req.body.alamatCafe,
                    deskripsiCafe: req.body.deskripsiCafe,
                    namaPemilikCafe: req.body.namaPemilikCafe,
                    noHpCafe: req.body.noHpCafe,
                    fotoCafe: req.file.path
                })
            
                registerAdmin.save().then(result => {
                    res.status(200).json({
                        message: "Berhasil mendaftar",
                        data: result
                    })
                }).catch(err => {
                    res.json({
                        message: 'error register'
                    });
                })
            })
        } else if (admin) {
            res.json({
                message: "username sudah ada, coba username lain"
            })
        }
    })
}

exports.getProfileAdmin = (req, res, next) => {
    const idAdmin = req.params.idAdmin;

    DataAdmin.find({idAdmin: `${idAdmin}`})
    .then(result => {
        res.status(200).json({
            message: "Data profil admin berhasil dipanggil",
            data: result
        })
    }).catch(err => {
        next(err);
    })
}

exports.loginAdmin = (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    DataAdmin.findOne({username: `${username}`})
    .then(admin => {
        if(admin) {
            bcrypt.compare(password, admin.password, function(err, result) {
                if(err) {
                    res.json({
                        error: err
                    })
                }
                if(result) {
                    let token = jwt.sign({name: admin.name}, process.env.JWT_SECRET, {expiresIn: '12h'});
                    // res.json({
                    //     status:'ok',
                    //     message: 'Login sukses',
                    //     token
                    // })
                    res
                    .status(200)
                    .cookie('token', token,{ maxAge: 2 * 60 * 60 * 1000, httpOnly: false });  // maxAge: 2 hours
                    res.redirect('/')
                } else {
                    res.json({
                        message: 'password salah!'
                    })
                }
            })
        } else {
            res.json({
                message: "username tidak ditemukan"
            })
        }
    })
}

exports.logoutAdmin = (req,res,next) => {
    res.clearCookie('token');
    res.send('berhasil logout')
}