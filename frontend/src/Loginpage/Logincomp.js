import React, {useState} from "react"
import logodannama from "../Photos/logodannama.png";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Navigate } from 'react-router-dom';

const Logincomp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [msg, setMsg] = useState('');
  const Navigate = useNavigate();

  const Logincomp = async(e) =>{
    e.preventDefault();
    try {
      await axios.post(process.env.REACT_APP_API_URL,{
        username: username,
        password: password,
      });
      Navigate("/Sidebarpage");
    } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
    }
}

    return (
    <div className="Logform-container">
        <form onClick={Logincomp} className="Logform">
          <div className="Logform-content">
            <h3 className="Logform-title">Masuk</h3>
            <div className="click-button">
              <div className='row'>
                  <div className='col-md-3'>
                      <a href="#">Login</a>
                  </div>
                  <div className='col-md-6'>
                      <a href="#">Daftar</a>
                  </div>
              </div>
              </div>

              <div class="form-group mt-3">
                <label>Username</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="username"
                  className="form-control mt-1"
                  placeholder="Masukan Email"
                />
              </div>
              <div class="form-group mt-3">
              <div className="inputbutton">
                <label>Sandi</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                color="red"
                appearance="primary"
                type="submit" 
                class="btn btn-secondary">
                Masuk</button>
            </div>
          </div>

        </form>
    </div>
    )
}
export default Logincomp;