import Chat from '../models/Chats.js';
import User from '../models/User.js';

export default async function dataChat(req, res) {
    const myUserId = req.user.id;
    const chatId = req.params.id;
    const chat = await Chat.findById(chatId)
    if(chat.type === 'private') {
        if(chat.members.includes(myUserId)) {
            const friend = chat.members.find(member => member.toString() !== myUserId.toString());
            const friendData = await User.findById(friend);
            return res.json({username: friendData.username, img: friendData.img, user_id: friendData._id, type: chat.type})
        } else {
            res.status(401).json({message: "Unauthorized"})
        }
    } else {
        return res.json({chat_name: chat.chat_name, img: chat.img, user_id: myUserId, type: chat.type})
        res.json(chat)
    }
}