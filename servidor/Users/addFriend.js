import User from '../models/User.js';
import mongoose from 'mongoose';
import io from '../server.js'

export default async function addFriend(userSockets, myUser, userIDFriend) {
    const userToSend = userSockets.get(userIDFriend);
    console.log(userToSend);

    try{
        if(!mongoose.Types.ObjectId.isValid(userIDFriend)) return {error: 'Invalid user ID'};
        const user = await User.findById(userIDFriend);
        if(user.friend_requests.includes(myUser)) return {error: 'Solicitud de amistad ya enviada'};
        user.friend_requests.push(myUser);
        await user.save();
        if(userToSend) io.to(userToSend).emit('friendRequest', {success: true});
        return {success: true};

    }catch(err){
        console.log(err);
        return {error: 'Internal server error'};
    }
}