import { useEffect, useState, useRef } from "react";
import { PaperAirplaneIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon as SendHover } from "@heroicons/react/24/solid";
import { Icon } from "@iconify-icon/react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import MessageBox from "../MessageBox";
import axios from "axios";
import useSocketStore from "../../stores/useSocket.js";
import convertirHora from "../../utils/convertirHora.js";
import { useUserDataStore } from "../../stores/userUserDataStore.js";
import UserDataModal from "../HomeComponents/UserDataModal.jsx";

export default function Chats() {
  const { id } = useParams();
  const [sendHover, setSendHover] = useState(false);
  const [chatData, setChatData] = useState([]);
  const [messages, setMessages] = useState([]);
  const { register, handleSubmit, watch, reset } = useForm();
  const { socket } = useSocketStore();
  const { setUserData, userData } = useUserDataStore();
  const endMessage = useRef(null);
  const [userDataModalOpen, setUserDataModalOpen] = useState({ open: false, id: "" });

  const scrollToBottom = () => {
    endMessage.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    axios
      .get("/api/chat/chatData/" + id)
      .then((res) => {
        setChatData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get("/api/chat/messages/" + id).then((res) => {
      setMessages(res.data);
    });
  }, [id]);

  const sendMessage = (data) => {
    reset();
    socket.emit(
      "send-message",
      { chat_id: id, message: data.messageToSend },
      (res) => {
        if (res.success) {
          setUserData();
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender_id: res.sender_id,
              message: data.messageToSend,
              time: Date.now(),
            },
          ]);
        }
      }
    );
  };

  useEffect(() => {
    socket.on("new-message", (data) => {
      if (data.chat_id !== id) return;
      setUserData();
      setMessages((prevMessage) => [
        ...prevMessage,
        {
          sender_id: data.sender_id,
          sender_user: data.sender_user,
          message: data.message,
          time: data.time,
        },
      ]);
    });

    socket.on("connected", () => {
      axios
        .get("/api/chat/chatData/" + id)
        .then((res) => {
          setChatData(res.data);
        });
    });

    socket.on("friend-logout", () => {
      axios
        .get("/api/chat/chatData/" + id)
        .then((res) => {
          setChatData(res.data);
        });
    });
    return () => socket.off("new-message");
  }, [socket, id, setUserData]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleUserDataModal = (sender_id) => {
    setUserDataModalOpen({ open: true, id: sender_id });
  };

  return (
    <div className="flex flex-col gap-5 justify-between pb-4 h-full max-md:max-h-svh">
      <div className="flex items-center max-md:justify-center gap-5 border-b-2 border-gray-200 pb-3 ml-5">
        <div
          className="relative cursor-pointer"
          onClick={() => chatData.type === "private" && handleUserDataModal(chatData.user_id)}
        >
          {chatData.img && chatData.type === "private" ? (
            <img
              src={`/api/public/images/userData/${chatData.img}?t=${Date.now()}`}
              alt="Chat"
              className="w-14 rounded-full h-14 object-cover"
            />
          ) : chatData.img && chatData.type === "group" ? (
            <Icon icon={chatData.img} width={"55px"} />
          ) : !chatData.img && chatData.type === "private" && (
            <UserCircleIcon width="55px" />
          )}
          {chatData.type === "private" && (
            <div
              className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white bg-${
                chatData.connected ? "green" : "red"
              }-500`}
            ></div>
          )}
        </div>
        <h2 className="text-4xl font-bold font-inter">
          {chatData.chat_name || chatData.username}
        </h2>
      </div>

      <div
        className="flex flex-col gap-10 overflow-auto"
        style={{ maxHeight: "calc(100vh - 80px)" }}
      >
        <div className="flex flex-col gap-10 overflow-auto">
          <div className="w-full space-y-4">
            {messages.length === 0 ? (
              <div className="flex justify-center items-center h-96">
                <h3 className="text-2xl font-inter">No hay mensajes</h3>
              </div>
            ) : (
              messages.map((message, index) =>
                message.sender_id !== userData.user._id ? (
                  <div className="flex justify-start" key={index}>
                    <div className="max-w-[70%] min-w-20 space-y-2">
                      <MessageBox
                        type="received"
                        message={message.message}
                        time={convertirHora(message.time)}
                        sender={message.sender_user}
                        sender_id={message.sender_id}
                        userDataModalOpen={userDataModalOpen}
                        setUserDataModalOpen={setUserDataModalOpen}
                        handleUserDataModal={handleUserDataModal}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end" key={index}>
                    <div className="max-w-[70%] min-w-20 space-y-2">
                      <MessageBox
                        type="sent"
                        message={message.message}
                        time={convertirHora(message.time)}
                        sender={"Tú"}
                      />
                    </div>
                  </div>
                )
              )
            )}
            <div ref={endMessage} /> {/* Ref para scroll automático */}
          </div>
        </div>
        <form
          className="flex justify-between w-full gap-5 items-center"
          onSubmit={handleSubmit(sendMessage)}
        >
          <textarea
            placeholder="Escribe un mensaje"
            className="w-full rounded-2xl border-2 border-gray-300 resize-none overflow-hidden text-md font-inter"
            style={{
              minHeight: "20px",
              maxHeight: "150px",
              overflowY: "auto",
              padding: "10px",
              lineHeight: "20px",
              outline: "none",
            }} // Altura mínima para una sola línea de texto
            onInput={(e) => {
              const textarea = e.target;
              textarea.style.height = "auto"; // Resetea la altura para recalculación
              const newHeight = Math.min(textarea.scrollHeight, 150); // Calcula la nueva altura pero no más de 150px
              textarea.style.height = `${newHeight}px`; // Establece la nueva altura
            }}
            {...register("messageToSend")}
          />
          <button
            className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-full w-11 h-11 hover:bg-blue-600 transition-all duration-100 ease-in-out disabled:bg-gray-300"
            onMouseEnter={() => setSendHover(true)}
            onMouseLeave={() => setSendHover(false)}
            disabled={watch("messageToSend")?.trim() ? false : true}
          >
            {sendHover ? (
              <SendHover width="24" />
            ) : (
              <PaperAirplaneIcon width="24" />
            )}
          </button>
        </form>
      </div>
      {userDataModalOpen.open && <UserDataModal userDataModalOpen={userDataModalOpen} id={userDataModalOpen.id} setUserDataModalOpen={setUserDataModalOpen} />}
    </div>
  );
}
