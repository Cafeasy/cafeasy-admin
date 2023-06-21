import React, { useState, useEffect, useRef } from "react";
import "../Crud/Crud.css";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { InputText } from "primereact/inputtext";
import { Tag } from 'primereact/tag';
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar"; 

const DataPelanggancomp = () => {
  const [data, setData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const toast = useRef(null);

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
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
      </React.Fragment>
    );
  };

  useEffect(() => {
    axios
      .get(` ${process.env.REACT_APP_API_URL}/customer/`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log(error));
  }, [data]);
  
  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Deskripsi Pelanggan</h5>
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

  console.log(data);

  let arr = data.data ?? [];

  return (
    <div className="container">
      <div className="py-4">
        <br></br>
        <div className="title-crud"> DATA PELANGGAN </div>
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
            selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} data"
            >
                <Column selectionMode="multiple" headerStyle={{ width: "0.5%" }} exportable={false} ></Column>
                <Column field="id" header="ID" sortable style={{ width: '15%' }} />
                <Column field="name" header="Nama" sortable style={{ width: '15%' }} />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataPelanggancomp;
