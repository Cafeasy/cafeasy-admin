import React, { useState, useEffect, useRef } from "react";
import "../../Utils/Crud.css";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Carousel } from "primereact/carousel";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

const DEFAULT_MENU = {
  namaKategori: "",
};

const Bannercomp = ({ data = [] }) => {
  const toast = useRef(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [deleteMenuDialog, setDeleteMenuDialog] = useState(false);
  const [deleteAllDialog, setDeleteAllDialog] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  const [menu, setMenu] = useState(DEFAULT_MENU);
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    setBanner(data.data);
  }, []);

  const responsiveOptions = [
    {
      breakpoint: "1199px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "991px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

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

  const hideDialog = () => {
    setProductDialog(false);
  };

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("namaKategori", menu.namaKategori);

    if (menu.idMenu) {
      await axios
        .put(
          `${process.env.REACT_APP_API_URL}/updateKategoriMenu/${menu.idKategori}`,
          formData
        )
        .then((response) => {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Data Berhasil Disimpan",
            life: 3000,
          });
          setProductDialog(false);
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
          setProductDialog(false);
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

  const openForm = (selectedMenu = {}) => {
    setMenu((data) => ({ ...data, ...selectedMenu }));
    setProductDialog(true);
  };

  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Batal"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => {
          hideDialog();
          setMenu(DEFAULT_MENU);
        }}
      />
      <Button
        label="Simpan"
        icon="pi pi-check"
        className="p-button-text"
        onClick={onSubmit}
      />
    </React.Fragment>
  );

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
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteMenuDialog}
      />
      <Button
        label="Iya"
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
      <h5 className="mx-0 my-1">Data Banner</h5>
      <div className="flex gap-2">
        <Button
          label="Tambah Kategori"
          icon="pi pi-plus"
          raised
          onClick={() => openForm()}
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

  const productTemplate = (data) => {
    return (
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
        <div className="mb-3">
          <img
            src={data.imageUrl}
            alt={data.imageUrl}
            className="w-6 shadow-2"
          />
        </div>
        <div>
          <h4 className="mb-1">{data.idBanner}</h4>
          <h6 className="mt-0 mb-6">${data.namaBanner}</h6>
        </div>
      </div>
    );
  };

  console.log(data);

  let arr = data.data ?? [];

  return (
    <div className="container">
      <div className="py-4">
        <br></br>
        <div className="row">
          <div className="col-md-3">
            <div className="title-banner-pertama"> DATATABLE BANNER </div>
          </div>
          <div className="col-sm-4">
            <div className="title-banner-kedua"> Admin / </div>
          </div>
          <div className="col-sm-2">
            <div className="title-banner-ketiga"> Data Bannner </div>
          </div>
        </div>
        <br></br> <br></br>
        <div className="datatable-crud-demo">
          <Toast ref={toast} />
          <div className="cards">
            <Carousel
              header={header}
              value={banner}
              numVisible={3}
              numScroll={5}
              responsiveOptions={responsiveOptions}
              itemTemplate={productTemplate}
            />
          </div>

          <Dialog
            visible={productDialog}
            style={{ width: "450px" }}
            header={menu.namaKategori ? "Edit Kategori" : "Tambah Kategori"}
            modal
            className="p-fluid"
            footer={productDialogFooter}
            onHide={hideDialog}
          >
            <div className="field">
              <label htmlFor="name">Name Kategori</label>
              <InputText
                id="name"
                defaultValue={menu.namaKategori}
                onChange={(e) => {
                  setMenu((data) => ({
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

export default Bannercomp;
