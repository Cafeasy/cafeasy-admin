import React, { useState, useEffect, useRef } from "react";
import "../Crud/Crud.css";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Toolbar } from "primereact/toolbar"; 
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
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const toast = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [productDialog, setProductDialog] = useState(false);

  
  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };
  
  const saveProduct = () => {
    setSubmitted(true);

    if (product.namaMenu.trim()) {
      let _data = [...data];
      let _product = { ...product };
      if (product.id) {
        const index = findIndexById(product.id);

        _data[index] = _product;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000
        });
      } else {
        _product.id = createId();
        _product.image = "product-placeholder.svg";
        _data.push(_product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000
        });
      }

      setData(_data);
      setProductDialog(false);
      setProduct(emptyData);
    }
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const findIndexById = (idMenu) => {
    let index = -1;
    for (let i = 0; i < data.length; i++) {
      if (data[i].idMenu === idMenu) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
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
    let _data = { ...data };
    _data[`${namaMenu}`] = val;

    setProduct(_data);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="secondary" outlined 
          onClick={confirmDeleteSelected}
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
          severity="secondary" outlined 
        />
        <Button
          label="Add New Item"
          icon="pi pi-plus"
          severity="secondary" outlined
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
        <Toast ref={toast} />
        <div className="card">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
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
            value={data.namaMenu}
            onChange={(e) => onInputChange(e, "namaMenu")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.namaMenu })}
          />
          {submitted && !data.namaMenu && (
            <small className="p-error">Name is required.</small>
          )}
        </div>

        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="price">Harga</label>
            <InputText
              id="price"
              value={data.hargaMenu}
              onValueChange={(e) => onInputNumberChange(e, "price")}
            />
          </div>
          <div className="field col">
            <label htmlFor="quantity">Quantity</label>
            <InputText
              id="quantity"
              value={data.stokMenu}
              onValueChange={(e) => onInputNumberChange(e, "quantity")}
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

        <div className="field">
          <label htmlFor="category">Kategori</label>
          <InputText
            id="category"
            value={data.kategoriMenu}
            onChange={(e) => onInputChange(e, "category")}
            required
            autoFocus
          />
          </div>
      
      </Dialog>
        </div>
      </div>
    </div>
  );
}

export default DataMenucomp;
