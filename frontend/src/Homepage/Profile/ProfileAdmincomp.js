import React, { useState, useEffect } from "react";
import "../../Utils/Crud.css";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Row } from "react-bootstrap";

const ProfileAdmincomp = () => {
  const params = useParams();
  const urlParams = params.idAdmin;
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/profile/` + urlParams)
      .then((res) => setData(res.data.data));
  }, [data]);

  console.log(data);
  
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

  let arr = data?.result;

  return (
    <div className="container">
      <div className="py-4">
        <br></br>
        <div className="row">
          <div className="col-md-3">
            <div className="title-profile-pertama">
              {" "}
              DATATABLE PROFIL ADMIN{" "}
            </div>
          </div>
          <div className="col-sm-4">
            <div className="title-profile-kedua"> Admin / </div>
          </div>
          <div className="col-sm-2">
            <div className="title-profile-ketiga"> Profil Admin </div>
          </div>
        </div>
        <br></br> <br></br>
        <div className="datatable-crud-demo">
          <div className="card">
            <DataTable
              value={data?.result}
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
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Menampilkan {first} hingga {last} dari {totalRecords} data"
            >
              <Column
                field="idAdmin"
                header="ID Admin"
                sortable
                style={{ width: "15%" }}
              />
              <Column
                field="emailCafe"
                header="Email Cafe"
                sortable
                style={{ width: "15%" }}
              />
              <Column
                field="username"
                header="Username"
                sortable
                style={{ width: "15%" }}
              />
              <Column
                field="password"
                header="Password"
                sortable
                style={{ width: "15%" }}
              />
              <Column
                field="namaCafe"
                header="Nama Cafe"
                sortable
                style={{ width: "15%" }}
              />
              <Column
                field="alamatCafe"
                header="Alamat Cafe"
                sortable
                style={{ width: "15%" }}
              />
              <Column
                field="deskripsiCafe"
                header="Deskripsi Cafe"
                sortable
                style={{ maxwidth: "15%" }}
              />
              <Column
                field="namaPemilikCafe"
                header="Nama Pemilik"
                sortable
                style={{ width: "15%" }}
              />
              <Column
                field="noHpCafe"
                header="No HP"
                sortable
                style={{ width: "15%" }}
              />
              <Column
                field="image"
                header="Gambar"
                sortable
                style={{ width: "15%" }}
              />
              <Column
                field="imageUrl"
                header=""
                sortable
                style={{ width: "15%" }}
              />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdmincomp;
