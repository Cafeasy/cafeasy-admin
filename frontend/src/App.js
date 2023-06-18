import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Loginpage from "./Loginpage/Loginpage";
import Signuppage from "./Signuppage/Signuppage";
import Sidebarpage from "./Homepage/Sidebarpage";
import ProfileAdmincomp from "./Homepage/ProfileAdmincomp";
import DataMenucomp from "./Homepage/DataMenucomp";
import DataTransaksicomp from "./Homepage/DataTransaksicomp";
import DataPelanggancomp from "./Homepage/DataPelanggancomp";
import DataKategoricomp from "./Homepage/DataKategoricomp";
import "./Loginpage/Loginpage.css";
import "./Homepage/Sidebarpage.css";
import "./App.css";

const App = () => {
  return (
    <div className="routes">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Loginpage />}></Route>
          <Route exact path="/Register" element={<Signuppage />}></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Sidebarpage />
        <Routes>
          <Route exact path="/ProfileAdmin" element={<ProfileAdmincomp />}></Route>
          <Route exact path="/DataMenu" element={<DataMenucomp />}></Route>
          <Route exact path="/DataTransaksi" element={<DataTransaksicomp />}></Route>
          <Route exact path="/DataPelanggan" element={<DataPelanggancomp />}></Route>
          <Route exact path="/DataKategori" element={<DataKategoricomp />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
