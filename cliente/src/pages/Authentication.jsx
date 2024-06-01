import { useState, useEffect, useRef } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BotonAutenticar from "../components/BotonAutenticar";
import Modal from "../components/Modal";
import { Application } from '@splinetool/runtime';

export default function Authentication() {
  const [modalOpen, setModalOpen] = useState({
    open: false,
    auth: "",
  });

  function handleAuthAction(estado) {
    setModalOpen({ open: true, auth: estado });
  }

  function modalClose() {
    setModalOpen({ open: false, auth: "" });
  }

    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const app = new Application(canvas);
      app.load('https://prod.spline.design/MsI3dlZJaF-u2uq2/scene.splinecode');
  
      // Clean up the application on component unmount
      return () => {
        app.dispose();
      };
    }, []);


  return (
    <main className="flex flex-col-reverse gap-10 lg:flex-row h-svh lg:gap-0 w-full">
      <div className="w-full lg:max-w-3xl h-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="grid place-items-center lg:ml-10 lg:mr-10 xl:ml-0 xl:mr-0 mx-auto flex-grow">
        <div className="flex flex-col gap-10 lg:gap-20 mx-auto max-sm:w-10/12">
          <h1 className="text-5xl font-bold font-inter text-center w-96 max-sm:w-10/12 max-sm:mx-auto">
            Comienza a explorar
          </h1>
          <div className="flex flex-col max-w-sm">
            <p>¿No tienes cuenta?</p>
            <BotonAutenticar
              texto="Regístrate"
              onClick={() => {
                handleAuthAction("register");
              }}
            />
          </div>
          <div className="flex flex-col max-w-sm">
            <p>¿Ya tienes cuenta?</p>
            <BotonAutenticar
              texto="Inicia sesión"
              onClick={() => {
                handleAuthAction("login");
              }}
            />
          </div>
        </div>
      </div>

      {modalOpen.open && <Modal auth={modalOpen.auth} onClose={modalClose} />}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </main>
  );
}
