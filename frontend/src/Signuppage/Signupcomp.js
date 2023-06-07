import React from "react"
import logodannama from "../Photos/logodannama.png";

function Signupcomp() {
    return (
    <div className="Logform-container">

      <form className="Logform">
        <div className="Logform-content">
          <h3 className="Logform-title">Daftar</h3>
            
            <div className='row'>
                <div className='col-md-3'>
                    <a href="#">Login</a>
                </div>
                <div className='col-md-6'>
                    <a href="#">Daftar</a>
                </div>
            </div>
            
            <div class="form-group mt-3">
                <label>Email</label>
                    <input
                        type="email"
                        className="form-control mt-1"
                        placeholder="Masukan Email"
                    />
                </div>
            <div class="form-group mt-3">
                <label>No Telepon</label>
                    <input
                        type="email"
                        className="form-control mt-1"
                        placeholder="Masukan No. Telepon"
                    />
                </div>
            <div class="form-group mt-3">
                    <label>Sandi</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control mt-1"
                        placeholder="Masukan Password"
                    />
                    <i class="bi bi-eye-slash" id="togglePassword"></i>
            </div>
            <div class="form-group mt-3">
                    <label>Konfirmasi Sandi</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control mt-1"
                        placeholder="Konfirmasi Sandi"
                    />
                    <i class="bi bi-eye-slash" id="togglePassword"></i>
            </div>

          <br></br>

          <div className='row'>
            <div className='col-md-6'>
              <a href="#">Lupa sandi?</a>
                </div>
              </div>
            <div class="d-grid gap-2 mt-3">
              <button 
              type="submit" 
              className="btn btn-primary">
              Submit</button>
          </div>
        </div>

      </form>
    </div>
    )
}
export default Signupcomp;