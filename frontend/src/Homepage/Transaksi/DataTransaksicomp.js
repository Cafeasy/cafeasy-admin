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
  const [dataTransaksi, setdataTransaksi] = useState([]);
  useEffect(() => {
    setdataTransaksi(data.data);
  }, []);
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

  const exportSpreadsheet = async () => {
    let dat1;
    let dataPesana = [];
    for (var i = 0; i < dataTransaksi.length; i++) {
      dataTransaksi.map((value) => {
        dat1 = {
          data: [
            [
              "ID Transaksi", "Nama Pelanggan", "Tanggal", "Total Harga", "Status Bayar"
            ],
            [value.idTransaksi, value.namaPelanggan, value.tanggal, value.totalHarga, value.statusBayar]

          ]
        };
        dataPesana[i] = [value]
      });

    }

    console.log(dat1)


    await axios
      .post(`${process.env.REACT_APP_API_URL}/writeSpreadsheet`, dat1).then(() => {
        var win = window.open('https://docs.google.com/spreadsheets/d/1suDps63BnNPDeIDAHZ07leYFnbihjoatWByahkd41lk/edit?usp=sharing', '_blank');
        win.focus();
      })
      ;

  }
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
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteAllDialog}
      />
      <Button
        label="Iya"
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
        <Button on
          label="Ekspor ke Spreedsheet"
          icon="pi pi-file-excel"
          severity="secondary"
          raised
          onClick={exportSpreadsheet}
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
        <div className="row">
          <div className="col-md-3">
            <div className="title-transaksi-pertama">
              {" "}
              DATATABLE TRANSAKSI{" "}
            </div>
          </div>
          <div className="col-sm-4">
            <div className="title-transaksi-kedua"> Admin / </div>
          </div>
          <div className="col-sm-2">
            <div className="title-transaksi-ketiga"> Data Transaksi </div>
          </div>
        </div>
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
