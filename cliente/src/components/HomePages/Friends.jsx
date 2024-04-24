import Contact from "../HomeComponents/Contact";
export default function Friends() {
  return (
    <>
      <div className="flex items-center max-md:justify-center gap-5 border-b-2 border-gray-200 pb-3 mb-14 ml-5">
        <h2 className="text-4xl font-black font-inter">Mis Amigos</h2>
      </div>

      <div className="max-w-7xl overflow-auto">
        <h2 className="text-lg md:text-3xl max-md:text-center font-inter font-bold mb-4 md:mb-8">Peticiones de Amistad</h2>
        <div className="flex flex-wrap max-lg:justify-center justify-start gap-8 md:gap-14 max-w-6xl mx-auto">
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
        </div>
      </div>

      <div className="mt-14 max-w-7xl overflow-auto">
        <h2 className="text-lg md:text-3xl max-md:text-center font-inter font-bold mb-4 md:mb-8">Mis amigos</h2>
        <form className="mb-5 max-w-6xl mx-auto flex gap-5 max-md:w-[80%] max-lg:justify-center">
            <input type="text" placeholder="Buscar amigos" className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md" />
            <button className="bg-blue-500 text-white p-2 rounded-md">Buscar</button>
        </form>
        <div className="flex flex-wrap max-lg:justify-center justify-start gap-8 md:gap-14 max-w-6xl mx-auto">
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
        </div>
      </div>
    </>
  )
}
