import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"))
const Authentication = lazy(() => import("./pages/Authentication"))

function App() {
  return (
    <Router>
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Suspense>
  </Router>
  );
}

export default App;
