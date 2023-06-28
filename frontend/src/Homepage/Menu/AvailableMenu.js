import React, { useState, useEffect, useRef } from "react";
import "../../Utils/Crud.css";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";

const AvailableMenu = () => {
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);

  useEffect(() => {
    axios
      .get(` ${process.env.REACT_APP_API_URL}/availableMenu/`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log(error));
  }, [data]);

  const bodyTemplate = (rowData) => {
    return (
      <div className="white-space-nowrap overflow-hidden text-overflow-ellipsis">
        {rowData.deskripsiMenu}
      </div>
    );
  };

  const imageBody = (data) => (
    <img
      src={data.imageUrl}
      alt={data.imageUrl}
      className="w-6rem shadow-2 border-round"
    />
  );

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Menu Tersedia</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Cari..."
        />
      </span>
    </div>
  );

  let arr = data.data ?? [];

  return (
    <div className="datatable-crud-demo">
      <div className="card">
        <DataTable
          value={arr}
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
        </DataTable>
      </div>
    </div>
  );
};

export default AvailableMenu;
