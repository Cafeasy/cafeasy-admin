import React, { useState, useEffect, useRef } from "react";
import "../../Utils/Crud.css";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { useParams } from "react-router-dom";

const DataTransaksicomp = () => {
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
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

  const getSeverity = (data) => {
    switch (data.statusBayar) {
      case "SUCCESS":
        return "success";

      case "settlement":
        return "warning";

      case "Belum bayar":
        return "danger";

      default:
        return null;
    }
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Semua Transaksi</h5>
      <div className="flex gap-2">
        <Button
          label="Ekspor ke Spreedsheet"
          icon="pi pi-file-excel"
          severity="secondary"
          raised
        />
        <Button
          label="Hapus Semua"
          icon="pi pi-trash"
          severity="danger"
          raised
          onClick={confirmDeleteSelected}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Cari..."
          />
        </span>
      </div>
    </div>
  );

  console.log(data);

  let arr = data.data ?? [];

  return (
    <div className="container">
      <div className="py-4">
        <br></br>
        <div className="title-crud"> DATATABLE TRANSAKSI </div>
        <br></br> <br></br>
        <div className="datatable-crud-demo">
          <Toast ref={toast} />
          <div className="card">
            <DataTable
              value={arr}
              header={header}
              resizableColumns
              showGridlines
              tableStyle={{ minWidth: "50rem" }}
              scrollable
              scrollHeight="500px"
              globalFilter={globalFilter}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Menampilkan {first} hingga {last} dari {totalRecords} data"
            >
              <Column
                field="idTransaksi"
                header="ID Transaksi"
                sortable
                style={{ minWidth: "10rem" }}
                columnResizeMode="fit"
              ></Column>
              <Column
                field="idPelanggan"
                header="ID Pelanggan"
                sortable
                style={{ minWidth: "10rem" }}
              ></Column>
              <Column
                field="namaPelanggan"
                header="Nama Pelanggan"
                sortable
                style={{ minWidth: "10rem" }}
              ></Column>
              <Column
                field="tanggal"
                header="Tanggal"
                sortable
                style={{ minWidth: "10rem" }}
              ></Column>
              <Column
                field="noMeja"
                header="No Meja"
                sortable
                style={{ minWidth: "10rem" }}
              ></Column>
              <Column
                field="totalHarga"
                header="Total Harga"
                sortable
                style={{ minWidth: "10rem" }}
              ></Column>
              <Column
                header="Status Bayar"
                body={statusBody}
                sortable
                style={{ minWidth: "10rem" }}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTransaksicomp;