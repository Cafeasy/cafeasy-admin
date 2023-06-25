import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';  
import 'primereact/resources/primereact.css';                       
import 'primeicons/primeicons.css';                                 
import 'primeflex/primeflex.css';  
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Loginpage from "./Loginpage/Loginpage";
import Signuppage from "./Signuppage/Signuppage";
import ProfileAdminpage from "./Homepage/ProfileAdminpage";
import DataMenupage from "./Homepage/DataMenupage";
import DataTransaksipage from "./Homepage/DataTransaksipage";
import DataPelangganpage from "./Homepage/DataPelangganpage";
import DataKategoripage from "./Homepage/DataKategoripage";
import Landingpage from "./Landing/Landingpage";
import "./Loginpage/Loginpage.css";
import "./Homepage/Sidebarpage.css";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Landingpage />}></Route>
          <Route exact path="/LoginAdmin" element={<Loginpage />}></Route>
          <Route exact path="/RegisterAdmin" element={<Signuppage />}></Route>
          <Route exact path="/ProfileAdmin/:idAdmin" element={<ProfileAdminpage />}></Route>
          <Route exact path="/DataMenu" element={<DataMenupage />}></Route>
          <Route exact path="/DataTransaksi" element={<DataTransaksipage />}></Route>
          <Route exact path="/DataPelanggan" element={<DataPelangganpage />}></Route>
          <Route exact path="/DataKategori" element={<DataKategoripage />}></Route>
      </Routes>
    </Router>
  );
};
export default App;
