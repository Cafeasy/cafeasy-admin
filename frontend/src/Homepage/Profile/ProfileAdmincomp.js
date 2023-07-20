import React, { useState, useEffect } from "react";
import "../../Utils/Crud.css";
import "../Profile/ProfileAdmin.css";
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

  let arr = data.result ?? [];

  console.log(urlParams);

  console.log(arr[0]);
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
        <div className="datatable-crud-demo">
          <div class="container profil-bungkus">
            <form method="post">
              <div class="row">
                <div class="col-md-4">
                  <div class="profile-img">
                    <img
                      src={arr[0]?.imageUrl}
                      alt=""
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="profile-head">
                    <h5>{arr[0]?.namaPemilikCafe}</h5>
                    <h6>{arr[0]?.namaCafe}</h6>
                    <p class="proile-rating">{arr[0]?.emailCafe}</p>
                    <br></br> <br></br> <br></br>
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                    </ul>
                  </div>
                </div>
                <div class="col-md-2">
                  <input
                    type="submit"
                    class="profile-edit-btn"
                    name="btnAddMore"
                    value="Edit Profile"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-8">
                  <div class="tab-content profile-tab" id="myTabContent">
                    <div
                      class="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <div class="row">
                        <div class="col-md-6">
                          <label>ID Admin</label>
                        </div>
                        <div class="col-md-6">
                          <p>{arr[0]?.idAdmin}</p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <label>Username</label>
                        </div>
                        <div class="col-md-6">
                          <p>{arr[0]?.username}</p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <label>Password</label>
                        </div>
                        <div class="col-md-6">
                          <p>{arr[0]?.password}</p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <label>Alamat Cafe</label>
                        </div>
                        <div class="col-md-6">
                          <p>{arr[0]?.alamatCafe}</p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <label>Deskripsi Cafe</label>
                        </div>
                        <div class="col-md-6">
                          <p>{arr[0]?.deskripsiCafe}</p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <label>Nomor Telepon</label>
                        </div>
                        <div class="col-md-6">
                          <p>{arr[0]?.noHpCafe}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdmincomp;
