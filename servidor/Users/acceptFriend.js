import User from "../models/User.js";
import io from "../server.js";
import { userSockets } from "../Sockets/mainSocket.js";

export default async function acceptFriend(req, res){
    const friend = req.body.id;
    const userId = req.user.id;
    try{
        const user = await User.findById(userId);
        const friendUser = await User.findById(friend);
        user.friend_requests = user.friend_requests.filter(friendRequest => friendRequest.toString() !== friend);
        user.friends.push(
            {
                user: friendUser,
                date: Date.now()
            }
        );
        await user.save();

        friendUser.friends.push({
            user: user,
            date: Date.now()
        
        });
        await friendUser.save();
        io.to(userSockets.get(friend)).emit('friendRequestAccepted', {success: true});
        res.json({success: true});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }



}