import React, { useState, useEffect } from "react";
import "../Crud/Crud.css";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";

const DataMenucomp = () => {
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  
  useEffect(() => {
    axios
      .get(` ${process.env.REACT_APP_API_URL}/menu/`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log(error));
  }, [data]);

  const imageBody = (data) => {
    return <img src={data.imageUrl} alt={data.imageUrl} className="w-6rem shadow-2 border-round" />;
  };
  
  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Deskripsi Menu</h5>
      <Button label="New Item" severity="secondary" outlined />
      <Button label="Export as Spreedsheet" severity="secondary" outlined />
      <span className="p-input-icon-left" > 
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
            <DataTable value={arr} header={header} 
            resizableColumns
            showGridlines 
            stripedRows 
            tableStyle={{ minWidth: '50rem' }} 
            scrollable scrollHeight="500px" 
            globalFilter={globalFilter}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            selection={selectedData} onSelectionChange={(e) => setSelectedData(e.value)} dataKey="idMenu"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} data"
            >
                <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} exportable={false} ></Column>
                <Column field="idMenu" header="ID Menu" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="namaMenu" header="Nama Menu" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="hargaMenu" header="Harga Menu" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="stokMenu" header="Stok Menu" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="deskripsiMenu" header="Deskripsi Menu" sortable style={{ minWidth: "10rem" }}  ></Column>
                <Column field="kategoriMenu" header="Kategori Menu" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="imageUrl" header="Gambar" body={imageBody} sortable style={{ minWidth: "10rem" }} ></Column>
                <Column header="Aksi" exportable={false} style={{ minWidth: '12rem' }} ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataMenucomp;
