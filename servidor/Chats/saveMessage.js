import Chat from '../models/Chats.js';
import Message from '../models/Message.js';
import io from '../server.js';


export function sanitizeInput(input) {
    // Eliminar espacios en blanco al principio y al final
    input = input.trim();
    // Reemplazar caracteres especiales para prevenir inyecciones de código
    input = input.replace(/&/g, "&amp;")
                 .replace(/</g, "&lt;")
                 .replace(/>/g, "&gt;")
                 .replace(/"/g, "&quot;")
                 .replace(/'/g, "&#039;");
    return input;
  }
  

export default async function saveMessage(userSockets, user, chat_id, message) {
        const chat = await Chat.findById(chat_id);
        if(!chat){
            throw new Error('Chat not found');
        }
    
        if(!chat.members.includes(user)){
            throw new Error('User not in chat');
        }
    
        const newMessage = new Message({
            chat_id: chat_id,
            sender_id: user,
            message: message
        });
        
        await newMessage.save();

        const friend = chat.members.find(u => u != user);
        const friendSocket = userSockets.get(friend.toString());
        io.to(friendSocket).emit('new-message', {chat_id, message, sender_id: user, time: Date.now()});
        return newMessage;
}