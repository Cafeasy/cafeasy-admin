import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const DataMenucomp = () => {

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
      .get(` ${process.env.REACT_APP_API_URL}/menu/`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log(error));
  }, [data]);

  console.log(data);
  
  let arr = data.data ?? [];

  return (
    <div className="container">
      <div className="py-4">
        <br></br>
        <div className="title-crud"> DATA MENU </div>
        <br></br> <br></br>
        <div class="table-title">
          <div class="row">
            <div class="col-xs-4">
              <h4>
                {" "}
                <b>Deskripsi Menu</b>
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
                Export as Spreadsheet
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                New Item
              </button>
            </div>
          </div>
        </div>
        <div className="card">
            <DataTable value={arr} tableStyle={{ minWidth: '50rem' }}>
                <Column field="idMenu" header="Id Menu" />
                <Column field="namaMenu" header="Nama Menu" />
                <Column field="hargaMenu" header="Harga Menu" />
                <Column field="stokMenu" header="Stok Menu" />
                <Column field="deskripsiMenu" header="Deskripsi Menu" />
                <Column field="kategoriMenu" header="Kategori Menu" />
            </DataTable>
    </div>
      </div>
    </div>
  );
}

export default DataMenucomp;
