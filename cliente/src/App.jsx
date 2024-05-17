import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useAuthStore } from "./stores/useAuthStore";
import axios from "axios";

const Home = lazy(() => import("./pages/Home"));
const Authentication = lazy(() => import("./pages/Authentication"));

function App() {

  const { isAuth, login } = useAuthStore();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.post("/api/auth/check");
        if (response.data.token) {
          login();
        }
      } catch (error) {
        console.error("Error al verificar la autenticación:", error);
      }
    };

    checkAuthStatus();
  }, [login]);

  return (
    <Router>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={ isAuth ? <Navigate to="/home" />  : <Authentication />} />
          <Route path="/home/*" element={ isAuth ? <Home /> : <Navigate to="/" /> } />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
