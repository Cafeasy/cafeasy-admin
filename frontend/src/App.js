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
import Pembukuancomp from "./Homepage/Pembukuancomp";
import Kelolacomp from "./Homepage/Kelolacomp";
import Persediaancomp from "./Homepage/Persediaancomp";
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
          <Route exact path="/Pembukuan" element={<Pembukuancomp />}></Route>
          <Route exact path="/Kelola" element={<Kelolacomp />}></Route>
          <Route exact path="/Persediaan" element={<Persediaancomp />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
