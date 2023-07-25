const TransaksiPelanggan = require("../models/modelTransaksi");
const Menu = require("../models/modelMenu");

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

    //mendefinisi var length looping untuk update otomatis stok menu
    var checkTransaksi = await TransaksiPelanggan.findOne({idTransaksi: `${idTransaksiCheck}`});
    var obyekTransaksi = checkTransaksi.toObject();
    var len = obyekTransaksi.dataPesanan.length;

    //looping update (stok menu - qty datapesanan)
    for (var i = 0; i < len; i++) {
        //menyimpan setiap id menu pada data pesanan ke sebuah variable
        var checkIdMenuDataPesanan = await TransaksiPelanggan.findOne({idTransaksi: `${idTransaksiCheck}`});
        var obyekIdMenu = checkIdMenuDataPesanan.toObject();
        var saveIdMenu = obyekIdMenu.dataPesanan[i].idMenu;

        //menyimpan data setiap stok menu per id menu ke sebuah variable 
        var saveStokMenu = await Menu.findOne({idMenu: `${saveIdMenu}`});
        var obyekStokMenu = saveStokMenu.toObject();

        //otomatis update stok menu setelah transaksi berhasil
        var kalkulasiStokMenu = obyekStokMenu.stokMenu-obyekIdMenu.dataPesanan[i].qty;

        await Menu.findOneAndUpdate(
            {idMenu: `${saveIdMenu}`},
            { $set: {stokMenu: kalkulasiStokMenu}},
            {new: true}
            )
    }
}