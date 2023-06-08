import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Navigate, Route } from "react-router-dom";
import {useAuth} from 'react';
import Loginpage from "./Loginpage/Loginpage";
import Signuppage from "./Signuppage/Signuppage";
import Sidebarpage from "./Homepage/Sidebarpage";
import Pembukuancomp from './Homepage/Pembukuancomp';
import Kelolacomp from './Homepage/Kelolacomp';
import Persediaancomp from './Homepage/Persediaancomp';
import "./Loginpage/Loginpage.css";
import "./Homepage/Sidebarpage.css";
import './App.css';

function App() {
  return (
    <Router>
      <Sidebarpage />
      <Routes>
          <Route exact path="Pembukuan" element={<Pembukuancomp />} />
          <Route exact path="Kelola" element={<Kelolacomp />} />
          <Route exact path="Persediaan" element={<Persediaancomp />} />
      </Routes>
  </Router>
  )
}

export default App;
