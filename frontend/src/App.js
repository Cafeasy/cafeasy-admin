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
import ProfileAdminpage from "./Homepage/Profile/ProfileAdminpage";
import DataMenupage from "./Homepage/Menu/DataMenupage";
import DataTransaksipage from "./Homepage/Transaksi/DataTransaksipage";
import DataPelangganpage from "./Homepage/Pelanggan/DataPelangganpage";
import DataKategoripage from "./Homepage/Kategori/DataKategoripage";
import Landingpage from "./Landing/Landingpage";
import "./Loginpage/Loginpage.css";
import "./Homepage/Sidebarpage.css";
import "./App.css";
import Bannerpage from './Homepage/Banner/Bannerpage';

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
          <Route exact path="/DataBanner" element={<Bannerpage />}></Route>
      </Routes>
    </Router>
  );
};
export default App;
