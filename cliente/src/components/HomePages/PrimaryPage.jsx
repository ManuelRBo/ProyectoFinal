import Contact from "../HomeComponents/Contact";

export default function PrimaryPage() {
    return(
        <div>
            <h1 className="text-center font-inter text-5xl font-bold text-[#004280]">Bienvenido a DevSocial</h1>
            <p className="text-center font-inter text-xl text-[#004280]">Tu red social de desarrolladores</p>

            <form className="mb-20">
                <div className="flex justify-center items-center gap-5 mt-10">
                    <input type="text" placeholder="Buscar..." className="w-3/5 p-3 rounded-lg border border-[#004280] focus:outline-none focus:border-[#004280]"/>
                    <button className="bg-[#004280] text-white font-inter font-bold text-lg px-5 py-2 rounded-lg">Buscar</button>
                </div>
            </form>

            <div>
                <h2 className="text-3xl font-inter font-semibold mb-8">Últimos Amigos Agregados</h2>
                <div className="flex justify-between max-w-5xl mx-auto">
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                </div>
            </div>

            <div className="mt-14">
                <h2 className="text-3xl font-inter font-semibold mb-8">Últimos Canales Seguidos</h2>
                <div className="flex justify-between max-w-5xl mx-auto">
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