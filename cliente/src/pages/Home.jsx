import { useEffect, useState } from "react";
import {
  Bars3Icon,
  UserCircleIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/16/solid";
import { Icon } from "@iconify-icon/react";
import MenuOption from "../components/HomeComponents/MenuOption";

export default function Home() {
  const [menuExpanded, setMenuExpanded] = useState(true);

  const handleMenu = () => {
    if (window.innerWidth >= 768) {
      setMenuExpanded(!menuExpanded); // Solo permite la expansión/reducción si la ventana es suficientemente grande
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMenuExpanded(false); // Asegura que el menú está cerrado en móviles
      } else {
        setMenuExpanded(true); // Asegura que el menú esté abierto en pantallas más grandes
      }
    };

    handleResize(); // Llama al resize al cargar
    window.addEventListener('resize', handleResize); // Ajusta al cambiar tamaño
    return () => window.removeEventListener('resize', handleResize); // Limpia el listener al desmontar
  }, []);

  return (
    <div className="h-lvh flex justify-around max-w-[97%] mx-auto">
      <aside className={`h-full`}>
        <div className={`h-full flex flex-col gap-5 items-start`}>
          <div className="flex items-center gap-5 pt-7 p-2">
            <Bars3Icon
              width="30px"
              className="cursor-pointer"
              onClick={handleMenu}
            />
            {menuExpanded &&<h3>Logo</h3>}
          </div>
          <hr className={`border-t border-gray-300 ${menuExpanded ? '' : 'w-3/4'}`}/>
          <div>
            <MenuOption
              Icon={UserCircleIcon}
              text={menuExpanded ? "Manuel" : ""}
            />
          </div>
          <hr className={`border-t border-gray-300 ${menuExpanded ? '' : 'w-3/4'}`} />
          <div className="flex flex-col gap-4">
            <MenuOption Icon={HomeIcon} text={menuExpanded ? "Inicio" : ""} />
            <MenuOption
              Icon={UsersIcon}
              text={menuExpanded ? "Usuarios" : ""}
            />
          </div>
          <hr className={`border-t border-gray-300 ${menuExpanded ? '' : 'w-3/4'}`} />
          <div className={`flex flex-col ${menuExpanded ? "mr-4" : ' items-center'}`}>
            <h3 className={`text-lg font-inter font-bold mb-3 ${menuExpanded ? '' : 'text-sm'}`}>Canales</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-1 hover:bg-gray-300 p-2 rounded-lg cursor-pointer">
                <Icon icon="devicon:php" width="40px" />
                {menuExpanded && <MenuOption Icon={Icon} text="PHP" />}
              </div>
              <div className="flex items-center gap-1 hover:bg-gray-300 p-2 rounded-lg cursor-pointer">
                <Icon icon="vscode-icons:file-type-js-official" width="40px" />
                {menuExpanded && <MenuOption Icon={Icon} text="JS" />}
              </div>
              <div className="flex items-center gap-1 hover:bg-gray-300 p-2 rounded-lg cursor-pointer">
                <Icon icon="devicon:java" width="40px" />
                {menuExpanded && <MenuOption Icon={Icon} text="Java" />}
              </div>
              <div className="flex items-center gap-1 hover:bg-gray-300 p-2 rounded-lg cursor-pointer">
                <Icon icon="logos:nodejs-icon-alt" width="40px" />
                {menuExpanded && <MenuOption Icon={Icon} text="Node JS" />}
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="h-full w-3/4"></main>

      <aside className={`h-full mx-auto `}>
        <div className={`h-full flex flex-col gap-5 items-start`}>
          
        </div>
      </aside>
    </div>
  );
}
