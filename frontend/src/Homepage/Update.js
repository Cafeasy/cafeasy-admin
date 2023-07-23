import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const USER_UPDATE = {
  username: "",
  emailCafe: "",
  password: "",
  namaCafe: "",
  alamatCafe: "",
  deskripsiCafe: "",
  namaPemilikCafe: "",
  noHpCafe: "",
  image: "",
};

function Update() {
  const params = useParams();
  const urlParams = params.idAdmin;
  const [Update, setUpdate] = useState(USER_UPDATE);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    const formData = new FormData();
    
    formData.append("username", Update.username);
    formData.append("emailCafe", Update.emailCafe);
    formData.append("password", Update.password);
    formData.append("namaCafe", Update.namaCafe);
    formData.append("alamatCafe", Update.alamatCafe);
    formData.append("deskripsiCafe", Update.deskripsiCafe);
    formData.append("namaPemilikCafe", Update.namaPemilikCafe);
    formData.append("noHpCafe", Update.noHpCafe);
    formData.append("image", Update.image);

    e.preventDefault();
    await axios
      .put(
        `${process.env.REACT_APP_API_URL}/updateProfile/` + urlParams,
        formData
      )
      .then((res) => {
        alert("Pendaftaran Berhasil");
        Navigate("/ProfileAdmin/:idAdmin");
        console.log(res.formData);
        setUpdate(USER_UPDATE);
      })
      .catch((err) => {
        alert("Pendaftaran Gagal");
      });
  };

  return (
    <div className="Logform-container">
      <form className="Logform">
        <div className="Logform-content">
          <br></br>

          <div className="row">
            <div className="col-sm">
              <label>Email</label>
              <input
                defaultValue={Update.emailCafe}
                onChange={(e) =>
                  setUpdate((data) => ({ ...data, emailCafe: e.target.value }))
                }
                type="email"
                id="email"
                className="form-control mt-1"
                placeholder="Masukan Email"
                required
              />
            </div>
            <div className="col-sm">
              <label>Nama Pengguna</label>
              <input
                defaultValue={Update.username}
                onChange={(e) =>
                  setUpdate((data) => ({ ...data, username: e.target.value }))
                }
                type="text"
                className="form-control mt-1"
                placeholder="Masukan Nama Pengguna"
              />
            </div>
          </div>

          <br></br>

          <div className="row">
            <div className="col-sm">
              <label>Sandi</label>
              <input
                defaultValue={Update.password}
                onChange={(e) =>
                  setUpdate((data) => ({ ...data, password: e.target.value }))
                }
                type="password"
                className="form-control mt-1"
                placeholder="Masukan Sandi"
              />
              <i class="bi bi-eye-slash" id="togglePassword"></i>
            </div>
            <div className="col-sm">
              <label>Nama Cafe</label>
              <input
                defaultValue={Update.namaCafe}
                onChange={(e) =>
                  setUpdate((data) => ({ ...data, namaCafe: e.target.value }))
                }
                type="text"
                className="form-control mt-1"
                placeholder="Masukan Nama Cafe"
              />
            </div>
          </div>

          <div class="form-group mt-3">
            <label>Alamat Cafe</label>
            <textarea
              defaultValue={Update.alamatCafe}
              onChange={(e) =>
                setUpdate((data) => ({ ...data, alamatCafe: e.target.value }))
              }
              type="text"
              className="form-control mt-1"
              placeholder="Masukan Alamat"
            />
          </div>
          <div class="form-group mt-3">
            <label>Deskripsi Cafe</label>
            <textarea
              defaultValue={Update.deskripsiCafe}
              onChange={(e) =>
                setUpdate((data) => ({
                  ...data,
                  deskripsiCafe: e.target.value,
                }))
              }
              type="text"
              className="form-control mt-1"
              placeholder="Masukan Deskripsi"
            />
          </div>

          <div className="row">
            <div className="col-sm">
              <label>Nama Pemilik Cafe</label>
              <input
                defaultValue={Update.namaPemilikCafe}
                onChange={(e) =>
                  setUpdate((data) => ({
                    ...data,
                    namaPemilikCafe: e.target.value,
                  }))
                }
                type="text"
                className="form-control mt-1"
                placeholder="Masukan Nama Pemilik"
              />
            </div>
            <div className="col-sm">
              <label>No Telepon</label>
              <input
                value={Update.noHpCafe}
                onChange={(e) =>
                  setUpdate((data) => ({
                    ...data,
                    noHpCafe: e.target.value,
                  }))
                }
                type="tel"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                className="form-control mt-1"
                placeholder="Masukan Nomor Telepon"
              />
            </div>
          </div>

          <div class="form-group mt-3">
            <label>Foto Cafe</label>
            <input
              onChange={(e) =>
                setUpdate((data) => ({
                  ...data,
                  image: e.target.files[0],
                }))
              }
              type="file"
              className="form-control mt-1"
            />
          </div>

          <div class="d-grid gap-2 mt-3">
            <button
              type="submit"
              class="btn btn-secondary"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Update;
