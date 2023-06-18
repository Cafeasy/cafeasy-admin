import React, { useState, useEffect } from "react";
import "../Crud/Crud.css";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { ToggleButton } from 'primereact/togglebutton';
import { Column } from 'primereact/column';
import { InputText } from "primereact/inputtext";

const ProfileAdmincomp = ({idAdmin}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData(idAdmin);
  }, [data]);

  const fetchData = async (idAdmin) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile/${idAdmin}`);
      console.log(response.data); // Handle the response data
    } catch (error) {
      console.error(error);
    }
  };

  const [globalFilter, setGlobalFilter] = useState(null);
  
  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Deskripsi Admin</h5>
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
        <div className="title-crud"> PROFILE ADMIN </div>
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
                <Column field="idAdmin" header="ID Admin" sortable style={{ width: '15%' }} />
                <Column field="emailCafe" header="Email Cafe" sortable style={{ width: '15%' }} />
                <Column field="username" header="Username" sortable style={{ width: '15%' }} />
                <Column field="password" header="Password" sortable style={{ width: '15%' }} />
                <Column field="namaCafe" header="Nama Cafe" sortable style={{ width: '15%' }} />
                <Column field="alamatCafe" header="Alamat Cafe" sortable style={{ width: '15%' }} />
                <Column field="deskripsiCafe" header="Deskripsi Cafe" sortable style={{ width: '15%' }} />
                <Column field="namaPemilikCafe" header="Nama Pemilik" sortable style={{ width: '15%' }} />
                <Column field="noHpCafe" header="No HP" sortable style={{ width: '15%' }} />
                <Column field="image" header="Gambar" sortable style={{ width: '15%' }} />
                <Column field="imageUrl" header="" sortable style={{ width: '15%' }} />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileAdmincomp;
