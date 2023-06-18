import React, { useState, useEffect } from "react";
import * as MdIcons from 'react-icons/md';
import "../Crud/Crud.css";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { FileUpload } from "primereact/fileupload";

const DataMenucomp = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(` ${process.env.REACT_APP_API_URL}/menu/`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log(error));
  }, [data]);

  // Import 
  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const importCSV = (e) => {
    const file = e.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target.result;
      const data = csv.split("\n");

      // Prepare DataTable
      const cols = data[0].replace(/['"]+/g, "").split(",");
      data.shift();

      const importedData = data.map((d) => {
        d = d.split(",");
        const processedData = cols.reduce((obj, c, i) => {
          c =
            c === "Status"
              ? "inventoryStatus"
              : c === "Reviews"
              ? "rating"
              : c.toLowerCase();
          obj[c] = d[i].replace(/['"]+/g, "");
          (c === "price" || c === "rating") && (obj[c] = parseFloat(obj[c]));
          return obj;
        }, {});

        processedData["id"] = createId();
        return processedData;
      });

      const _products = [...data, ...importedData];

      setData(_products);
    };

    reader.readAsText(file, "UTF-8");
  };
  // 

  const imageBody = (data) => {
    return <img src={`https://firebasestorage.googleapis.com/v0/b/cafeasy-y543f4c.appspot.com/o/menuPict%2Fmenu-cmg5hi?alt=media&token=f38e42a9-5248-47e9-9e5b-7fcdd19b5624${data.image}`} alt={data.image} className="w-6rem shadow-2 border-round" />;
};

  const [globalFilter, setGlobalFilter] = useState(null);
  
  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Deskripsi Menu</h5>
      <Button label="New Item" severity="secondary" outlined />
      <Button label="Export as Spreedsheet" severity="secondary" outlined />
      <FileUpload
          mode="basic"
          name="aplot"
          auto
          url="https://primefaces.org/primereact/showcase/upload.php"
          accept=".csv"
          chooseLabel="Import"
          className="mr-2 inline-block"
          onUpload={importCSV}
        />
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
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            >
                <Column field="idMenu" header="ID Menu" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="namaMenu" header="Nama Menu" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="hargaMenu" header="Harga Menu" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="stokMenu" header="Stok Menu" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="deskripsiMenu" header="Deskripsi Menu" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="kategoriMenu" header="Kategori Menu" sortable style={{ minWidth: "10rem" }} ></Column>
                <Column field="image" header="Gambar" body={imageBody} sortable style={{ minWidth: "10rem" }} ></Column>
                <Column header="Aksi" exportable={false} sortable style={{ minWidth: "10rem" }} ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataMenucomp;
