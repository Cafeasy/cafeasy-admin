const TransaksiPelanggan = require("../models/modelTransaksi");

exports.getAllTransaksiPelanggan = async (req, res, next) => {
    TransaksiPelanggan.find({})
    .then(result => {
        res.status(200).json({
            message: 'Semua data transaksi berhasil dipanggil',
            data: result
        })
    })
    .catch(error => {
        res.status(404).json({
            message: "Semua data transaksi gagal dipanggil",
            error: error
        })
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
    .catch(error => {
        res.status(404).json({
            message: "Data detail transaksi gagal dipanggil",
            error: error
        })
    })
}

exports.deleteAllTransaksi = async (req, res, next) => {
    // const idTransaksi = req.params.idTransaksi;

    TransaksiPelanggan.deleteMany({})
    .then(result => {
        res.status(200).json({
            message: 'Semua transaksi berhasil dihapus',
            data: result
        })
    }).catch(error => {
        res.status(404).json({
            message: "Semua transaksi gagal dihapus",
            error: error
        })
    })
}

exports.deleteTransaksiById = async (req, res, next) => {
    const idTransaksi = req.params.idTransaksi;

    TransaksiPelanggan.deleteOne({idTransaksi: `${idTransaksi}`})
    .then(result => {
        res.status(404).json({
            message: 'Gagal menghapus, idTransaksi tidak ditemukan',
            data: result
        })
    }).catch(error => {
        res.status(404).json({
            message: "Gagal menghapus, idTransaksi tidak ditemukan",
            error: error
        })
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
    .catch(error => {
        res.status(404).json({
            message: "Status bayar gagal diupdate - Pembayaran Cash Gagal",
            error: error
        })
    })
}