import { useState } from "react";
import BotonAutenticar from "../components/BotonAutenticar";
import Modal from "../components/Modal";

export default function Autentication() {

  const [modalOpen, setModalOpen] = useState({
    'open' : false,
    'auth' : "",
  })

  function handleAuthAction(estado){
    setModalOpen({open: true, auth: estado})
  }

  function modalClose(){
    setModalOpen({open:false, auth:""})
  }

  return (
    <main className="flex flex-col gap-20 lg:flex-row min-h-screen lg:gap-0 lg:justify-between w-full">
      <div className="w-full lg:max-w-3xl"> {/* Aplica max-w-2xl solo en pantallas lg y mayores */}
        <img src="/src/assets/images/DevSocialIndex.png" alt="" className="h-96 lg:h-lvh w-full object-cover"/>
      </div>
      <div className="grid place-items-center lg:ml-10 lg:mr-10 xl:mx-auto">
        <div className="flex flex-col gap-20">
            <h1 className="text-5xl font-bold font-inter w-96 text-center">Comienza a explorar</h1>
            <div className="flex flex-col max-w-sm">
              <p>¿No tienes cuenta?</p>
              <BotonAutenticar texto="Regístrate" onClick={()=>{ handleAuthAction('register')}}/>
            </div>
            <div className="flex flex-col max-w-sm">
              <p>¿Ya tienes cuenta?</p>
              <BotonAutenticar texto="Inicia sesión" onClick={()=>{ handleAuthAction('login')}}/>
            </div>
        </div>
      </div>

      {modalOpen.open && <Modal auth={modalOpen.auth} onClose={modalClose}/>}
    </main>
  );
}


