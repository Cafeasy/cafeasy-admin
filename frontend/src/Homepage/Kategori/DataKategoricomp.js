import React, { useState, useEffect, useRef } from "react";
import "../../Utils/Crud.css";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

const DEFAULT_MENU = {
  idKategori: "",
  namaKategori: "",
};

const DataKategoricomp = ({ data = [] }) => {
  const toast = useRef(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [deleteMenuDialog, setDeleteMenuDialog] = useState(false);
  const [deleteAllDialog, setDeleteAllDialog] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  const [menu, setMenu] = useState(DEFAULT_MENU);

  const hideDeleteMenuDialog = () => {
    setDeleteMenuDialog(false);
  };

  const hideDeleteAllDialog = () => {
    setDeleteAllDialog(false);
  };

  const confirmDeleteAll = () => {
    setDeleteAllDialog(true);
  };

  const confirmDeleteSelected = (selectedMenu) => {
    setMenu((data) => ({ ...data, ...selectedMenu }));
    setDeleteMenuDialog(true);
  };

  const openForm = (selectedMenu = {}) => {
    setMenu((data) => ({ ...data, ...selectedMenu }));
    setProductDialog(true);
  };

  const deleteAll = async () => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/deleteAllKategoriMenu`)
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

  const deleteMenu = async () => {
    await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/deleteKategoriMenuById/${menu.idKategori}`
      )
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

  const deleteMenuDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteMenuDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteMenu}
      />
    </>
  );

  const actionTemplate = (menu) => (
    <>
      <Button
        label="Edit"
        className="mx-2"
        icon="pi pi-pencil"
        rounded
        onClick={() => openForm(menu)}
      />
      <Button
        label="Hapus"
        className="mx-2"
        icon="pi pi-trash"
        severity="danger"
        rounded
        onClick={() => confirmDeleteSelected(menu)}
      />
    </>
  );

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Semua Kategori</h5>
      <div className="flex gap-2">
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
          onClick={confirmDeleteAll}
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
        <div className="title-crud"> DATATABLE KATEGORI </div>
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
                body={actionTemplate}
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
                Apakah anda yakin ingin menghapus <b>semua kategori</b>?
              </span>
            </div>
          </Dialog>

          <Dialog
            visible={deleteMenuDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Konfirmasi"
            modal
            footer={deleteMenuDialogFooter}
            onHide={hideDeleteMenuDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {menu && (
                <span>
                  Apakah anda yakin ingin menghapus <b>{menu.namaKategori}</b>?
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
