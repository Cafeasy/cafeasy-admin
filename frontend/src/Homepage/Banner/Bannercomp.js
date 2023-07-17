import React, { useState, useEffect, useRef } from "react";
import "../../Utils/Crud.css";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

const DEFAULT_BANNER = {
  imageFile: "",
  idBanner: "",
  namaBanner: "",
};

const Bannercomp = ({ data = [] }) => {
  const toast = useRef(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [deleteMenuDialog, setDeleteMenuDialog] = useState(false);
  const [deleteAllDialog, setDeleteAllDialog] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  const [banner, setBanner] = useState(DEFAULT_BANNER);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    setBanners(data);
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
    setBanner((data) => ({ ...data, ...selectedMenu }));
    setDeleteMenuDialog(true);
  };

  const hideDialog = () => {
    setProductDialog(false);
  };

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("idBanner", banner.idBanner);
    formData.append("namaBanner", banner.namaBanner);
    formData.append("image", banner.imageFile);

    await axios
      .post(`${process.env.REACT_APP_API_URL}/insertBanner/`, formData)
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
  };

  const openForm = (selectedMenu = {}) => {
    setBanner((data) => ({ ...data, ...selectedMenu }));
    setProductDialog(true);
  };

  const invoiceUploadHandler = (e) => {
    setBanner((data) => ({ ...data, imageFile: e.files[0] }));
  };

  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Batal"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => {
          hideDialog();
          setBanner(DEFAULT_BANNER);
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
      .delete(`${process.env.REACT_APP_API_URL}/deleteAllBanner`)
      .then((response) => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Data Berhasil Dihapus",
          life: 3000,
        });
        setBanner(DEFAULT_BANNER);
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
        `${process.env.REACT_APP_API_URL}/deleteBannerById/${banner.idBanner}`
      )
      .then((response) => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Data Berhasil Dihapus",
          life: 3000,
        });
        setBanner(DEFAULT_BANNER);
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
          label="Tambah Banner"
          icon="pi pi-plus"
          raised
          onClick={() => openForm()}
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

  const imageBody = (data) => (
    <img
      src={data.imageUrl}
      alt={data.imageUrl}
      className="w-6rem shadow-2 border-round"
    />
  );

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
          <div className="card">
            <DataTable
              value={banners}
              paginator
              header={header}
              rows={10}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              rowsPerPageOptions={[5, 10, 25]}
              dataKey="idMenu"
              resizableColumns
              showGridlines
              stripedRows
              tableStyle={{ minWidth: "50rem" }}
              scrollable
              scrollHeight="700px"
              globalFilter={globalFilter}
              currentPageReportTemplate="Menampilkan {first} hingga {last} dari {totalRecords} data"
            >
              <Column
                field="idBanner"
                header="ID Banner"
                sortable
                style={{ minWidth: "10rem" }}
              ></Column>
              <Column
                field="namaBanner"
                header="Nama Banner"
                sortable
                style={{ minWidth: "10rem" }}
              ></Column>
              <Column
                field="imageUrl"
                header="Gambar"
                body={imageBody}
                sortable
                style={{ minWidth: "10rem" }}
              ></Column>
              <Column
                header="Aksi"
                exportable={false}
                style={{ minWidth: "5rem" }}
                body={actionTemplate}
              ></Column>
            </DataTable>
          </div>

          <Dialog
            visible={productDialog}
            style={{ width: "450px" }}
            header={banner.namaBanner ? "Edit Banner" : "Tambah Banner"}
            modal
            className="p-fluid"
            footer={productDialogFooter}
            onHide={hideDialog}
          >
            {banner.imageUrl && (
              <img
                src={banner.imageUrl}
                alt={banner.namaMenu}
                className="w-full m-auto mb-3"
                style={{ borderRadius: "8px" }}
              />
            )}

            <div className="field">
              <label htmlFor="name">Name Banner</label>
              <InputText
                id="name"
                defaultValue={banner.namaBanner}
                onChange={(e) => {
                  setBanner((data) => ({
                    ...data,
                    namaBanner: e.target.value,
                  }));
                }}
                required
                autoFocus
              />
            </div>

            <div className="field">
              <label htmlFor="foto">Image</label>
              <FileUpload
                name="files"
                accept="image/*"
                customUpload={true}
                uploadHandler={invoiceUploadHandler}
                mode="basic"
                auto={true}
                chooseLabel={banner.imageFile.name ?? "Tambah Foto"}
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
              {banner && (
                <span>
                  Apakah anda yakin ingin menghapus <b>{banner.namaKategori}</b>?
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
