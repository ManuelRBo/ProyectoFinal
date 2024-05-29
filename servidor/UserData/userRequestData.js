import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export default async function userRequestData(req, res) {
    const arrayFriendsRequests = [];
    const token = req.headers.cookie.split('=')[1];
    const user = jwt.decode(token).id;
    const userData = await User.findById(user);
    const userRequestData = userData.friend_requests;
    for (const user of userRequestData) {
        const userRequest = await User.findById(user);
        arrayFriendsRequests.push({
            username: userRequest.username,
            img: userRequest.img,
            id: userRequest._id,
            connected: userRequest.connected
        });
    }
    res.json(arrayFriendsRequests);
}
