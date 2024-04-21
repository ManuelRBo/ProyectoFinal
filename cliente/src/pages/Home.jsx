import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ChatBubbleLeftRightIcon,
  HomeIcon,
  UsersIcon,
  UserCircleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { Icon } from "@iconify-icon/react";
import MenuOption from "../components/HomeComponents/MenuOption";
import Messages from "../components/HomeComponents/Messages";
import PrimaryPage from "../components/HomePages/PrimaryPage";
import Chats from "../components/HomePages/Chats";
import Friends from "../components/HomePages/Friends";

export default function Home() {
  const [menuExpanded, setMenuExpanded] = useState(true);
  const [configOpen, setConfigOpen] = useState(false);

  const close = () => {
    setConfigOpen(false);
  };

  const handleMenu = () => {
    if (window.innerWidth >= 900) {
      setMenuExpanded(!menuExpanded);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setMenuExpanded(false);
      } else {
        setMenuExpanded(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-lvh flex justify-evenly max-w-[97%] mx-auto">
      <aside className={`h-full w-1/6 flex flex-col items-start`}>
        <div
          className={`h-full flex flex-col gap-5 items-start ${
            menuExpanded ? "max-w-44 w-4/5" : "w-12"
          }`}
        >
          <div className="flex items-center gap-5 pt-7 p-2">
            <Bars3Icon
              width="30px"
              className="cursor-pointer"
              onClick={handleMenu}
            />
            {menuExpanded && <h3>Logo</h3>}
          </div>
          <hr className={`border-t border-gray-300 w-full`} />
          <div
            className={`w-full ${
              configOpen ? "bg-gray-300 scale-110 rounded-lg" : ""
            } `}
          >
            <MenuOption
              Icon={UserCircleIcon}
              text={menuExpanded ? "Manuel" : ""}
              onClick={() => setConfigOpen(true)}
            />
          </div>
          <hr className={`border-t border-gray-300 w-full`} />
          <div className="flex flex-col gap-4 w-full">
            <MenuOption
              Icon={HomeIcon}
              text={menuExpanded ? "Inicio" : ""}
              to={"/home"}
            />
            <MenuOption
              Icon={UsersIcon}
              text={menuExpanded ? "Amigos" : ""}
              to={"/home/friends"}
            />
          </div>
          <hr className={`border-t border-gray-300 w-full`} />
          <div className={`flex flex-col w-full`}>
            {menuExpanded && (
              <h3
                className={`text-lg font-inter font-bold mb-3 ${
                  menuExpanded ? "" : "text-sm"
                }`}
              >
                Canales
              </h3>
            )}
            <div className="flex flex-col gap-3 w-full">
              <div
                className={`flex items-center gap-1 hover:bg-gray-300 rounded-lg cursor-pointer w-full`}
              >
                <MenuOption
                  Icon={() => <Icon icon="devicon:php" width={"30px"} />}
                  text={menuExpanded && "PHP"}
                />
              </div>
              <div className="flex items-center gap-1">
                <MenuOption
                  Icon={() => (
                    <Icon
                      icon="vscode-icons:file-type-js-official"
                      width={"30px"}
                    />
                  )}
                  text={menuExpanded && "JS"}
                  to={"/home/chat"}
                />
              </div>
              <div className="flex items-center gap-1 ">
                <MenuOption
                  Icon={() => <Icon icon="devicon:java" width={"30px"} />}
                  text={menuExpanded && "Java"}
                />
              </div>
              <div className="flex items-center gap-1">
                <MenuOption
                  Icon={() => (
                    <Icon icon="logos:nodejs-icon-alt" width={"30px"} />
                  )}
                  text={menuExpanded && "Node JS"}
                />
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="w-4/5 mt-10 h-[calc(100vh-40px)]">
        <Routes>
          <Route path="/" element={<PrimaryPage />} />
          <Route path="/chat" element={<Chats />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
      </main>

      <aside className={`h-full w-1/6 flex flex-col items-end`}>
        <div
          className={`h-full flex flex-col gap-5 items-start ${
            menuExpanded ? "max-w-56 w-4/5" : "w-12"
          }`}
        >
          <div className="flex items-center gap-5 pt-7 p-2">
            <ChatBubbleLeftRightIcon width="30px" />
            {menuExpanded && (
              <h3 className="font-inter font-bold text-xl">Mensajes</h3>
            )}
          </div>
          <div className="">
            <Messages
              name={menuExpanded ? "Manuel" : ""}
              message={menuExpanded ? "Hola, ¿Cómo estás?" : ""}
            />
          </div>
          <div className="">
            <Messages
              name={menuExpanded ? "Manuel" : ""}
              message={menuExpanded ? "Hola, ¿Cómo estás?" : ""}
            />
          </div>
          <div className="">
            <Messages
              name={menuExpanded ? "Manuel" : ""}
              message={menuExpanded ? "Hola, ¿Cómo estás?" : ""}
            />
          </div>
        </div>
      </aside>


      <Transition
        show={configOpen}
        enter="transition-opacity duration-200 ease-in-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150 ease-in-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        as={Fragment}
      >
        <Dialog
          onClose={close}
          className="fixed inset-0 flex items-center justify-center p-4 z-10 w-full mx-auto "
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 transition-opacity duration-200 ease-in-out" />
          <Transition.Child
            enter="transition ease-in-out duration-200 transform"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="transition ease-in-out duration-150 transform"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
            style={{ maxWidth: "600px", width: "90%"}}
          >
            <Dialog.Panel className="relative z-20 bg-white rounded-md shadow-lg mx-auto px-5 py-12">
              <form className="flex flex-col items-center gap-10 w-full">
                <h2 className="text-center font-bold font-inter text-4xl">
                  Configuración
                </h2>
                <div className="flex flex-col gap-3 items-center">
                  <img
                    className="rounded-full"
                    src="https://randomuser.me/api/portraits/men/94.jpg"
                    alt=""
                  />
                  <button
                    type="button"
                    className="font-inter text-xs font-bold bg-[#004280] text-white py-1 px-3 rounded-xl hover:bg-white hover:text-[#004280] transition-all duration-300 ease-in-out"
                  >
                    Cambiar foto de perfil
                  </button>
                </div>
                <div className="flex flex-col gap-3 items-center w-full">
                  <label
                    className="font-inter text-base font-bold"
                    htmlFor="name"
                  >
                    Nombre de Usuario
                  </label>
                  <input
                    className="border-2 border-[#004280] py-1 px-3 rounded-xl w-[80%]"
                    type="text"
                    id="name"
                  />
                </div>

                <div className="flex flex-col gap-3 items-center w-full">
                  <label
                    className="font-inter text-base font-bold"
                    htmlFor="email"
                  >
                    Correo Electrónico
                  </label>
                  <input
                    className="border-2 border-[#004280] py-1 px-3 rounded-xl w-[80%]"
                    type="email"
                    id="email"
                  />
                </div>

                <div className="flex flex-col gap-3 items-center w-full">
                  <label
                    className="font-inter text-base font-bold"
                    htmlFor="password"
                  >
                    Contraseña
                  </label>
                  <input
                    className="border-2 border-[#004280] py-1 px-3 rounded-xl w-[80%]"
                    type="password"
                    id="password"
                  />
                </div>

                <button
                  className="w-[60%] font-inter text-base font-bold bg-[#004280] text-white py-3 px-3 rounded-xl hover:bg-white hover:text-[#004280] transition-all duration-300 ease-in-out"
                  type="submit"
                >
                  Guardar Cambios
                </button>

                <button
                  className="w-[60%] font-inter text-base font-bold bg-red-700 text-white py-3 px-3 rounded-xl hover:bg-white hover:text-red-500 transition-all duration-300 ease-in-out"
                  type="button"
                >
                  Eliminar Cuenta
                </button>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
}
