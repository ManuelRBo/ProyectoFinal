import Contact from "../HomeComponents/Contact";
import { useEffect } from "react";
import { useUserDataStore } from "../../stores/userUserDataStore";
import useSocketStore from "../../stores/useSocket";
import { toast } from "react-toastify";

export default function Friends({friendsOpen}) {

  const {userRequestData, setUserRequestData, userLoading, userFriendsData, setUserFriendsData} = useUserDataStore();
  const {socket} = useSocketStore();

  useEffect(() => {
    setUserRequestData();
    setUserFriendsData();
  }, [setUserRequestData, friendsOpen, setUserFriendsData]);

  useEffect(() => {
    const handleFriendRequestAccepted = () => {
      setUserFriendsData();
      toast.success("Solicitud de amistad aceptada");
    };
  
    socket.on("friendRequestAccepted", handleFriendRequestAccepted);
  
    // Función de limpieza
    return () => {
      socket.off("friendRequestAccepted", handleFriendRequestAccepted);
    };
  }, [socket, setUserFriendsData]);


  return (
    <>
      <div className="flex items-center max-md:justify-center gap-5 border-b-2 border-gray-200 pb-3 mb-14 ml-5">
        <h2 className="text-4xl font-black font-inter">Mis Amigos</h2>
      </div>

      <div className="max-w-7xl overflow-auto">
        <h2 className="text-lg md:text-3xl max-md:text-center font-inter font-bold mb-4 md:mb-8">Peticiones de Amistad</h2>
        {!userLoading && userRequestData.length === 0 ? <p className="text-sm md:text-base max-md:text-center font-inter">No tienes peticiones de amistad</p>:
          <>
          <div className="flex flex-wrap max-lg:justify-center justify-start gap-8 md:gap-14 max-w-6xl mx-auto">
          {!userLoading ? userRequestData.map((user, index) => (
            <Contact key={index} username={user.username} img={user.img} friend={"pendiente"} id={user.id}/>
          )) : <h2 className="text-lg md:text-3xl max-md:text-center font-inter font-bold mb-4 md:mb-8">Cargando...</h2>}
        </div>
          </>
        }
        
      </div>

      <div className="mt-14 max-w-7xl overflow-auto">
        <h2 className="text-lg md:text-3xl max-md:text-center font-inter font-bold mb-4 md:mb-8">Mis amigos</h2>
        <form className="mb-5 mx-auto flex gap-5 max-md:w-[80%] max-lg:justify-center">
            <input type="text" placeholder="Buscar amigos" className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md" />
            <button className="bg-blue-500 text-white p-2 rounded-md">Buscar</button>
        </form>
        <div className="flex flex-wrap max-lg:justify-center justify-start gap-8 md:gap-14">
        {!userLoading && userFriendsData.length === 0 ? <p className="text-sm md:text-base max-md:text-center font-inter">No tienes amigos</p>:

          <div className="flex flex-wrap max-lg:justify-center justify-start gap-8 md:gap-14 ">
          {!userLoading ? userFriendsData.map((user, index) => (
            <Contact key={index} username={user.username} img={user.img} friend={true} id={user.id}/>
          )) : <h2 className="text-lg md:text-3xl max-md:text-center font-inter font-bold mb-4 md:mb-8">Cargando...</h2>}
        </div>
        }
        </div>
      </div>
    </>
  )
}
