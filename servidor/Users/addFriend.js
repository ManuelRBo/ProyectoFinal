import User from '../models/User.js';
import mongoose from 'mongoose';
import io from '../server.js'

export default async function addFriend(userSockets, myUser, userIDFriend) {
    console.log(userIDFriend);
    const userToSend = userSockets.get(userIDFriend);

    try{
        if(!mongoose.Types.ObjectId.isValid(userIDFriend)) return new Error('Invalid user ID');
        const user = await User.findById(userIDFriend);
        user.friend_requests.push(myUser);
        await user.save();
        if(userToSend) io.to(userToSend).emit('friendRequest', myUser);
        return true;

    }catch(err){
        console.error(err);
        return new Error('Error adding friend');
    }
}