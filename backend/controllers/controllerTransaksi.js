const TransaksiPelanggan = require("../models/modelTransaksi");

exports.getAllTransaksiPelanggan = async (req, res, next) => {
    TransaksiPelanggan.find({})
    .then(result => {
        res.status(200).json({
            message: 'Semua data transaksi berhasil dipanggil',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.getDetailTransaksi = async (req, res, next) => {
    const idTransaksi = req.params.idTransaksi;
    
    TransaksiPelanggan.find({idTransaksi: `${idTransaksi}`})
    .then((result) => {
        return res.status(200).json({
            message: 'Data detail transaksi berhasil dipanggil',
            data: {result}
        })      
        
    })
    .catch(err => {
        next(err);
    })
}

exports.deleteAllTransaksi = async (req, res, next) => {
    // const idTransaksi = req.params.idTransaksi;

    TransaksiPelanggan.deleteMany({})
    .then(result => {
        res.status(200).json({
            message: 'Semua transaksi telah dihapus',
            data: result
        })
    }).catch(err => {
        next(err);
    })
}

exports.deleteTransaksiById = async (req, res, next) => {
    const idTransaksi = req.params.idTransaksi;

    TransaksiPelanggan.deleteOne({idTransaksi: `${idTransaksi}`})
    .then(result => {
        if(!result) {
            res.status(404).json({
                message: 'Gagal menghapus, idTransaksi tidak ditemukan'
            })
        } else {
            res.status(200).json({
                message: 'Transaksi telah dihapus',
                data: result
            })
        }
    }).catch(err => {
        next(err);
    })
}

exports.updateStatusBayarCash = async (req, res, next) => {
    //update status bayar
    const idTransaksiCheck = req.params.idTransaksi;

    //date gmt
    var ndate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta'
    })

    TransaksiPelanggan.findOneAndUpdate({idTransaksi: `${idTransaksiCheck}`}, {$set: { statusBayar: "Sukses Bayar Cash", tanggal: ndate }}, {new: true})
    .then(result => {
        res.status(200).json({
            message: 'Status bayar berhasil diupdate - Pembayaran Cash Sukses',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}