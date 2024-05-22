import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ToastContainer, Bounce, toast } from "react-toastify";
import {
  ChatBubbleLeftRightIcon,
  HomeIcon,
  UsersIcon,
  UserCircleIcon,
  Bars3Icon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import MenuOption from "../components/HomeComponents/MenuOption";
import Messages from "../components/HomeComponents/Messages";
import PrimaryPage from "../components/HomePages/PrimaryPage";
import Chats from "../components/HomePages/Chats";
import { useUserDataStore } from "../stores/userUserDataStore";
import capitalizar from "../utils/capitalizar";
import useSocketStore from "../stores/useSocket";
import { useAuthStore } from "../stores/useAuthStore";
import axios from "axios";
import Resizer from "react-image-file-resizer";

const Friends = lazy(() => import("../components/HomePages/Friends"));

export default function Home() {
  const navigate = useNavigate();
  const [menuExpanded, setMenuExpanded] = useState(true);
  const [configOpen, setConfigOpen] = useState(false);
  const [friendsOpen, setFriendsOpen] = useState(false);
  const { userData, setUserData, userLoading } = useUserDataStore();
  const { logout } = useAuthStore();
  const { socket } = useSocketStore();
  const [newMessage, setNewMessage] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileError, setFileError] = useState(null);

  useEffect(() => {
    setUserData();
  }, [setUserData]);

  const close = () => {
    setConfigOpen(false);
    setFile(null);
    setPreview(null);
    setFileError(null);
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

  const { connectSocket, disconnectSocket } = useSocketStore();

  useEffect(() => {
    connectSocket();
    return () => {
      disconnectSocket();
    };
  }, [connectSocket, disconnectSocket]);

  const location = useLocation();

  useEffect(() => {
    if (socket) {
      socket.on("friendRequest", (res) => {
        setFriendsOpen(res.success);
        toast.info("Tienes una nueva solicitud de amistad");
      });

      socket.on("new-message", (res) => {
        setUserData();

        if (location.pathname != "/home/chat/" + res.chat_id) {
          toast.info("Tienes un nuevo mensaje");
          setNewMessage((prev) => [...prev, { chat_id: res.chat_id }]);
        }
      });
      return () => {
        socket.off("friendRequest");
        socket.off("new-message");
      };
    }
  }, [socket, setUserData, location.pathname]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setFileError("El archivo es demasiado grande. Máximo permitido: 5MB");
      return;
    }
    setFileError(null);
    resizeFile(file);
  };

  const resizeFile = (file) => {
    Resizer.imageFileResizer(
      file,
      500,
      500,
      "JPEG",
      100,
      0,
      (uri) => {
        setFile(uri);
        setPreview(URL.createObjectURL(uri));
      },
      "blob"
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append("img", file);
    }
    const name = e.target["username"].value;
    if (name === "") {
      setFileError("El nombre de usuario no puede estar vacío");
      toast.error("El nombre de usuario no puede estar vacío");
      return;
    }
    formData.append("username", name);
    axios
      .post("/api/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setUserData();
          setConfigOpen(false);
          setFile(null);
          setPreview(null);
          setFileError(null);
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.info(err.response.data.error);
        setUserData();
        setConfigOpen(false);
        setFile(null);
        setPreview(null);
        setFileError(null);
      });
  };

  if (userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-lvh flex justify-evenly max-w-[97%] mx-auto">
      <aside className={`h-full w-1/6 flex flex-col items-start`}>
        <div
          className={`h-full flex flex-col gap-5 items-start ${
            menuExpanded ? "max-w-44 w-4/5" : "w-12"
          }`}
        >
          {window.innerWidth > 900 ? (
            <div className="flex items-center gap-3 pt-7 p-2">
              <Bars3Icon
                width="30px"
                className="cursor-pointer"
                onClick={handleMenu}
              />
              <div className="absolute left-14 w-28 lg:left-20">
                <img src="/Logo.svg" alt="" width={"100px"} />
              </div>
            </div>
          ) : (
            <div className="w-16 pt-7 ">
              <img src="/Logo.svg" alt="" width={"60px"} />
            </div>
          )}
          <hr className={`border-t border-gray-300 w-full`} />
          <div
            className={`w-full ${
              configOpen ? "bg-gray-300 scale-110 rounded-lg" : ""
            } `}
          >
            <MenuOption
              Icon={userData.user.img ? undefined : UserCircleIcon}
              imgSrc={userData.user.img ? userData.user.img : undefined}
              text={menuExpanded ? capitalizar(userData.user.username) : ""}
              onClick={() => setConfigOpen(true)}
            />
          </div>
          <div className="text-red-600">
            <MenuOption
              Icon={ArrowLeftStartOnRectangleIcon}
              text={menuExpanded ? "Cerrar Sesión" : ""}
              onClick={() => logout()}
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
              {(() => {
                const groupChats = userData.combinedChats.filter(
                  (chat) => chat.type === "group"
                );
                return groupChats.length > 0 ? (
                  groupChats.map((chat) => (
                    <MenuOption
                      to={"/home/chat/" + chat.chat._id}
                      iconLogo={chat.chat.img}
                      text={menuExpanded ? chat.chat.chat_name : ""}
                      key={chat.chat._id}
                    />
                  ))
                ) : menuExpanded ? (
                  <p>No hay canales</p>
                ) : (
                  ""
                );
              })()}
              {/* <div
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
              </div> */}
            </div>
          </div>
        </div>
      </aside>

      <main className="w-4/5 mt-6 h-[calc(100vh-40px)]">
        <Routes>
          <Route path="/" element={<PrimaryPage />} />
          <Route path="/chat/:id" element={<Chats />} />
          <Route
            path="/friends"
            element={<Friends friendsOpen={friendsOpen} />}
          />
        </Routes>
      </main>

      <aside className={`h-full w-1/6 flex flex-col items-end`}>
        <div
          className={`h-full flex flex-col gap-3 items-start ${
            menuExpanded ? "max-w-56 w-4/5" : "w-12"
          }`}
        >
          <div className="flex items-center gap-3 pt-7 p-2">
            <ChatBubbleLeftRightIcon width="30px" />
            {menuExpanded && (
              <div className="flex flex-col">
                <h3 className="font-inter font-bold text-xl">Mensajes</h3>
                <p>{userData.chats_private_data <= 0 && "No hay chats"}</p>
              </div>
            )}
          </div>
          {userData.combinedChats.length > 0 &&
            userData.combinedChats.map((chat) => (
              <div
                key={chat.chat._id}
                className="py-2 w-full cursor-pointer"
                onClick={() => {
                  navigate("/home/chat/" + chat.chat._id);
                  setNewMessage(
                    newMessage.filter(
                      (message) => message.chat_id !== chat.chat._id
                    )
                  );
                }}
              >
                <Messages
                  iconLogo={chat.type === "group" ? chat.chat.img : undefined}
                  Icon={chat.type === "private" ? UserCircleIcon : undefined}
                  imgSrc={chat.type === "private" ? chat.friend.img : undefined}
                  name={
                    menuExpanded
                      ? chat.type === "private"
                        ? chat.friend.username
                        : chat.chat.chat_name
                      : ""
                  }
                  message={
                    menuExpanded
                      ? chat.last_message && chat.last_message.message
                        ? chat.last_message.message
                        : ""
                      : ""
                  }
                  newMessage={
                    newMessage.find(
                      (message) => message.chat_id === chat.chat._id
                    )
                      ? true
                      : false
                  }
                />
              </div>
            ))}

          {/* <div>
            <Messages
              name={menuExpanded ? "Manuel" : ""}
              message={menuExpanded ? "Hola, ¿Cómo estás?" : ""}
            />
          </div>
          <div>
            <Messages
              name={menuExpanded ? "Manuel" : ""}
              message={menuExpanded ? "Hola, ¿Cómo estás?" : ""}
            />
          </div>
          <div>
            <Messages
              name={menuExpanded ? "Manuel" : ""}
              message={menuExpanded ? "Hola, ¿Cómo estás?" : ""}
            />
          </div> */}
        </div>
      </aside>

      <ToastContainer
        position="top-right"
        autoClose={1000}
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
            style={{ maxWidth: "600px", width: "90%" }}
          >
            <Dialog.Panel className="relative z-20 bg-white rounded-md shadow-lg mx-auto px-5 py-12">
              <form
                className="flex flex-col items-center gap-7 w-full"
                onSubmit={handleSubmit}
              >
                <h2 className="text-center font-bold font-inter text-4xl">
                  Perfil
                </h2>
                <div className="flex flex-col gap-3 items-center">
                  {preview ? (
                    <img
                      className="rounded-full"
                      src={preview}
                      alt=""
                      width="100px"
                    />
                  ) : userData.user.img ? (
                    <img
                      className="rounded-full"
                      src={"/api/public/images/userData/" + userData.user.img + "?t=" + Date.now()}
                      alt=""
                      width="100px"
                    />
                  ) : (
                    <UserCircleIcon width="100px" />
                  )}

                  <button
                    type="button"
                    className="font-inter text-xs font-bold bg-[#004280] text-white py-1 px-3 rounded-xl hover:bg-white hover:text-[#004280] transition-all duration-300 ease-in-out"
                    onClick={() => {
                      document.getElementById("fileInput").click();
                    }}
                  >
                    Cambiar foto de perfil
                  </button>
                  {fileError && <p className="text-red-600">{fileError}</p>}
                  <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    className="hidden"
                  />
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
                    name="username"
                    defaultValue={userData.user.username}
                    onChange={(e) =>
                      e.target.value === ""
                        ? setFileError(
                            "El nombre de usuario no puede estar vacío"
                          )
                        : setFileError(null)
                    }
                  />
                </div>

                {/* <div className="flex flex-col gap-3 items-center w-full">
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
                </div> */}

                <button
                  className="w-[60%] font-inter text-base font-bold bg-[#004280] text-white py-3 px-3 rounded-xl hover:bg-white hover:text-[#004280] transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={fileError ? true : false}
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
