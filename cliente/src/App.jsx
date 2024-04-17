import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Autentication from "./pages/Autentication";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Autentication />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<h1>Error</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
