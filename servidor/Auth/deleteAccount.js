import User from "../models/User.js";
import Chat from "../models/Chats.js";
import Message from "../models/Message.js";
import fs from "fs";

export default async function deleteAccount(req, res) {
  const { id } = req.user;

  try {

    // Encuentra todos los chats en los que el usuario es miembro
    const chats = await Chat.find({ members: id });


    for (let chat of chats) {
      // Elimina al usuario de los miembros del chat
      chat.members = chat.members.filter(member => member.toString() !== id);

      if (chat.members.length === 0) {
        // Si no hay más miembros en el chat, elimina el chat
        if (chat.type === "private") {
          await chat.deleteOne();
        }
        // Elimina todos los mensajes asociados al chat
        await Message.deleteMany({ chat_id: chat._id });
      }
        // Guarda los cambios en el chat
        await chat.save();
    }

    // Elimina al usuario
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Elimina la imagen de perfil del usuario si existe
    if (user.img) {
      fs.unlinkSync(`./public/images/userData/${user.img}`);
    }

    await user.deleteOne();

    // Devuelve una respuesta de éxito
    res.status(200).json({ message: "Cuenta eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor" });
  }
}
