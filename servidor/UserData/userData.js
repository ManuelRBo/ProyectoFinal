import User from '../models/User.js';
import Chat from '../models/Chats.js';
import Message from '../models/Message.js';


export default async function userData(req, res){
    const user_id = req.user.id;
    try{
        const user = await User.findById(user_id).select('username img -_id');
        const chats_group = await Chat.find({members: user_id}).find({type: 'group'}).select('chat_name img');
        const chats_private = await Chat.find({members: user_id}).find({type: 'private'}).select('chat_name img');
        res.json({user, chats_group, chats_private});
    }catch(e){
        console.log(e);
    }
}