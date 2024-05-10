import User from '../models/User.js';
import mongoose from 'mongoose';

export default async function addFriend(req, res) {
    const { id } = req.body;

    try{
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({error: 'Invalid id'});
        const user = await User.findById(id);
        user.friend_requests.push(req.user.id);
        await user.save();
        return res.status(200).json({message: 'Friend request sent'});

    }catch(err){
        console.error(err);
        return res.status(500).json({error: 'Internal server error'});
    }
}