import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Autentication from "./pages/Autentication";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Autentication />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="*" element={<h1>Error</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
