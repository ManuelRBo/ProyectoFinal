import User from '../models/User.js';
import Chat from '../models/Chats.js';



export default async function searchUsers(req, res) {
    try {
        const actualUser = req.user.id;
        const query = req.query.query
        const users = await User.find({ username: { $regex: query, $options: 'i' }, _id: { $ne: actualUser }});
        const chats = await Chat.find({ chat_name: { $regex: query, $options: 'i' }, type: 'group'});
        res.json({
            users: users.map(user => {
                return {
                    id: user._id,
                    username: user.username,
                    img: user.img,
                    friend : user.friends.some(friend => friend.user.toString() === actualUser)
                }
            }),
            chats: chats.map(chat => {
                return {
                    chat_name: chat.chat_name,
                    img: chat.img,
                }
            })
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}