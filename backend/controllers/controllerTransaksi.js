const TransaksiPelanggan = require("../models/modelTransaksi");
const Riwayatpesanan = require('../models/modelRiwayatPesanan');

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

    TransaksiPelanggan.findOneAndUpdate({idTransaksi: `${idTransaksiCheck}`}, {$set: { statusBayar: "Pembayaran Cash Sukses" }}, {new: true})
    .then(result => {
        res.status(200).json({
            message: 'Status bayar berhasil diupdate - Pembayaran Cash Sukses',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })

    //insert ke history transaksi
    let checkTransaksiByParams = await TransaksiPelanggan.findOne({idTransaksi: `${idTransaksiCheck}`});
    let obyekTransaksi = checkTransaksiByParams.toObject();

    var idTransaksi = obyekTransaksi.idTransaksi;
    var idPelanggan = obyekTransaksi.idPelanggan;
    var namaPelanggan = obyekTransaksi.namaPelanggan;
    var tanggal = obyekTransaksi.tanggal;
    var noMeja = obyekTransaksi.noMeja;
    var dataPesanan = obyekTransaksi.dataPesanan;
    var totalHarga = obyekTransaksi.totalHarga;
    var statusBayar = obyekTransaksi.statusBayar;

    const insertRiwayatTransaksi = new Riwayatpesanan({
        idTransaksi: idTransaksi,
        idPelanggan: idPelanggan,
        namaPelanggan: namaPelanggan,
        tanggal: tanggal,
        noMeja: noMeja,
        dataPesanan: dataPesanan,
        totalHarga: totalHarga,
        statusBayar: statusBayar
    })

    insertRiwayatTransaksi.save().catch(err => {
        next(err);
    });

    TransaksiPelanggan.deleteOne(({idTransaksi: `${idTransaksiCheck}`}))
    .catch(err => {
        next(err);
    })
}