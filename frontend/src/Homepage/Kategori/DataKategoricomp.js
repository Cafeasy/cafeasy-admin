import React, { useState, useEffect, useRef } from "react";
import "../../Utils/Crud.css";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { useParams } from "react-router-dom";

const DataPelanggancomp = () => {
  const params = useParams();
  const urlParams = params.idUser;

  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const toast = useRef(null);

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  useEffect(() => {
    axios
      .get(` ${process.env.REACT_APP_API_URL}/kategoriMenu/`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log(error));
  }, [data]);

  const handleDeleteItem = async (urlParams) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/deleteTransaksiById/` + urlParams
      );
      setData(data.filter((item) => item._id !== urlParams));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteButtonTemplate = (rowData) => {
    const deleteItem = () => {
      handleDeleteItem(rowData._id);
    };

    return (
      <Button
        icon="pi pi-trash"
        className="p-button-danger"
        onClick={deleteItem}
      />
    );
  };

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
          onClick={confirmDeleteSelected}
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
              selection={selectedData}
              onSelectionChange={(e) => setSelectedData(e.value)}
              dataKey="idKategori"
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Menampilkan {first} hingga {last} dari {totalRecords} data"
            >
              <Column
                selectionMode="multiple"
                headerStyle={{ width: "0.5%" }}
                exportable={false}
              ></Column>
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
                body={deleteButtonTemplate}
                style={{ width: "15%" }}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPelanggancomp;