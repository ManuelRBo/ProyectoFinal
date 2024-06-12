import User from "../models/User.js";
import Chat from "../models/Chats.js";
import Message from "../models/Message.js";
import fs from "fs";
import io from "../server.js";
import { userSockets } from "../Sockets/mainSocket.js";

export default async function deleteAccount(req, res) {
  const { id } = req.user;

  try {
    // Encuentra al usuario antes de proceder
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Encuentra todos los chats en los que el usuario es miembro
    const chats = await Chat.find({ members: id });

    const chatPromises = chats.map(async (chat) => {
      if (chat) { // Verifica que el chat no sea null
        // Elimina al usuario de los miembros del chat
        chat.members = chat.members.filter(member => member.toString() !== id);

        // Si no hay más miembros en el chat, elimina el chat
        if (chat.type === "private") {
          // Elimina todos los mensajes asociados al usuario
          await Message.deleteMany({ sender_id: id, chat_id: { $nin: chats.map(chat => chat._id) }});
          await Chat.deleteOne({ _id: chat._id });
        } else {
          // Actualiza el chat con el nuevo arreglo de miembros
          await Message.deleteMany({ sender_id: id });
          await chat.save();
        }
      }
    });

    // Espera a que todas las operaciones de chat se completen
    await Promise.all(chatPromises);

    // Notifica a los amigos y actualiza sus listas de amigos
    const friendPromises = user.friends.map(async (friend) => {
      const friendUser = await User.findById(friend.user);
      if (friendUser) {
        io.to(userSockets.get(friend.user.toString())).emit("friend-delete", { id: id });
        friendUser.friends = friendUser.friends.filter(friend => friend.user.toString() !== id);
        await friendUser.save();
      }
    });

    // Espera a que todas las operaciones de amigos se completen
    await Promise.all(friendPromises);

    // Elimina la imagen de perfil del usuario si existe
    if (user.img) {
      try {
        fs.unlinkSync(`./public/images/userData/${user.img}`);
      } catch (err) {
        console.error(`Error al eliminar la imagen de perfil: ${err.message}`);
      }
    }

    // Elimina al usuario
    await user.deleteOne();

    // Devuelve una respuesta de éxito
    res.status(200).json({ message: "Cuenta eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor" });
  }
}
