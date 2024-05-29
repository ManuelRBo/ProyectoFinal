import User from '../models/User.js';
import Chat from '../models/Chats.js';



export default async function searchUsers(req, res) {
    try {
        const actualUser = req.user.id;
        const query = req.query.query
        const users = await User.find({ username: { $regex: query, $options: 'i' }, _id: { $ne: actualUser }});
        const chats = await Chat.find({ chat_name: { $regex: query, $options: 'i' }, type: 'group'});
        const usersResult = users.map(user => {
            return {
                id: user._id,
                username: user.username,
                img: user.img,
                friend : user.friends.some(friend => friend.user.toString() === actualUser),
                connected: user.connected
            }
        });
        const chatsResult = chats.map(chat => {
            return {
                id: chat._id,
                chat_name: chat.chat_name,
                img: chat.img,
                userInChat: chat.members.some(user => user.toString() === actualUser)
            }
        })

        res.json({
            users: usersResult,
            chats: chatsResult
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}