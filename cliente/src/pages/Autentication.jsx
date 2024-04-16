import BotonAutenticar from "../components/BotonAutenticar";

export default function Autentication() {
  return (
    <main className="flex flex-col lg:flex-row min-h-screen justify-between w-full">
      <div className="w-full lg:max-w-2xl"> {/* Aplica max-w-2xl solo en pantallas lg y mayores */}
        <img src="/src/assets/images/DevSocialIndex.png" alt="" className="h-96 lg:h-lvh w-full object-cover"/>
      </div>
      <div className="grid place-items-center mx-auto">
        <div className="flex flex-col gap-20">
            <h1 className="text-5xl font-bold font-inter w-96 text-center">Comienza a explorar</h1>
            <div className="flex flex-col max-w-sm">
              <p>¿No tienes cuenta?</p>
              <BotonAutenticar texto="Regístrate"/>
            </div>
            <div className="flex flex-col max-w-sm">
              <p>¿Ya tienes cuenta?</p>
              <BotonAutenticar texto="Inicia sesión"/>
            </div>
        </div>
      </div>
    </main>
  );
}


