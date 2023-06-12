import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Kelolacomp = () => {
  const [users, setUser] = useState([]);

  // useEffect(() => {
  //   loadUsers();
  // }, []);

  // const loadUsers = async () => {
  //   const result = await axios.get(process.env.REACT_APP_API_URL);
  //   setUser(result.data.reverse());
  // };

  // const deleteUser = async (id) => {
  //   await axios.delete(process.env.REACT_APP_API_URL$);
  //   loadUsers();
  // };

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(` ${process.env.REACT_APP_API_URL}/riwayatTransaksi/`)
      .then((result) => { 
        setData(result.data);
      })
      .catch((error) => console.log(error));
  }, [data]);

  let arr = data.data ?? [];
  console.log(arr);
  return (
    <div className="container">
      <div className="py-4">
        <br></br>
        <div className="title-crud"> DATA RIWAYAT TRANSAKSI </div>
        <br></br> <br></br>
        <div class="table-title">
          <div class="row">
            <div class="col-xs-4">
              <h4>
                {" "}
                <b>Deskripsi Riwayat</b>
              </h4>
            </div>
            <div class="col-xs-4">
              <button
                color="red"
                appearance="primary"
                type="file"
                class="btn btn-secondary"
              >
                Import Inventory
              </button>
              <button
                color="red"
                appearance="primary"
                type="file"
                class="btn btn-secondary"
              >
                Export as Excel
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                New Item
              </button>
            </div>
          </div>
        </div>
        <div className="teks_atas">
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Id Transaksi</th>
              <th scope="col">Id Pelanggan</th>
              <th scope="col">Nama Pelanggan</th>
              <th scope="col">Tanggal</th>
              <th scope="col">No Meja</th>
              <th scope="col">Data Pesanan</th>
              <th scope="col">Status</th>
              <th scope="col">Total Bayar</th>
              <th>Action</th>
            </tr>

            {arr?.map((item, index) => (
              <>
                <tr className="text-title1">
                  <td>{item.idTransaksi}x</td>
                  <td>{item.idPelanggan}x</td>
                  <td>{item.namaPelanggan}x</td>
                  <td>{item.tanggal}x</td>
                  <td>{item.noMeja}x</td>
                  <td>{}x</td>
                  <td>{item.statusBayar}x</td>
                  <td>{item.totalHarga}x</td>
                </tr>
              </>
            ))}
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.idMenu}</td>
                <td>{user.namaMenu}</td>
                <td>{user.hargaMenu}</td>
                <td>{user.stokMenu}</td>
                <td>{user.deskripsiMenu}</td>
                <td>{user.kategoriMenu}</td>
                <td>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/users/edit/${user.id}`}
                  >
                    Edit
                  </Link>
                  <Link class="btn btn-primary mr-2" to={`/users/${user.id}`}>
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default Kelolacomp;
