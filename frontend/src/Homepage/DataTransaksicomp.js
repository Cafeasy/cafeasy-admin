import React, { useState, useEffect } from "react";
import "../Crud/Crud.css";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from "primereact/inputtext";

const DataTransaksicomp = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(` ${process.env.REACT_APP_API_URL}/transaksi/`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log(error));
  }, [data]);

  const [globalFilter, setGlobalFilter] = useState(null);
  
  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Deskripsi Transaksi</h5>
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
        <div className="title-crud"> DATA TRANSAKSI </div>
        <br></br> <br></br>
        <div className="datatable-crud-demo">
        <div className="card">
            <DataTable value={arr} header={header} resizableColumns columnResizeMode="fit" showGridlines stripedRows tableStyle={{ minWidth: '50rem' }}  scrollable scrollHeight="400px"  >
                <Column field="idTransaksi" header="ID Transaksi" sortable style={{ width: '15%' }} columnResizeMode="fit" />
                <Column field="idPelanggan" header="ID Pelanggan" sortable style={{ width: '15%' }} />
                <Column field="namaPelanggan" header="Nama Pelanggan" sortable style={{ width: '15%' }} />
                <Column field="tanggal" header="Tanggal" sortable style={{ width: '15%' }} />
                <Column field="noMeja" header="No Meja" sortable style={{ width: '15%' }} />
                <Column field="" header="Data Pesanan" sortable style={{ width: '15%' }} />
                <Column field="totalHarga" header="No Meja" sortable style={{ width: '15%' }} />
                <Column field="statusBayar" header="Data Pesanan" sortable style={{ width: '15%' }} />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataTransaksicomp;
