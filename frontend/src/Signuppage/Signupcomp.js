import React, {useState} from "react"
import logodannama from "../Photos/logodannama.png";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const Signupcomp = () => {
    const [username, setUsername] = useState('');
    const [noHpCafe, setNoHp] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const Navigate = useNavigate();

    const Signupcomp = async(e) =>{
        e.preventDefault();
        try {
          await axios.post('http://localhost:5000/users',{
            username: username,
            noHpCafe: noHpCafe,
            password: noHpCafe,
            confpassword: confpassword
          });
          Navigate("/");
        } catch (error) {
            if (error.response) {
              setMsg(error.response.data.msg);
            }
        }
    }

    return (
    <div className="Logform-container">
      <form onClick={Signupcomp} className="Logform">
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
                <label>Username</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="email"
                        className="form-control mt-1"
                        placeholder="Masukan Email"
                    />
                </div>
            <div class="form-group mt-3">
                <label>No Telepon</label>
                    <input
                        value={noHpCafe}
                        onChange={(e) => setNoHp(e.target.value)}
                        type="email"
                        className="form-control mt-1"
                        placeholder="Masukan No. Telepon"
                    />
                </div>
            <div class="form-group mt-3">
                    <label>Sandi</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        value={confpassword}
                        onChange={(e) => setConfPassword(e.target.value)}
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