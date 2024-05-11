import User from "../models/User.js";

export default function rejectFriend(req, res) {
    const { id } = req.body;
    const user = req.user.id;
  
    User.findById(user)
    .then(user => {
        user.friend_requests = user.friend_requests.filter(friend => friend.toString() !== id);
        return user.save();
    })
    .then(() => {
        res.json({success: false});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: "Error al rechazar solicitud de amistad"});
    })
}