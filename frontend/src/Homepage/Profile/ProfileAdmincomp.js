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

  console.log(urlParams);
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

  let arr = data.result;

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
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                      alt=""
                    />
                    <div class="file btn btn-lg btn-primary">
                      Change Photo
                      <input type="file" name="file" />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="profile-head">
                    <h5>{data.namaPemilikCafe}</h5>
                    <h6>Nama Cafe</h6>
                    <p class="proile-rating">Email</p>
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                      <li class="nav-item">
                        <a
                          class="nav-link active"
                          id="home-tab"
                          data-toggle="tab"
                          href="#home"
                          role="tab"
                          aria-controls="home"
                          aria-selected="true"
                        >
                          About
                        </a>
                      </li>
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
                          <p>Kshiti123</p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <label>Username</label>
                        </div>
                        <div class="col-md-6">
                          <p>Kshiti Ghelani</p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <label>Password</label>
                        </div>
                        <div class="col-md-6">
                          <p>kshitighelani@gmail.com</p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <label>Alamat Cafe</label>
                        </div>
                        <div class="col-md-6">
                          <p>123 456 7890</p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <label>Deskripsi Cafe</label>
                        </div>
                        <div class="col-md-6">
                          <p>Web Developer and Designer</p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <label>Nomor Telepon</label>
                        </div>
                        <div class="col-md-6">
                          <p>Web Developer and Designer</p>
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
