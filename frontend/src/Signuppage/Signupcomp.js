import React, { useState } from "react";
import Swal from "sweetalert2";
import Iconline1 from "../Photos/Iconline1.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const USER_DEFAULT = {
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

const Signupcomp = () => {
  const [user, setUser] = useState(USER_DEFAULT);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (user.username.trim() === "") {
      // Input is empty
      Swal.fire({
        icon: "error",
        title: "Register Gagal!",
        text: "Nama Pengguna atau Sandi tidak cocok!!!",
      });

      return;
    }
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("emailCafe", user.emailCafe);
    formData.append("password", user.password);
    formData.append("namaCafe", user.namaCafe);
    formData.append("alamatCafe", user.alamatCafe);
    formData.append("deskripsiCafe", user.deskripsiCafe);
    formData.append("namaPemilikCafe", user.namaPemilikCafe);
    formData.append("noHpCafe", user.noHpCafe);
    formData.append("image", user.image);

    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_API_URL}/registerAdmin`, formData)
      .then((res) => {
        Swal.fire("Daftar Berhasil!", "Kamu Berhasil Daftar!", "success");
        Navigate("/LoginAdmin");
        console.log(res.formData);
        setUser(USER_DEFAULT);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Register Gagal!",
          text: "Nama Pengguna atau Sandi tidak cocok!!!",
        });
      });
  };

  return (
    <div className="Logform-container">
      <form className="Logform">
        <div className="Logform-content">
          <h3 className="Logform-title">Daftar</h3>

          <div className="row">
            <div className="col-md-3">
              <a href="LoginAdmin">Login</a>
            </div>
            <div className="col-md-6 color-text">
              <a href="">
                Daftar <img src={Iconline1} alt="Icon" />
              </a>
            </div>
          </div>
          <br></br>

          <div className="row ">
            <div className="col-sm">
              <label>Email</label>
              <input
                defaultValue={user.emailCafe}
                onChange={(e) =>
                  setUser((data) => ({ ...data, emailCafe: e.target.value }))
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
                defaultValue={user.username}
                onChange={(e) =>
                  setUser((data) => ({ ...data, username: e.target.value }))
                }
                type="text"
                className="form-control mt-1"
                placeholder="Masukan Nama Pengguna"
                required
              />
            </div>
          </div>

          <br></br>

          <div className="row">
            <div className="col-sm">
              <label>Sandi</label>
              <input
                defaultValue={user.password}
                onChange={(e) =>
                  setUser((data) => ({ ...data, password: e.target.value }))
                }
                type="password"
                className="form-control mt-1"
                placeholder="Masukan Sandi"
                required
              />
            </div>

            <div className="col-sm">
              <label>Nama Cafe</label>
              <input
                defaultValue={user.namaCafe}
                onChange={(e) =>
                  setUser((data) => ({ ...data, namaCafe: e.target.value }))
                }
                type="text"
                className="form-control mt-1"
                placeholder="Masukan Nama Cafe"
                required
              />
            </div>
          </div>

          <div class="form-group mt-3">
            <label>Alamat Cafe</label>
            <textarea
              defaultValue={user.alamatCafe}
              onChange={(e) =>
                setUser((data) => ({ ...data, alamatCafe: e.target.value }))
              }
              type="text"
              className="form-control mt-1"
              placeholder="Masukan Alamat"
              required
            />
          </div>
          <div class="form-group mt-3">
            <label>Deskripsi Cafe</label>
            <textarea
              defaultValue={user.deskripsiCafe}
              onChange={(e) =>
                setUser((data) => ({ ...data, deskripsiCafe: e.target.value }))
              }
              type="text"
              className="form-control mt-1"
              placeholder="Masukan Deskripsi"
              required
            />
          </div>

          <div className="row">
            <div className="col-sm">
              <label>Nama Pemilik Cafe</label>
              <input
                defaultValue={user.namaPemilikCafe}
                onChange={(e) =>
                  setUser((data) => ({
                    ...data,
                    namaPemilikCafe: e.target.value,
                  }))
                }
                type="text"
                className="form-control mt-1"
                placeholder="Masukan Nama Pemilik"
                required
              />
            </div>
            <div className="col-sm">
              <label>No Telepon</label>
              <input
                value={user.noHpCafe}
                onChange={(e) =>
                  setUser((data) => ({
                    ...data,
                    noHpCafe: e.target.value,
                  }))
                }
                type="tel"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                className="form-control mt-1"
                placeholder="Masukan Nomor Telepon"
                required
              />
            </div>
          </div>

          <div class="form-group mt-3">
            <label>Foto Cafe</label>
            <input
              // value={fotoCafe}
              onChange={(e) =>
                setUser((data) => ({
                  ...data,
                  image: e.target.files[0],
                }))
              }
              type="file"
              className="form-control mt-1"
              required
            />
          </div>
          <div class="d-grid gap-2 mt-3">
            <button
              type="submit"
              class="btn btn-secondary"
              onClick={handleSubmit}
            >
              Daftar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Signupcomp;
