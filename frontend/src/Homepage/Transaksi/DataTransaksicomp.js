import React, { useState, useEffect, useRef } from "react";
import "../../Utils/Crud.css";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

const DEFAULT_MENU = {
  idTransaksi: "",
  idPelanggan: "",
  namaPelanggan: "",
  tanggal: "",
  noMeja: "",
  totalHarga: "",
  statusBayar: "",
};

const DataTransaksicomp = ({ data = [] }) => {
  const toast = useRef(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [deleteMenuDialog, setDeleteMenuDialog] = useState(false);
  const [deleteAllDialog, setDeleteAllDialog] = useState(false);
  const [menu, setMenu] = useState(DEFAULT_MENU);

  const statusBody = (data) => {
    return <Tag value={data.statusBayar} severity={getSeverity(data)}></Tag>;
  };

  const hideDeleteMenuDialog = () => {
    setDeleteMenuDialog(false);
  };

  const hideDeleteAllDialog = () => {
    setDeleteAllDialog(false);
  };

  const confirmDeleteAll = () => {
    setDeleteAllDialog(true);
  };

  const deleteAll = async () => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/deleteAllTransaksi`)
      .then((response) => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Data Berhasil Dihapus",
          life: 3000,
        });
        setMenu(DEFAULT_MENU);
        setDeleteMenuDialog(false);
      })
      .catch((response) => {
        toast.current.show({
          severity: "error",
          summary: "Failed",
          detail: "Data Gagal Dihapus",
          life: 3000,
        });
      });
  };

  const deleteAllDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteAllDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteAll}
      />
    </>
  );

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
          onClick={confirmDeleteAll}
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

          <Dialog
            visible={deleteAllDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Konfirmasi"
            modal
            footer={deleteAllDialogFooter}
            onHide={hideDeleteAllDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              <span>
                Apakah anda yakin ingin menghapus <b>semua transaksi</b>?
              </span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default DataTransaksicomp;
