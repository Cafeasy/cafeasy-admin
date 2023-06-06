import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from "./Loginpage/Loginpage";
import Signuppage from "./Signuppage/Signuppage";
import "./Loginpage/Loginpage.css";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Loginpage />} />
          <Route exact path="/Signuppage" element={<Signuppage />} />
      </Routes>
  </Router>
  );
}

export default App;
