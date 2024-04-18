import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

export default function Home() {
  const [menuExpanded, setMenuExpanded] = useState(true);

  const handleMenu = () => {
    if (window.innerWidth >= 768) {
      setMenuExpanded(!menuExpanded);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
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
          <div className="w-full">
            <MenuOption
              Icon={UserCircleIcon}
              text={menuExpanded ? "Manuel" : ""}
            />
          </div>
          <hr className={`border-t border-gray-300 w-full`} />
          <div className="flex flex-col gap-4 w-full">
            <MenuOption Icon={HomeIcon} text={menuExpanded ? "Inicio" : ""} />
            <MenuOption
              Icon={UsersIcon}
              text={menuExpanded ? "Usuarios" : ""}
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
              <div className="flex items-center gap-1 hover:bg-gray-300 rounded-lg cursor-pointer">
                <MenuOption
                  Icon={() => (
                    <Icon
                      icon="vscode-icons:file-type-js-official"
                      width={"30px"}
                    />
                  )}
                  text={menuExpanded && "JS"}
                />
              </div>
              <div className="flex items-center gap-1 hover:bg-gray-300 rounded-lg cursor-pointer">
                <MenuOption
                  Icon={() => <Icon icon="devicon:java" width={"30px"} />}
                  text={menuExpanded && "Java"}
                />
              </div>
              <div className="flex items-center gap-1 hover:bg-gray-300 rounded-lg cursor-pointer">
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

      <main className="w-4/5 mt-10">
          <Routes>
            <Route path="/" element={<PrimaryPage />} />
            <Route path="/chat" element={<h1>Chats</h1>} />
          </Routes>
      </main>

      <aside className={`h-full w-1/6 flex flex-col items-end`}>
        <div className={`h-full flex flex-col gap-5 items-start`}>
          <div className="flex items-center gap-5 pt-7 p-2">
            <ChatBubbleLeftRightIcon width="30px" />
            {menuExpanded && (
              <h3 className="font-inter font-bold text-base">Mensajes</h3>
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
    </div>
  );
}
