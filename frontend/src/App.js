import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from "./Loginpage/Loginpage";
import Signuppage from "./Signuppage/Signuppage";
import Sidebarpage from "./Homepage/Sidebarpage";
import Pembukuancomp from './Homepage/Pembukuancomp';
import "./Loginpage/Loginpage.css";
import "./Homepage/Sidebarpage.css";
import './App.css';

function App() {
  return (
  <>
    <Router>
      <Routes>
          <Route exact path="/" element={<Loginpage />} />
          <Route exact path="/Signuppage" element={<Signuppage />} />
          <Route exact path="/Sidebarpage" element={<Sidebarpage />} />
          <Route exact path="/pembukuan" element={<Pembukuancomp />} />
      </Routes>
  </Router>
  </>
  );
}

export default App;
