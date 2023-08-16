import React, { useState, useEffect, useRef } from "react";
import "../../Utils/Crud.css";
import AvailableMenu from "./AvailableMenu";
import NotAvailableMenu from "./NotAvailableMenu";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";

const DEFAULT_MENU = {
  imageFile: "",
  hargaMenu: "",
  stokMenu: "",
  deskripsiMenu: "",
  kategoriMenu: "",
  namaMenu: "",
};

const DataMenucomp = ({ data = [], kategori = [] }) => {
  const toast = useRef(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [deleteMenuDialog, setDeleteMenuDialog] = useState(false);
  const [deleteAllDialog, setDeleteAllDialog] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  const [detailDialog, setDetailDialog] = useState(false);
  const [menu, setMenu] = useState(DEFAULT_MENU);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    setMenus(data);
  }, []);

  // cancel modal
  const hideDialog = () => {
    setProductDialog(false);
  };

  const hideDetailDialog = () => {
    setDetailDialog(false);
  };

  // open form
  const openForm = (selectedMenu = {}) => {
    setMenu((data) => ({ ...data, ...selectedMenu }));
    setProductDialog(true);
  };

  // open form
  const openDetail = (selectedMenu = {}) => {
    setMenu((data) => ({ ...data, ...selectedMenu }));
    setDetailDialog(true);
  };

  // confirm delete
  const confirmDeleteSelected = (selectedMenu) => {
    setMenu((data) => ({ ...data, ...selectedMenu }));
    setDeleteMenuDialog(true);
  };

  // submit

  const onSubmit = async () => {
    const formData = new FormData();

    formData.append("image", menu.imageFile);
    formData.append("hargaMenu", menu.hargaMenu);
    formData.append("stokMenu", menu.stokMenu);
    formData.append("deskripsiMenu", menu.deskripsiMenu);
    formData.append("kategoriMenu", menu.kategoriMenu);
    formData.append("namaMenu", menu.namaMenu);

    if (menu.idMenu) {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/updateDataMenu/${menu.idMenu}`,
          formData
        )
        .then((response) => {
          let index;
          const filteredData = menus.some((x, i) => {
            index = i;
            return x.idMenu === menu.idMenu;
          });
          const newMenus = [...menus];
          newMenus.splice(index, 1, response.data.data);
          setMenus(newMenus);
          setProductDialog(false);
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Data Berhasil Disimpan",
            life: 3000,
          });
          setMenu(DEFAULT_MENU);
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
        .post(`${process.env.REACT_APP_API_URL}/insertMenu/`, formData)
        .then((response) => {
     
          setMenus((prevData) => [...prevData, response.data.data]);
          setProductDialog(false);
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Data Berhasil Disimpan",
            life: 3000,
          });
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

  const EksporToSpreadsheet = async () => {
    let dataMenuArray = [];
    let data;
    dataMenuArray[0] = [
      "Id Menu",
      "Nama Menu",
      "Deskripsi Menu",
      "Harga Menu",
      "Stok Menu",
      "Image",
    ];
    const sheetName = "Data Menu";
    for (var i = 0; i < menus.length; i++) {
      menus.map((value) => {
        dataMenuArray.push([
          value.idMenu,
          value.namaMenu,
          value.deskripsiMenu,
          value.hargaMenu,
          value.stokMenu,
          value.imageUrl,
        ]);
      });
    }


    data = { sheetName: sheetName, data: dataMenuArray };

    await axios
      .post(`${process.env.REACT_APP_API_URL}/createNewSpreadsheet`, data)
      .then(() => {
        var win = window.open(
          "https://docs.google.com/spreadsheets/d/1suDps63BnNPDeIDAHZ07leYFnbihjoatWByahkd41lk/edit?usp=sharing",
          "_blank"
        );
        win.focus();
      });
  };

  const bodyTemplate = (rowData) => {
    return (
      <div className="white-space-nowrap overflow-hidden text-overflow-ellipsis">
        {rowData.deskripsiMenu}
      </div>
    );
  };

  const invoiceUploadHandler = (e) => {
    setMenu((data) => ({ ...data, imageFile: e.files[0] }));
  };

  const confirmDeleteAll = () => {
    setDeleteAllDialog(true);
  };

  const hideDeleteMenuDialog = () => {
    setDeleteMenuDialog(false);
  };

  const hideDeleteAllDialog = () => {
    setDeleteAllDialog(false);
  };

  const deleteMenu = async () => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/deleteMenuById/${menu.idMenu}`)
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
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const deleteAll = async () => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/deleteAllMenu`)
      .then((response) => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Data Berhasil Dihapus",
          life: 3000,
        });
        setMenu(DEFAULT_MENU);
        setDeleteMenuDialog(true);
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

  const detailDialogFooter = (
    <React.Fragment>
      <Button
        label="Batal"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => {
          hideDetailDialog();
          setMenu(DEFAULT_MENU);
        }}
      />
    </React.Fragment>
  );

  const imageBody = (data) => (
    <img
      src={data.imageUrl}
      alt={data.imageUrl}
      className="w-6rem shadow-2 border-round"
    />
  );

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Semua Menu</h5>
      <div className="flex gap-2">
        <Button
          className="button-tambah"
          label="Tambah Menu"
          icon="pi pi-plus"
          raised
          onClick={() => openForm()}
        />
        <Button
          className="button-spreed"
          label="Ekspor ke Spreedsheet"
          icon="pi pi-file-excel"
          severity="secondary"
          raised
          onClick={() => EksporToSpreadsheet()}
        />
        <Button
          className="button-hapus"
          label="Hapus Semua"
          icon="pi pi-trash"
          severity="danger"
          raised
          onClick={confirmDeleteAll}
        />
        <span className="p-input-icon-left search-i ">
          <i className="pi pi-search" />
          <InputText
            className="button-cari"
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Cari..."
          />
        </span>
      </div>
    </div>
  );

  const actionTemplate = (menu) => (
    <>
      <Button
        label="Detail"
        className="mx-2"
        icon="pi pi-info-circle"
        severity="info"
        rounded
        onClick={() => openDetail(menu)}
      />
      <Button
        label="Edit"
        className="mx-2"
        icon="pi pi-pencil"
        saverity="primary"
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

  let arr = data.data ?? [];

  return (
    <div className="container">
      <div className="py-4">
        <br></br>
        <div className="row">
          <div className="col-md-3">
            <div className="title-menu-pertama"> DATATABLE MENU </div>
          </div>
          <div className="col-sm-4">
            <div className="title-menu-kedua"> Admin / </div>
          </div>
          <div className="col-sm-2">
            <div className="title-menu-ketiga"> Data Menu </div>
          </div>
        </div>
        <br></br> <br></br>
        <div className="datatable-crud-demo">
          <Toast ref={toast} />
          <div className="card">
            <DataTable
              value={menus}
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
                style={{ maxWidth: 220 }}
                body={bodyTemplate}
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
                body={actionTemplate}
              ></Column>
            </DataTable>
          </div>
          <br></br>
          <AvailableMenu />
          <br></br>
          <NotAvailableMenu />

          <Dialog
            visible={productDialog}
            style={{ width: "450px" }}
            header={menu.idMenu ? "Detail Menu" : "Tambah Menu"}
            modal
            className="p-fluid"
            footer={productDialogFooter}
            onHide={() => {
              hideDialog();
              setMenu(DEFAULT_MENU);
            }}
          >
            {menu.imageUrl && (
              <img
                src={menu.imageUrl}
                alt={menu.namaMenu}
                className="w-full m-auto mb-3"
                style={{ borderRadius: "8px" }}
              />
            )}

            <div className="field">
              <label htmlFor="name">Name Menu</label>
              <InputText
                id="name"
                defaultValue={menu.namaMenu}
                onChange={(e) => {
                  setMenu((data) => ({ ...data, namaMenu: e.target.value }));
                }}
                required
                autoFocus
              />
            </div>

            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="price">Harga</label>
                <InputText
                  id="price"
                  defaultValue={menu.hargaMenu}
                  onChange={(e) => {
                    setMenu((data) => ({
                      ...data,
                      hargaMenu: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="field col">
                <label htmlFor="quantity" className="font-bold">
                  Stok
                </label>
                <InputText
                  id="quantity"
                  defaultValue={menu.stokMenu}
                  onChange={(e) => {
                    setMenu((data) => ({
                      ...data,
                      stokMenu: e.target.value,
                    }));
                  }}
                  integeronly
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="description">Deskripsi</label>
              <InputTextarea
                id="description"
                defaultValue={menu.deskripsiMenu}
                onChange={(e) => {
                  setMenu((data) => ({
                    ...data,
                    deskripsiMenu: e.target.value,
                  }));
                }}
                required
                rows={3}
                cols={20}
              />
            </div>

            <div className="field">
              <label htmlFor="category">Kategori</label>
              <Dropdown
                id="category"
                value={menu.kategoriMenu}
                onChange={(e) => {
                  setMenu((data) => ({
                    ...data,
                    kategoriMenu: e.value,
                  }));
                }}
                options={kategori.map((x) => x.namaKategori)}
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
                chooseLabel={menu.imageFile.name ?? "Tambah Foto"}
              />
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
                  Apakah anda yakin ingin menghapus <b>{menu.namaMenu}</b>?
                </span>
              )}
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
                Apakah anda yakin ingin menghapus <b>semua menu</b>?
              </span>
            </div>
          </Dialog>

          <div className="card flex justify-content-center">
            <Card
              visible={detailDialog}
              title="Title"
              subTitle="Subtitle"
              footer={detailDialogFooter}
              header={imageBody}
              className="md:w-25rem"
            >
              <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa
                ratione quam perferendis esse, cupiditate neque quas!
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataMenucomp;
