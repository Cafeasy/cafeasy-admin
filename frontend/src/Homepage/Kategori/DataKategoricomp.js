import React, { useState, useEffect, useRef } from "react";
import "../../Utils/Crud.css";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

const DEFAULT_KATEGORI = {
  namaKategori: "",
};

const DataKategoricomp = ({ data = [] }) => {
  const toast = useRef(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [deleteKategDialog, setDeleteKategDialog] = useState(false);
  const [deleteAllKategDialog, setDeleteAllKategDialog] = useState(false);
  const [kategoriDialog, setKategoriDialog] = useState(false);
  const [kategori, setKategori] = useState(DEFAULT_KATEGORI);

  const hideDeleteKategDialog = () => {
    setDeleteKategDialog(false);
  };

  const hideDeleteAllKategDialog = () => {
    setDeleteAllKategDialog(false);
  };

  const confirmDeleteAllKateg = () => {
    setDeleteAllKategDialog(true);
  };

  const confirmDeleteKategSelected = (selectedMenu) => {
    setKategori((data) => ({ ...data, ...selectedMenu }));
    setDeleteKategDialog(true);
  };

  const hideKategDialog = () => {
    setKategoriDialog(false);
  };

  const SubmitKateg = async () => {
    const formData = new FormData();
    formData.append("namaKategori", kategori.namaKategori);

    if (kategori.idMenu) {
      await axios
        .put(
          `${process.env.REACT_APP_API_URL}/updateKategoriMenu/${kategori.idKategori}`,
          formData
        )
        .then((response) => {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Data Berhasil Disimpan",
            life: 3000,
          });
          setKategoriDialog(false);
        })
        .catch((response) => {
          toast.current.show({
            severity: "error",
            summary: "Failed",
            detail: "Data Gagal Disimpan",
            life: 3000,
          });
        });
    } else {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/insertKategoriMenu/`, formData)
        .then((response) => {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Data Berhasil Disimpan",
            life: 3000,
          });
          setKategoriDialog(false);
        })
        .catch((response) => {
          toast.current.show({
            severity: "error",
            summary: "Failed",
            detail: "Data Gagal Disimpan",
            life: 3000,
          });
        });
    }
  };

  const FormKateg = (selectedMenu = {}) => {
    setKategori((data) => ({ ...data, ...selectedMenu }));
    setKategoriDialog(true);
  };

  const KategoriDialogFooter = (
    <React.Fragment>
      <Button
        label="Batal"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => {
          hideKategDialog();
          setKategori(DEFAULT_KATEGORI);
        }}
      />
      <Button
        label="Simpan"
        icon="pi pi-check"
        className="p-button-text"
        onClick={SubmitKateg}
      />
    </React.Fragment>
  );

  const deleteAllKateg = async () => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/deleteAllKategoriMenu`)
      .then((response) => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Data Berhasil Dihapus",
          life: 3000,
        });
        setKategori(DEFAULT_KATEGORI);
        setDeleteKategDialog(false);
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

  const deleteAllKategDialogFooter = (
    <>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteAllKategDialog}
      />
      <Button
        label="Iya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteAllKateg}
      />
    </>
  );

  const deleteKateg = async () => {
    await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/deleteKategoriMenuById/${kategori.idKategori}`
      )
      .then((response) => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Data Berhasil Dihapus",
          life: 3000,
        });
        setKategori(DEFAULT_KATEGORI);
        setDeleteKategDialog(false);
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

  const deleteKategDialogFooter = (
    <>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteKategDialog}
      />
      <Button
        label="Iya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteKateg}
      />
    </>
  );

  const actionButtonKateg = (kategori) => (
    <>
      <Button
        label="Edit"
        className="mx-2"
        icon="pi pi-pencil"
        rounded
        onClick={() => FormKateg(kategori)}
      />
      <Button
        label="Hapus"
        className="mx-2"
        icon="pi pi-trash"
        severity="danger"
        rounded
        onClick={() => confirmDeleteKategSelected(kategori)}
      />
    </>
  );

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Semua Kategori</h5>
      <div className="flex gap-2">
        <Button
          label="Tambah Kategori"
          icon="pi pi-plus"
          raised
          onClick={() => FormKateg()}
        />
        <Button
          label="Expor ke Spreedsheet"
          icon="pi pi-file-excel"
          severity="secondary"
          raised
        />
        <Button
          label="Hapus Semua"
          icon="pi pi-trash"
          severity="danger"
          raised
          onClick={confirmDeleteAllKateg}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
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
            <div className="title-kategori-pertama">
              {" "}
              DATATABLE KATEGORI{" "}
            </div>
          </div>
          <div className="col-sm-4">
            <div className="title-kategori-kedua"> Admin / </div>
          </div>
          <div className="col-sm-2">
            <div className="title-kategori-ketiga"> Data Kategori </div>
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
              scrollHeight="500px"
              globalFilter={globalFilter}
              dataKey="idKategori"
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Menampilkan {first} hingga {last} dari {totalRecords} data"
            >
              <Column
                field="idKategori"
                header="ID Kategori"
                sortable
                style={{ width: "30%" }}
              />
              <Column
                field="namaKategori"
                header="Nama Kategori"
                sortable
                style={{ width: "30%" }}
              />
              <Column
                header="Aksi"
                exportable={false}
                style={{ width: "15%" }}
                body={actionButtonKateg}
              ></Column>
            </DataTable>
          </div>

          <Dialog
            visible={kategoriDialog}
            style={{ width: "450px" }}
            header={kategori.namaKategori ? "Edit Kategori" : "Tambah Kategori"}
            modal
            className="p-fluid"
            footer={KategoriDialogFooter}
            onHide={hideKategDialog}
          >
            <div className="field">
              <label htmlFor="name">Name Kategori</label>
              <InputText
                id="name"
                defaultValue={kategori.namaKategori}
                onChange={(e) => {
                  setKategori((data) => ({
                    ...data,
                    namaKategori: e.target.value,
                  }));
                }}
                required
                autoFocus
              />
            </div>
          </Dialog>

          <Dialog
            visible={deleteAllKategDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Konfirmasi"
            modal
            footer={deleteAllKategDialogFooter}
            onHide={hideDeleteAllKategDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              <span>
                Apakah anda yakin ingin menghapus <b>semua kategori</b>?
              </span>
            </div>
          </Dialog>

          <Dialog
            visible={deleteKategDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Konfirmasi"
            modal
            footer={deleteKategDialogFooter}
            onHide={hideDeleteKategDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {kategori && (
                <span>
                  Apakah anda yakin ingin menghapus <b>{kategori.namaKategori}</b>?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default DataKategoricomp;
