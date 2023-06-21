import React, { useState, useEffect } from "react";
import "../Crud/Crud.css";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Toolbar } from "primereact/toolbar"; 
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";

  const DataMenucomp = () => {
  let emptyData = {
    idMenu: null,
    namaMenu: "",
    hargaMenu: 0,
    stokMenu: 0,
    deskripsiMenu: null,
    kategoriMenu: "",
    imageUrl: 0,
  };

  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [product, setProduct] = useState(emptyData);
  const [submitted, setSubmitted] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };
  
  const saveProduct = () => {
    setSubmitted(true);
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
    setProduct(emptyData);
    setSubmitted(false);
    setProductDialog(true);
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
        onClick={saveProduct}
      />
    </React.Fragment>
  );

  const onInputChange = (e, namaMenu) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${namaMenu}`] = val;

    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={openNew}
        />
      </React.Fragment>
    );
  };

  const onInputNumberChange = (e, namaMenu) => {
    const val = e.value || 0;
    let _product = { ...product };
    _product[`${namaMenu}`] = val;

    setProduct(_product);
  };

  const imageBody = (data) => {
    return <img src={data.imageUrl} alt={data.imageUrl} className="w-6rem shadow-2 border-round" />;
  };
  
  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Deskripsi Menu</h5>
      <span className="p-input-icon-left" > 
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
        <div className="title-crud"> DATA MENU </div>
        <br></br> <br></br>
        <div className="datatable-crud-demo">
        <div className="card">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
        ></Toolbar>
            <DataTable value={arr} header={header} 
            resizableColumns
            showGridlines 
            stripedRows 
            tableStyle={{ minWidth: '50rem' }} 
            scrollable scrollHeight="500px" 
            globalFilter={globalFilter}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            selection={selectedData} onSelectionChange={(e) => setSelectedData(e.value)} dataKey="idMenu"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} data"
            >
                <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} exportable={false} ></Column>
                <Column field="idMenu" header="ID Menu" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="namaMenu" header="Nama Menu" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="hargaMenu" header="Harga Menu" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="stokMenu" header="Stok Menu" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="deskripsiMenu" header="Deskripsi Menu" sortable style={{ minWidth: "10rem" }}  ></Column>
                <Column field="kategoriMenu" header="Kategori Menu" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="imageUrl" header="Gambar" body={imageBody} sortable style={{ minWidth: "10rem" }} ></Column>
                <Column header="Aksi" exportable={false} style={{ minWidth: '12rem' }} ></Column>
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
            value={product.namaMenu}
            onChange={(e) => onInputChange(e, "namaMenu")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.namaMenu })}
          />
          {submitted && !product.namaMenu && (
            <small className="p-error">Name is required.</small>
          )}
        </div>

        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="price">Harga</label>
            <InputNumber
              id="price"
              value={data.hargaMenu}
              onValueChange={(e) => onInputNumberChange(e, "price")}
            />
          </div>
          <div className="field col">
            <label htmlFor="quantity">Quantity</label>
            <InputNumber
              id="quantity"
              value={data.stokMenu}
              onValueChange={(e) => onInputNumberChange(e, "stokMenu")}
              integeronly
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="description">Deskripsi</label>
          <InputTextarea
            id="description"
            value={data.deskripsiMenu}
            onChange={(e) => onInputChange(e, "description")}
            required
            rows={3}
            cols={20}
          />
        </div>
      
      </Dialog>
        </div>
      </div>
    </div>
  );
}

export default DataMenucomp;
