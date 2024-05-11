import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export default async function userFriendsData(req, res) {
    const arrayFriends = [];
    const token = req.headers.cookie.split('=')[1];
    const user = jwt.decode(token).id;
    const userData = await User.findById(user);
    const userFriends = userData.friends;
    for (const user of userFriends) {
        const userRequest = await User.findById(user.user);
        arrayFriends.push({
            username: userRequest.username,
            img: userRequest.img,
            id: userRequest._id
        });
    }
    res.json(arrayFriends);
}
