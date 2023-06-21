import React, { useState, useEffect, useRef } from "react";
import "../Crud/Crud.css";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Tag } from 'primereact/tag';
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar"; 

const DataTransaksicomp = () => {

  const [data, setData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const toast = useRef(null);
  const statusBody = (data) => {
    return <Tag value={data.statusBayar} severity={getSeverity(data)}></Tag>;
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  useEffect(() => {
    axios
      .get(` ${process.env.REACT_APP_API_URL}/transaksi/`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log(error));
  }, [data]);

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="secondary" outlined 
          onClick={confirmDeleteSelected}
          disabled={!selectedData || !selectedData.length}
        />
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button 
          label="Export as Spreedsheet"
          icon="pi pi-file-excel" 
          severity="secondary" outlined 
        />
      </React.Fragment>
    );
  };

  const getSeverity = (data) => {
    switch (data.statusBayar) {
        case 'SUCCESS':
            return 'success';

        case 'settlement':
            return 'warning';

        case 'Belum bayar':
            return 'danger';

        default:
            return null;
    }
};
  
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
        <Toast ref={toast} />
        <div className="card">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>
            <DataTable value={arr} header={header} 
            resizableColumns 
            showGridlines 
            tableStyle={{ minWidth: '50rem' }}  
            scrollable scrollHeight="500px"  
            globalFilter={globalFilter}
            selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="idTransaksi"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} data"
            >
                <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} exportable={false} ></Column>
                <Column field="idTransaksi" header="ID Transaksi" sortable style={{ minWidth: "10rem" }} columnResizeMode="fit" ></Column>
                <Column field="idPelanggan" header="ID Pelanggan" sortable style={{ minWidth: "10rem"  }} ></Column>
                <Column field="namaPelanggan" header="Nama Pelanggan" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="tanggal" header="Tanggal" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="noMeja" header="No Meja" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="totalHarga" header="Total Harga" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column header="Status Bayar" body={statusBody} sortable style={{ minWidth: "10rem" }} ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataTransaksicomp;
