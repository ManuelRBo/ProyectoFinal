import Chat from "../models/Chats.js";

export default async function createChat(req, res){
    const myUser = req.user.id;
    const friend = req.body.id;

    const existChat = await Chat.findOne({members: { $all: [myUser, friend] }, type: 'private'});
    if(!existChat){
        const newChat = new Chat({
            type: 'private',
            members: [myUser, friend],
            created_at: Date.now()
        });
        await newChat.save();
        return res.json({id: newChat._id});
    }else{
        return res.json({id: existChat._id})
    }

}