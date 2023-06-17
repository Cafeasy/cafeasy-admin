import React, { useState, useEffect } from "react";
import "../Crud/Crud.css";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from "primereact/inputtext";

const DataMenucomp = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(` ${process.env.REACT_APP_API_URL}/menu/`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log(error));
  }, [data]);

  const [globalFilter, setGlobalFilter] = useState(null);
  
  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Deskripsi Menu</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  console.log(data);

  let arr = data.data ?? [];

  return (
    <div className="container">
      <div className="py-4">
        <br></br>
        <div className="title-crud"> DATA MENU </div>
        <br></br> <br></br>
        <div className="datatable-crud-demo">
        <div className="card">
            <DataTable value={arr} header={header} resizableColumns columnResizeMode="fit" showGridlines stripedRows tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="400px"  >
                <Column field="idMenu" header="ID Menu" sortable style={{ width: '15%' }} columnResizeMode="fit" />
                <Column field="namaMenu" header="Nama Menu" sortable style={{ width: '15%' }} />
                <Column field="hargaMenu" header="Harga Menu" sortable style={{ width: '15%' }} />
                <Column field="stokMenu" header="Stok Menu" sortable style={{ width: '15%' }} />
                <Column field="deskripsiMenu" header="Deskripsi Menu" sortable style={{ width: '15%' }} />
                <Column field="kategoriMenu" header="Kategori Menu" sortable style={{ width: '15%' }} />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataMenucomp;
