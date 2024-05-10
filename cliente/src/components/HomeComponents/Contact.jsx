import { useState } from "react";
import axios from "axios";
import useSocketStore from "../../stores/useSocket";

export default function Contact({ img, username, friend, id }) {

    const [hover, setHover] = useState(false);
    const { socket } = useSocketStore();

    const handleHover = () => {
        setHover(true);
    }

    const handleLeave = () => {
        setHover(false);
    }

    const handleAddFriend = () => {
        socket.emit('addFriend', { id });
    }



    return (
        <div className="flex items-center gap-1"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
        >
            <div className="relative">
                <img src={img ? img : "https://randomuser.me/api/portraits/men/94.jpg"} alt="" className="rounded-full w-10 md:w-16" />
                <div className="bg-green-500 rounded-full w-3 h-3 md:w-4 md:h-4 absolute right-0 bottom-[0.5px]"></div>
            </div>
            {!friend && hover ? <p className="text-xs md:text-sm text-center font-inter bg-[#0085FF] font-semibold w-[110px] text-white rounded-lg p-1 md:p-2 cursor-pointer"
                onClick={handleAddFriend}
                    >Añadir Amigo</p> : <h3 className="text-base md:text-2xl font-medium font-inter w-[110px]">{username ? username : "Manuel"}</h3>}
        </div>
    );
}