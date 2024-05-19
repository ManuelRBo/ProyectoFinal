import { useState } from "react";
import axios from "axios";
import useSocketStore from "../../stores/useSocket";
import { toast } from "react-toastify";
import {useUserDataStore} from "../../stores/userUserDataStore";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react";


export default function Contact({ img, iconName, username, friend, id, userInChat }) {
  const [hover, setHover] = useState(false);
  const { socket } = useSocketStore();
  const { setUserRequestData, setUserFriendsData } = useUserDataStore();

  if(img === null) img = "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";


  const handleHover = () => {
    setHover(true);
  };

  const handleLeave = () => {
    setHover(false);
  };

  const handleAddFriend = () => {
    socket.emit("addFriend", { id }, (res) => {
      if (res.error) return toast.error(res.error);
      toast.success("Solicitud de amistad enviada");
    });
  };

  const handleAcceptFriend = () => {
    axios.patch("/api/userdata/acceptFriend", { id })
    .then(() => {
        toast.success("Amigo añadido");
        setUserRequestData();
        setUserFriendsData();
    })
    .catch(err => {
        console.log(err);
        toast.error("Error al añadir amigo");
    })
  };

  const handleRejectFriend = () => {
    axios.patch("/api/userdata/rejectFriend", { id })
    .then(() => {
        toast.success("Solicitud de amistad rechazada");
        setUserRequestData();
    })
    .catch(err => {
        console.log(err);
        toast.error("Error al rechazar solicitud de amistad");
    })
  };

  const navigate = useNavigate();

  const handleChat = () => {
    axios.post("/api/chat/createChat", { id })
    .then(res => {
        navigate(`/home/chat/${res.data.id}`);
    })
  };

  const handleFollowChat = () => {
    axios.post("/api/chat/followChat", { id })
    .then(res => {
        console.log(res.data);
    })
  }

  return (
    <div
      className="flex items-center gap-1"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <div className="relative">
      {iconName && <Icon icon={iconName} width="40px" />}
        {img && !iconName &&
          <img
            src={img}
            alt="icon"
            width="40px"
            className="rounded-full w-10 md:w-16"
          />}
          {!iconName && <div className="bg-green-500 rounded-full w-3 h-3 md:w-4 md:h-4 absolute right-0 bottom-[0.5px]"></div>}
      </div>
      {friend === false && hover ? (
        <p
          className="text-xs md:text-sm text-center font-inter bg-[#0085FF] font-semibold w-[110px] text-white rounded-lg p-1 md:p-2 cursor-pointer"
          onClick={handleAddFriend}
        >
          Añadir Amigo
        </p>
      ) : !hover ? (
        <h3 className="text-base md:text-2xl font-medium font-inter w-[110px]">
          {username ? username : "Manuel"}
        </h3>
      ) : friend === true && hover ? (
        <p className="text-xs md:text-sm text-center font-inter bg-[#0085FF] font-semibold w-[110px] text-white rounded-lg p-1 md:p-2 cursor-pointer" onClick={handleChat}>
          Chat
        </p>
      ) : (
        friend === "pendiente" && hover ? (
        <div className="flex gap-3">
            <button className="text-xs md:text-sm text-center font-inter bg-green-500 font-semibold text-white rounded-lg p-1 md:p-2 cursor-pointer" onClick={handleAcceptFriend}>Aceptar</button>
            <button className="text-xs md:text-sm text-center font-inter bg-red-500 font-semibold text-white rounded-lg p-1 md:p-2 cursor-pointer" onClick={handleRejectFriend}>Rechazar</button>
        </div>
        ) : (
        userInChat===false && hover ? (
          <p className="text-xs md:text-sm text-center font-inter bg-[#0085FF] font-semibold w-[110px] text-white rounded-lg p-1 md:p-2 cursor-pointer" onClick={handleFollowChat}>
          Seguir
        </p>
        ) : (
          <p className="text-xs md:text-sm text-center font-inter bg-[#0085FF] font-semibold w-[110px] text-white rounded-lg p-1 md:p-2 cursor-pointer" onClick={handleChat}>
          Chat
        </p>
      ) 
      )
      )}
    </div>
  );
}
