const RiwayatTransaksi = require("../models/modelRiwayatTransaksi");

exports.getAllListHistory = async (req, res, next) => {
    RiwayatTransaksi.find({})
        .then(result => {
            res.status(200).json({
                message: 'Data riwayat pesanan pelanggan berhasil dipanggil',
                data: result
            })
        })
        .catch(err => {
            next(err);
        })
}