import React from "react"

function Logincomp() {
    return (
    <div className="Logform-container">
        <form className="Logform">
          <div className="Logform-content">
            <h3 className="Logform-title">Masuk</h3>
              
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
              <div className="inputbutton">
                <label>Sandi</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Masukan Sandi"
                />
                </div>
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
                Masuk</button>
            </div>
          </div>

        </form>
    </div>
    )
}
export default Logincomp;