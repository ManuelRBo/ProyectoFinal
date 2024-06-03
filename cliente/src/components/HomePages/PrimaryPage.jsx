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
        .catch(() => {
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
            {loading ? <div role="status" className="grid place-items-center h-full w-full">
          <svg
            aria-hidden="true"
            className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-400 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div> :
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
