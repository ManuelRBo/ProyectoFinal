import User from '../models/User.js';
import Chat from '../models/Chats.js';
import Message from '../models/Message.js';

export default async function userData(req, res) {
    const user_id = req.user.id;
    try {
        const user = await User.findById(user_id).select('username img _id');
        const chats_group = await Chat.find({ members: user_id, type: 'group' }).select('chat_name img');
        const chats_private = await Chat.find({ members: user_id, type: 'private' }).select('members');

        const combinedChats = [];

        for (let i = 0; i < chats_private.length; i++) {
            const chat = chats_private[i];
            const friend_id = chat.members.find(id => id != user_id);
            const friend = await User.findById(friend_id).select('username img -_id');
            const last_message = await Message.findOne({ chat_id: chat._id }).sort({ createdAt: -1 }).select('message createdAt _id');
            combinedChats.push({ type: 'private', chat, friend, last_message });
        }

        for (let i = 0; i < chats_group.length; i++) {
            const chat = chats_group[i];
            const last_message = await Message.findOne({ chat_id: chat._id }).sort({ createdAt: -1 }).select('message createdAt _id');
            combinedChats.push({ type: 'group', chat, last_message });
        }

        // Ordenar los chats por fecha del último mensaje, de más reciente a más antiguo
        combinedChats.sort((a, b) => {
            const dateA = a.last_message ? new Date(a.last_message.createdAt) : new Date(0);
            const dateB = b.last_message ? new Date(b.last_message.createdAt) : new Date(0);
            return dateB - dateA;
        });

        res.json({ user, combinedChats });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Error del servidor' });
    }
}
