import Chat from '../models/Chats.js';

export default async function channelsData(req, res) {
    const user_id = req.user.id;
    try {
        const chats_group = await Chat.find({ members: user_id, type: 'group' }).select('chat_name img');
        res.json(chats_group);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Error del servidor' });
    }
}