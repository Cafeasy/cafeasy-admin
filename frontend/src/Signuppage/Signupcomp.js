import React, { useState } from "react";
import logodannama from "../Photos/logodannama.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signupcomp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [namaCafe, setNamaCafe] = useState("");
  const [alamatCafe, setAlamat] = useState("");
  const [deskripsiCafe, setDeskripsi] = useState("");
  const [namaPemilikCafe, setNamaPemilik] = useState("");
  const [noHpCafe, setNoHp] = useState("");
  const [fotoCafe, setFoto] = useState("");
  const [msg, setMsg] = useState("");
  const Navigate = useNavigate();

  const Signupcomp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(process.env.REACT_APP_API_URL, {
        email: email,
        username: username,
        password: password,
        namaCafe: namaCafe,
        alamatCafe: alamatCafe,
        deskripsiCafe: deskripsiCafe,
        namaPemilikCafe: namaPemilikCafe,
        noHpCafe: noHpCafe,
        fotoCafe: fotoCafe,
      });
      Navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="Logform-container">
      <form onClick={Signupcomp} className="Logform">
        <div className="Logform-content">
          <h3 className="Logform-title">Daftar</h3>

          <div className="row">
            <div className="col-md-3">
              <a href="LoginAdmin">Login</a>
            </div>
            <div className="col-md-6">
              <a href="">Daftar</a>
            </div>
          </div>
          <br></br>

          <div className="row">
            <div className="col-sm">
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="form-control mt-1"
                placeholder="Masukan Email"
                required
              />
            </div>
            <div className="col-sm">
              <label>Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="form-control mt-1"
                placeholder="Masukan Email"
              />
            </div>
          </div>

          <br></br>

          <div className="row">
            <div className="col-sm">
              <label>Sandi</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control mt-1"
                placeholder="Masukan Sandi"
              />
              <i class="bi bi-eye-slash" id="togglePassword"></i>
            </div>
            <div className="col-sm">
              <label>Nama Cafe</label>
              <input
                value={namaCafe}
                onChange={(e) => setNamaCafe(e.target.value)}
                type="text"
                className="form-control mt-1"
                placeholder="Masukan Nama Cafe"
              />
            </div>
          </div>

          <div class="form-group mt-3">
            <label>Alamat Cafe</label>
            <textarea
              value={alamatCafe}
              onChange={(e) => setAlamat(e.target.value)}
              type="text"
              className="form-control mt-1"
              placeholder="Masukan Alamat"
            />
          </div>
          <div class="form-group mt-3">
            <label>Deskripsi Cafe</label>
            <textarea
              value={deskripsiCafe}
              onChange={(e) => setDeskripsi(e.target.value)}
              type="text"
              className="form-control mt-1"
              placeholder="Masukan Deskripsi"
            />
          </div>

          <br></br>
          <div className="row">
            <div className="col-sm">
              <label>Nama Pemilik Cafe</label>
              <input
                value={namaPemilikCafe}
                onChange={(e) => setNamaPemilik(e.target.value)}
                type="text"
                className="form-control mt-1"
                placeholder="Masukan Nama Pemilik"
              />
            </div>
            <div className="col-sm">
              <label>No Telepon</label>
              <input
                value={noHpCafe}
                onChange={(e) => setNoHp(e.target.value)}
                type="tel"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                className="form-control mt-1"
                placeholder="Masukan Nama Pendaftar"
              />
            </div>
          </div>

          <div class="form-group mt-3">
            <label>Foto Cafe</label>
            <input
              value={fotoCafe}
              onChange={(e) => setFoto(e.target.value)}
              type="file"
              className="form-control mt-1"
              placeholder="Masukan Alamat"
            />
          </div>

          <br></br>

          <div className="row">
            <div className="col-md-6">
              <a href="#">Lupa sandi?</a>
            </div>
          </div>
          <div class="d-grid gap-2 mt-3">
            <button type="submit" class="btn btn-secondary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Signupcomp;
