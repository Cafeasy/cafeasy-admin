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
            <DataTable value={arr} header={header} 
            resizableColumns 
            showGridlines 
            tableStyle={{ minWidth: '50rem' }}  
            scrollable scrollHeight="500px"  
            globalFilter={globalFilter}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            >
                <Column field="idTransaksi" header="ID Transaksi" sortable style={{ minWidth: "10rem" }} columnResizeMode="fit" ></Column>
                <Column field="idPelanggan" header="ID Pelanggan" sortable style={{ minWidth: "10rem"  }} ></Column>
                <Column field="namaPelanggan" header="Nama Pelanggan" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="tanggal" header="Tanggal" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="noMeja" header="No Meja" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="" header="Data Pesanan" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="totalHarga" header="Total Harga" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="statusBayar" header="Status Bayar" sortable style={{ minWidth: "10rem" }} ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataTransaksicomp;
