import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landingpage />} />
        <Route exact path="/Loginpage" element={<Loginpage />} />
      </Routes>
    </Router>
  );
}

export default App;
