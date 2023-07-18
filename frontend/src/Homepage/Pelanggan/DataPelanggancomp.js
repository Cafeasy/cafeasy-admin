import React, { useState, useEffect, useRef } from "react";
import "../../Utils/Crud.css";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";

const DEFAULT_PELANGGAN = {
  id: "",
  name: "",
};

const DataPelanggancomp = ({ data = [] }) => {
  const toast = useRef(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [deletePelangganDialog, setDeletePelangganDialog] = useState(false);
  const [deleteAllPelangganDialog, setDeleteAllPelangganDialog] =
    useState(false);
  const [pelanggan, setPelanggan] = useState(DEFAULT_PELANGGAN);

  const hideDeletePelangganDialog = () => {
    setDeletePelangganDialog(false);
  };

  const hideDeleteAllPelangganDialog = () => {
    setDeleteAllPelangganDialog(false);
  };

  const confirmDeleteAllPelanggan = () => {
    setDeleteAllPelangganDialog(true);
  };

  const deleteAllPelanggan = async () => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/deleteAllCustomer`)
      .then((response) => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Data Berhasil Dihapus",
          life: 3000,
        });
        setPelanggan(DEFAULT_PELANGGAN);
        setDeletePelangganDialog(false);
      })
      .catch((response) => {
        toast.current.show({
          severity: "error",
          summary: "Failed",
          detail: "Data Gagal Dihapus",
          life: 3000,
        });
      });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const deleteAllPelangganDialogFooter = (
    <>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteAllPelangganDialog}
      />
      <Button
        label="Iya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteAllPelanggan}
      />
    </>
  );

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Semua Pelanggan</h5>
      <div className="flex gap-2">
        <Button
          label="Hapus Semua"
          icon="pi pi-trash"
          severity="danger"
          raised
          onClick={confirmDeleteAllPelanggan}
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
            <div className="title-pelanggan-pertama"> DATATABLE PELANGGAN </div>
          </div>
          <div className="col-sm-4">
            <div className="title-pelanggan-kedua"> Admin / </div>
          </div>
          <div className="col-sm-2">
            <div className="title-pelanggan-ketiga"> Data Pelanggan </div>
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
              stripedRows
              tableStyle={{ minWidth: "50rem" }}
              scrollable
              scrollHeight="700px"
              globalFilter={globalFilter}
              dataKey="id"
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Menampilkan {first} hingga {last} dari {totalRecords} data"
            >
              <Column
                field="id"
                header="ID"
                sortable
                style={{ width: "15%" }}
              />
              <Column
                field="name"
                header="Nama"
                sortable
                style={{ width: "15%" }}
              />
            </DataTable>
          </div>

          <Dialog
            visible={deleteAllPelangganDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Konfirmasi"
            modal
            footer={deleteAllPelangganDialogFooter}
            onHide={hideDeleteAllPelangganDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              <span>
                Apakah anda yakin ingin menghapus <b>semua pelanggan</b>?
              </span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default DataPelanggancomp;
