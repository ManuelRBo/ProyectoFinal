import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<h1>Error</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
