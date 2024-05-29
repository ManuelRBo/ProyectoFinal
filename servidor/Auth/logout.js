import User from "../models/User.js";
import io from "../server.js";
import { userSockets } from "../Sockets/mainSocket.js";

export default async function logout(req, res) {
    const user_id = req.user.id;
    const user = await User.findById(user_id);
    const friends = user.friends;
    for(let friend of friends) {
        io.to(userSockets.get(friend.user.toString())).emit('friend-logout', {id: user_id});
    }
    user.connected = false;
    await user.save();
    res.clearCookie('token');
    res.end();
}