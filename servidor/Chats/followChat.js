import Chat  from '../models/Chats.js';
import User from '../models/User.js';

export default async function followChat(req, res) {
    const user_id = req.user.id
    const { id } = req.body;
    try{
        const chat = await Chat.findById(id);
        if(!chat) return res.status(404).json({ error: "Chat no encontrado" });
        chat.members.push(user_id);
        await chat.save(); 
        
        const user = await User.findById(user_id);
        user.channels.push({
            channel: id,
            date: Date.now(),
        });
        await user.save();
        res.json({ message: "Chat seguido" });
        
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error del servidor" });
    }
}