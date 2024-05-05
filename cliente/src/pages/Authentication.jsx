import { useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BotonAutenticar from "../components/BotonAutenticar";
import Modal from "../components/Modal";
import { set } from "react-hook-form";

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

  return (
    <main className="flex flex-col-reverse max-sm:mt-10 gap-10 lg:flex-row min-h-screen lg:gap-0 w-full">
      <div className="w-full lg:max-w-3xl">
        <img
          src="/src/assets/images/DevSocialIndex.png"
          alt=""
          className="h-96 lg:h-lvh w-full object-cover"
        />
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
