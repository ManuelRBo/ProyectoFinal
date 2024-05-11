import { useState } from "react";
import axios from "axios";
import useSocketStore from "../../stores/useSocket";
import { toast } from "react-toastify";
import {useUserDataStore} from "../../stores/userUserDataStore";

export default function Contact({ img, username, friend, id }) {
  const [hover, setHover] = useState(false);
  const { socket } = useSocketStore();
  const { setUserRequestData, setUserFriendsData } = useUserDataStore();

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

  return (
    <div
      className="flex items-center gap-1"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <div className="relative">
        <img
          src={img ? img : "https://randomuser.me/api/portraits/men/94.jpg"}
          alt=""
          className="rounded-full w-10 md:w-16"
        />
        <div className="bg-green-500 rounded-full w-3 h-3 md:w-4 md:h-4 absolute right-0 bottom-[0.5px]"></div>
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
        <p className="text-xs md:text-sm text-center font-inter bg-[#0085FF] font-semibold w-[110px] text-white rounded-lg p-1 md:p-2 cursor-pointer">
          Chat
        </p>
      ) : (
        friend === "pendiente" && hover && 
        <div className="flex gap-3">
            <button className="text-xs md:text-sm text-center font-inter bg-green-500 font-semibold text-white rounded-lg p-1 md:p-2 cursor-pointer" onClick={handleAcceptFriend}>Aceptar</button>
            <button className="text-xs md:text-sm text-center font-inter bg-red-500 font-semibold text-white rounded-lg p-1 md:p-2 cursor-pointer" onClick={handleRejectFriend}>Rechazar</button>
        </div>
      )}
    </div>
  );
}
