import Contact from "../HomeComponents/Contact";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../../stores/useAuthStore.js";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import useSocketStore  from "../../stores/useSocket.js";

export default function PrimaryPage() {

  const [ query, setQuery ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ users, setUsers ] = useState([]);
  const [ chats, setChats ] = useState([]);
  const {isAuth, logout} = useAuthStore();
  const [ friendsData, setFriendsData ] = useState([]);
  const [ channelsData, setChannelsData ] = useState([]);
  const { socket } = useSocketStore();

  const handleInputChange= (e) => {
    const query = e.target.value;
    setQuery(query);
    setLoading(true);
    if(query === "") return setUsers([]) && setChats([]);
    setTimeout(() => {
    axios.get('/api/searchUsers', { params: { query } })
        .then(res => {
          setUsers(res.data.users);
          setChats(res.data.chats);
          setLoading(false);
        })
        .catch(err => {
            logout();
        });
      }, 300);
  }

  useEffect(() => {
    axios.get("/api/userData/userFriendsData").then((res) => {
      setFriendsData(res.data);
    });
  }, [setFriendsData]);

  useEffect(() => {
    axios.get("/api/chat/channelsData").then((res) => {
      setChannelsData(res.data);
    });
  }, [setChannelsData]);

  useEffect(() => {
    socket.on("friendRequestAccepted", () => {
      axios.get("/api/userData/userFriendsData").then((res) => {
        setFriendsData(res.data);
      });
    });
      axios.get('/api/searchUsers', { params: { query } })
      .then(res => {
        setUsers(res.data.users);
      });
      
      socket.on("connected", () => {
        axios.get("/api/userData/userFriendsData").then((res) => {
          setFriendsData(res.data);
        });

        socket.on("friend-logout", () => {
          axios.get("/api/userData/userFriendsData").then((res) => {
            setFriendsData(res.data);
          });
        });
      });

      socket.on("friend-delete", () => {
        axios.get("/api/userData/userFriendsData").then((res) => {
          setFriendsData(res.data);
        });
      });
    // return () => socket.off("friendRequestAccepted");
  }, [setFriendsData, socket ,query]);

  if(!isAuth) return <Navigate to="/" />;

  return (
    <div>
      <h1 className="text-center font-inter text-2xl md:text-5xl font-bold text-[#004280]">
        Bienvenido a DevSocial
      </h1>
      <p className="text-center font-inter text-base md:text-xl text-[#004280]">
        Tu red social de desarrolladores
      </p>

      <form className="mb-10 md:mb-16">
        <div className="flex justify-center items-center gap-5 mt-5 md:mt-10 relative">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-2/3 md:w-3/5 p-1 md:p-3 rounded-lg border border-[#004280] focus:outline-none focus:border-[#004280]"
            value={query}
            onChange={handleInputChange}
          />
          
          <div className={`bg-gray-100 w-2/3 md:w-3/5 rounded-lg absolute z-10 top-10 md:top-14 p-5 ${query !== "" ? "block" : "hidden"}`}>
            {loading ? <p>Cargando...</p> :
            <>
            <div className="mb-5">
              <h3 className="text-2xl font-bold font-inter mb-2">Usuarios</h3>
              <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-y-5">
              {users.length > 0 ? users.map(user => (
                <Contact key={user.username} username={user.username} iconName={user.img ? undefined : UserCircleIcon} img={user.img ? user.img : undefined} friend={user.friend} connected={user.connected} id={user.id} setQuery={setQuery}/>
              )) : <p>No hay resultados</p>}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold font-inter mb-2">Chats</h3>
              {chats.length > 0 ? chats.map(chat => (
                <Contact key={chat.id} username={chat.chat_name} iconNameChannel={chat.img} userInChat={chat.userInChat} id={chat.id} />
              )) : <p>No hay resultados</p>}
            </div>
            </>
            }
          </div>
        </div>
      </form>

      <div className="max-w-7xl">
        <h2 className="text-lg md:text-3xl max-md:text-center font-inter font-black mb-4 md:mb-8">Últimos Amigos Agregados</h2>
        <div className="flex flex-wrap justify-center md:justify-start lg:justify-between gap-4 max-w-6xl mx-auto">
          {friendsData.length > 0 ? friendsData.slice(0,5).map(friend => (
            <Contact key={friend.username} username={friend.username} iconName={friend.img ? undefined : UserCircleIcon} img={friend.img ? friend.img : undefined} friend={true} connected={friend.connected} id={friend.id}/>
          )) : <p>No existen ultimos amgios agregados</p>}
        </div>
      </div>

      <div className="mt-14 max-w-7xl">
        <h2 className="text-lg md:text-3xl max-md:text-center font-inter font-black mb-4 md:mb-8">Últimos Canales Seguidos</h2>
        <div className="flex flex-wrap justify-center md:justify-start lg:justify-between gap-4 max-w-6xl mx-auto">
          {channelsData.length > 0 ? channelsData.slice(0,5).map(channel => (
            <Contact key={channel.chat_name} username={channel.chat_name} iconNameChannel={channel.img} userInChat={true} id={channel._id}/>
          )) : <p>No existen ultimos canales seguidos</p>}
        </div>
      </div>
    </div>
  );
}
