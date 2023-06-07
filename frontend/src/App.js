import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Navigate, Route } from "react-router-dom";
import {useAuth} from 'react';
import Loginpage from "./Loginpage/Loginpage";
import Signuppage from "./Signuppage/Signuppage";
import Sidebarpage from "./Homepage/Sidebarpage";
import Pembukuancomp from './Homepage/Pembukuancomp';
import "./Loginpage/Loginpage.css";
import "./Homepage/Sidebarpage.css";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Loginpage />} />
      </Routes>
  </Router>
  )
}

function Layout() {
  const {isAuth} = useAuth()
  
  if (!isAuth) return <Navigate to="/" />
  return (
    <main>
      <Sidebarpage />
  </main>
  )
}

export default App;
