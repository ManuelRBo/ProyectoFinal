import User from "../models/User.js";

export default async function connected(userSockets, user, socket) {
    try {
        const friends = await User.findById(user).populate('friends.user', 'username');
        for (const friend of friends.friends) {
            console.log(friend.user.username);
            socket.to(userSockets.get(friend.user._id.toString())).emit('connected', { username: friends.username });
        }
    } catch (err) {
        console.log(err);
        return { error: 'Internal server error' };
    }
}