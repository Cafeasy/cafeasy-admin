const Menu = require("../models/modelMenu");

exports.getAvailableMenu = (req, res, next) => { //belum di tambah ke api
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