import Contact from "../HomeComponents/Contact";

export default function PrimaryPage() {
  return (
    <div>
      <h1 className="text-center font-inter text-2xl md:text-5xl font-bold text-[#004280]">
        Bienvenido a DevSocial
      </h1>
      <p className="text-center font-inter text-base md:text-xl text-[#004280]">
        Tu red social de desarrolladores
      </p>

      <form className="mb-10 md:mb-16">
        <div className="flex justify-center items-center gap-5 mt-5 md:mt-10">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-1/2 md:w-3/5 p-1 md:p-3 rounded-lg border border-[#004280] focus:outline-none focus:border-[#004280]"
          />
          <button className="bg-[#004280] text-white font-inter font-bold text-base md:text-lg py-1 px-3 md:px-5 md:py-2 rounded-lg">
            Buscar
          </button>
        </div>
      </form>

      <div className="max-w-7xl">
        <h2 className="text-lg md:text-3xl max-md:text-center font-inter font-black mb-4 md:mb-8">Últimos Amigos Agregados</h2>
        <div className="flex flex-wrap justify-center md:justify-start lg:justify-between gap-4 max-w-6xl mx-auto">
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
        </div>
      </div>

      <div className="mt-14 max-w-7xl">
        <h2 className="text-lg md:text-3xl max-md:text-center font-inter font-black mb-4 md:mb-8">Últimos Canales Seguidos</h2>
        <div className="flex flex-wrap justify-center md:justify-start lg:justify-between gap-4 max-w-6xl mx-auto">
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
        </div>
      </div>
    </div>
  );
}
