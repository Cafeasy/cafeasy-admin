import React, { useState, useEffect, useRef } from "react";
import "../../Utils/Crud.css";
import axios from "axios";
import TransaksiPerhari from "./TransaksiPerhari";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "bootstrap";

const DEFAULT_TRANSAKSI = {
  namaPelanggan: "",
  tanggal: "",
  noMeja: "",
  totalHarga: "",
  statusBayar: "",
};

const DataTransaksicomp = ({ data = [] }) => {
  const toast = useRef(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [deleteTransaksiDialog, setDeleteTransaksiDialog] = useState(false);
  const [deleteAllTransaksiDialog, setDeleteAllTransaksiDialog] =
    useState(false);
  const [TransaksiDialog, setTransaksiDialog] = useState(false);
  const [transaksi, setTransaksi] = useState(DEFAULT_TRANSAKSI);
  const [dataTransaksi, setdataTransaksi] = useState([]);

  useEffect(() => {
    setdataTransaksi(data);
  }, []);

  const openForm = (selectedMenu = {}) => {
    setTransaksi((data) => ({ ...data, ...selectedMenu }));
    setTransaksiDialog(true);
  };

  const statusBody = (data) => {
    return <Tag value={data.statusBayar} severity={getSeverity(data)}></Tag>;
  };

  const hideTransaksiDialog = () => {
    setTransaksiDialog(false);
  };

  const confirmDeleteSelected = (selectedMenu) => {
    setTransaksi((data) => ({ ...data, ...selectedMenu }));
    setDeleteTransaksiDialog(true);
  };

  const hideDeleteTransaksiDialog = () => {
    setDeleteTransaksiDialog(false);
  };

  // const hideDeleteAllTransaksiDialog = () => {
  //   setDeleteAllTransaksiDialog(false);
  // };

  // const confirmDeleteAllTransaksi = () => {
  //   setDeleteAllTransaksiDialog(true);
  // };

  const SubmitTransaksi = async () => {
    const formData = new FormData();

    formData.append("namaPelanggan", transaksi.namaPelanggan);
    formData.append("tanggal", transaksi.tanggal);
    formData.append("noMeja", transaksi.noMeja);
    formData.append("totalHarga", transaksi.totalHarga);
    formData.append("statusBayar", transaksi.statusBayar);

    if (transaksi.idTransaksi)
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/updateStatusBayarCash/${transaksi.idTransaksi}`,
          formData
        )
        .then((response) => {
          let index;
          const filteredData = dataTransaksi.some((x, i) => {
            index = i;
            return x.idTransaksi === transaksi.idTransaksi;
          });
          const newdataTransaksi = [...dataTransaksi];
          newdataTransaksi.splice(index, 1, response.data.data);
          setdataTransaksi(newdataTransaksi);
          setTransaksiDialog(false);
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Data Berhasil Disimpan",
            life: 3000,
          });

          setTransaksi(DEFAULT_TRANSAKSI);
        })
        .catch((response) => {
          toast.current.show({
            severity: "error",
            summary: "Failed",
            detail: "Data Gagal Disimpan",
            life: 3000,
          });
        });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const exportSpreadsheet = async () => {
    let data1;
    let dataPesanan = [];

    dataTransaksi.map((value) => {
      dataPesanan.push([
        value.idTransaksi,
        value.namaPelanggan,
        value.tanggal,
        value.totalHarga,
        value.statusBayar,])
    });

    data1 = {
      data: dataPesanan
    };
    console.log(data1);
    await axios
      .post(`${process.env.REACT_APP_API_URL}/writeSpreadsheet`, data1)
      .then(() => {
        window.open(
          "https://docs.google.com/spreadsheets/d/1suDps63BnNPDeIDAHZ07leYFnbihjoatWByahkd41lk/edit?usp=sharing",
          "_blank"
        );

      });
  };

  // const deleteAllTransaksi = async () => {
  //   await axios
  //     .delete(`${process.env.REACT_APP_API_URL}/deleteAllTransaksi`)
  //     .then((response) => {
  //       toast.current.show({
  //         severity: "success",
  //         summary: "Success",
  //         detail: "Data Berhasil Dihapus",
  //         life: 3000,
  //       });
  //       setTransaksi(DEFAULT_TRANSAKSI);
  //       setDeleteTransaksiDialog(false);
  //     })
  //     .catch((response) => {
  //       toast.current.show({
  //         severity: "error",
  //         summary: "Failed",
  //         detail: "Data Gagal Dihapus",
  //         life: 3000,
  //       });
  //     });
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 1000);
  // };

  const deleteTransaksi = async () => {
    await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/deleteTransaksiById/${transaksi.idTransaksi}`
      )
      .then((response) => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Data Berhasil Dihapus",
          life: 3000,
        });
        setTransaksi(DEFAULT_TRANSAKSI);
        setDeleteTransaksiDialog(false);
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

  const transaksiDialogFooter = (
    <React.Fragment>
      <Button
        label="Batal"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => {
          hideTransaksiDialog();
          setTransaksi(DEFAULT_TRANSAKSI);
        }}
      />
      <Button
        label="Simpan"
        icon="pi pi-check"
        className="p-button-text"
        onClick={SubmitTransaksi}
      />
    </React.Fragment>
  );

  const deleteTransaksiDialogFooter = (
    <>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteTransaksiDialog}
      />
      <Button
        label="Iya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteTransaksi}
      />
    </>
  );

  // const deleteAllTransaksiDialogFooter = (
  //   <>
  //     <Button
  //       label="Tidak"
  //       icon="pi pi-times"
  //       outlined
  //       onClick={hideDeleteAllTransaksiDialog}
  //     />
  //     <Button
  //       label="Iya"
  //       icon="pi pi-check"
  //       severity="danger"
  //       onClick={deleteAllTransaksi}
  //     />
  //   </>
  // );

  const getSeverity = (data) => {
    switch (data.statusBayar) {
      case "Sukses Bayar Cash":
        return "success";

      case "SUCCESS":
        return "success";

      case "PENDING":
        return "warning";

      case "Pembayaran Dilakukan Di kasir":
        return "warning";

      case "BELUM BAYAR":
        return "danger";

      default:
        return null;
    }
  };

  const actionButtonTransaksi = (transaksi) => (
    <>
      <Button
        label="Bayar Cash"
        className="mx-2"
        icon="pi pi-pencil"
        rounded
        onClick={() => openForm(transaksi)}
      />
      <Button
        label="Hapus"
        className="mx-2"
        icon="pi pi-trash"
        severity="danger"
        rounded
        onClick={() => confirmDeleteSelected(transaksi)}
      />
    </>
  );

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Semua Transaksi</h5>
      <div className="flex gap-2">
        <Button
          on
          label="Ekspor ke Spreedsheet"
          icon="pi pi-file-excel"
          severity="secondary"
          raised
          onClick={exportSpreadsheet}
        />
        {/* <Button
          label="Hapus Semua"
          icon="pi pi-trash"
          severity="danger"
          raised
          onClick={confirmDeleteAllTransaksi}
        /> */}
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

  let arr = data.data ?? [];

  return (
    <div className="container">
      <div className="py-4">
        <br></br>
        <div className="row">
          <div className="col-md-3">
            <div className="title-transaksi-pertama"> DATATABLE TRANSAKSI </div>
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
              value={dataTransaksi}
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
              <Column
                header="Aksi"
                exportable={false}
                style={{ minWidth: "12rem" }}
                body={actionButtonTransaksi}
              ></Column>
            </DataTable>
          </div>
          <br></br>
          <TransaksiPerhari />

          <ConfirmPopup
            visible={TransaksiDialog}
            onHide={() => {
              hideTransaksiDialog();
              setTransaksi(DEFAULT_TRANSAKSI);
            }}
            accept={SubmitTransaksi}
            message="Apakah anda ingin mengganti status bayar?"
            icon="pi pi-exclamation-triangle"
          />

          <Dialog
            visible={deleteTransaksiDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Konfirmasi"
            modal
            footer={deleteTransaksiDialogFooter}
            onHide={hideDeleteTransaksiDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {transaksi && (
                <span>
                  Apakah anda yakin ingin menghapus{" "}
                  <b>{transaksi.namaPelanggan}</b>?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteAllTransaksiDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Konfirmasi"
          //   modal
          //   footer={deleteAllTransaksiDialogFooter}
          //   onHide={hideDeleteAllTransaksiDialog}
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
