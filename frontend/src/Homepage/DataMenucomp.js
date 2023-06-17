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
        <div className="card">
            <DataTable value={arr} tableStyle={{ minWidth: '50rem' }}>
                <Column field="idMenu" header="Id Menu" sortable style={{ width: '25%' }} />
                <Column field="namaMenu" header="Nama Menu" sortable style={{ width: '25%' }} />
                <Column field="hargaMenu" header="Harga Menu" sortable style={{ width: '25%' }} />
                <Column field="stokMenu" header="Stok Menu" sortable style={{ width: '25%' }} />
                <Column field="deskripsiMenu" header="Deskripsi Menu" sortable style={{ width: '25%' }} />
                <Column field="kategoriMenu" header="Kategori Menu" sortable style={{ width: '25%' }} />
            </DataTable>
    </div>
      </div>
    </div>
  );
}

export default DataMenucomp;
