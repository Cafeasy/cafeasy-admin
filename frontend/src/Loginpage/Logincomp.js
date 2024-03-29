import React, { useState, useEffect } from "react";
import Iconline from "../Photos/Iconline.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import "../Utils/Sign.css";
// const jwt = require('jsonwebtoken');
// import { Link } from 'react-router-dom';
// import { Navigate } from "react-router-dom";
// import ProfileAdmincomp from "../Homepage/ProfileAdmincomp";
// import PropTypes from 'prop-types'

function Logincomp() {
  const cookies = new Cookies();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nextNavigate = useNavigate();

  useEffect(() => {
    if (cookies.get("secretLogToken")) {
      var secretLogToken = cookies.get("secretLogToken");
      var decoded = jwt_decode(secretLogToken);
      var decodedIdAdmin = decoded.idAdmin;
      nextNavigate("/ProfileAdmin/" + decodedIdAdmin);
    }
  });

  const submitLogin = async (e) => {
    if ((username != "") & (password != "")) {
      e.preventDefault();
      var login = await axios.post(process.env.REACT_APP_API_URL + "/login", {
        username: username.toString(),
        password: password.toString(),
      });
      if (!cookies.get("secretLogToken")) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Login Berhasil!',
          showConfirmButton: false,
          timer: 1500
        })
        if (login.data.message == "sukses") {
          cookies.set("secretLogToken", login.data.secretLogToken);
          var idAdminToken = cookies.get("secretLogToken");
          var decoded = jwt_decode(idAdminToken);
          var decodedIdAdmin = decoded.idAdmin;
          nextNavigate("/ProfileAdmin/" + decodedIdAdmin);
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Gagal!",
            text: "Nama Pengguna atau Sandi salah!!!",
          });
        }
      }
    }
  };

  return (
    <div className="Logform-container">
      <form className="Logform" onSubmit={submitLogin}>
        <div className="Logform-content">
          <h3 className="Logform-title">Masuk</h3>
          <div className="click-button">
            <div className="row">
              <div className="col-md-3 color-text">
                <a href="">
                  Login <img src={Iconline} alt="Icon" />
                </a>
              </div>
              <div className="col-md-6">
                <a href="RegisterAdmin">Daftar</a>
              </div>
            </div>
          </div>

          <div className="form-group mt-3">
            <label>Nama Pengguna</label>
            <input
              type="text"
              required
              className="form-control mt-1"
              placeholder="Masukan Nama Pengguna"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group mt-3">
            <div className="inputbutton">
              <label>Sandi</label>
              <input
                type="password"
                required
                className="form-control mt-1"
                placeholder="Masukan Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              color="red"
              appearance="primary"
              type="submit"
              className="btn btn-secondary"
              onClick={submitLogin}
            >
              Masuk
            </button>
          </div>
          
        </div>
      </form>
    </div>
  );

  // return <div className="app">{ renderForm}</div>;
}

export default Logincomp;
