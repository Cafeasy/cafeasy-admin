import React, { useState, useEffect, useRef } from "react";
import "../Utils/Crud.css";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Toolbar } from "primereact/toolbar";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";

const DataMenucomp = () => {
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  // const [product, setProduct] = useState(emptyData);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const toast = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [productDialog, setProductDialog] = useState(false);

  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kategori, setKategori] = useState("");
  const [gambar, setGambar] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  // cancel modal
  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  // confirm delete
  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  useEffect(() => {
    axios
      .get(` ${process.env.REACT_APP_API_URL}/menu/`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log(error));
  }, [data]);

  const openNew = () => {
    // setProduct(emptyData);
    setSubmitted(false);
    setProductDialog(true);
  };

  const onSubmit = () => {
    console.log("Nama: ", nama);
    console.log("Harga: ", harga);
    console.log("Stok: ", stok);
    console.log("Deskripsi: ", deskripsi);
    console.log("Kategori: ", kategori);
    console.log("image: ", gambar);
  };

  const invoiceUploadHandler = ({ files }) => {
    const [file] = files;
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      uploadInvoice(e.target.result);
    };
    fileReader.readAsDataURL(file);
  };

  const uploadInvoice = async (invoiceFile) => {
    let formData = new FormData();
    formData.append("invoiceFile", invoiceFile);

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/insertMenu/`,
      {
        method: "POST",
        body: formData,
      }
    );
  };

  const deleteItems = (value) => {
    console.log(value);
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/deleteItem/`
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const [selectedImage, setSelectedImage] = useState();

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={onSubmit}
      />
    </React.Fragment>
  );

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="secondary"
          outlined
          onClick={deleteItems}
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
          severity="secondary"
          outlined
        />
        <Button
          label="Add New Item"
          icon="pi pi-plus"
          severity="secondary"
          outlined
          onClick={openNew}
        />
      </React.Fragment>
    );
  };

  const imageBody = (data) => {
    return (
      <img
        src={data.imageUrl}
        alt={data.imageUrl}
        className="w-6rem shadow-2 border-round"
      />
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Deskripsi Menu</h5>
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

  let arr = data.data ?? [];

  return (
    <div className="container">
      <div className="py-4">
        <br></br>
        <div className="title-crud"> DATA MENU </div>
        <br></br> <br></br>
        <div className="datatable-crud-demo">
          <Toast ref={toast} />
          <div className="card">
            <Toolbar
              className="mb-4"
              left={leftToolbarTemplate}
              right={rightToolbarTemplate}
            ></Toolbar>
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
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              selection={selectedData}
              onSelectionChange={(e) => setSelectedData(e.value)}
              dataKey="idMenu"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} data"
            >
              <Column
                selectionMode="multiple"
                headerStyle={{ width: "3rem" }}
                exportable={false}
              ></Column>
              <Column
                field="idMenu"
                header="ID Menu"
                sortable
                style={{ minWidth: "10rem" }}
              ></Column>
              <Column
                field="namaMenu"
                header="Nama Menu"
                sortable
                style={{ minWidth: "10rem" }}
              ></Column>
              <Column
                field="hargaMenu"
                header="Harga Menu"
                sortable
                style={{ minWidth: "10rem" }}
              ></Column>
              <Column
                field="stokMenu"
                header="Stok Menu"
                sortable
                style={{ minWidth: "10rem" }}
              ></Column>
              <Column
                field="deskripsiMenu"
                header="Deskripsi Menu"
                sortable
                style={{ minWidth: "10rem" }}
              ></Column>
              <Column
                field="kategoriMenu"
                header="Kategori Menu"
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
                style={{ minWidth: "12rem" }}
              ></Column>
            </DataTable>
          </div>

          <Dialog
            visible={productDialog}
            style={{ width: "450px" }}
            header="Tambah Data"
            modal
            className="p-fluid"
            footer={productDialogFooter}
            onHide={hideDialog}
          >
            <div className="field">
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="price">Harga</label>
                <InputText
                  id="price"
                  value={harga}
                  onChange={(e) => setHarga(e.target.value)}
                />
              </div>
              <div className="field col">
                <label htmlFor="quantity">Stok</label>
                <InputText
                  id="quantity"
                  value={stok}
                  onChange={(e) => setStok(e.target.value)}
                  integeronly
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="description">Deskripsi</label>
              <InputTextarea
                id="description"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                required
                rows={3}
                cols={20}
              />
            </div>

            <div className="field">
              <label htmlFor="category">Kategori</label>
              <InputText
                id="category"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
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
                onChange={(e) => setGambar(e.target.file)}
                mode="basic"
                auto={true}
                chooseLabel="Upload invoice"
              />
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default DataMenucomp;
