import User from "../models/User.js";

export default async function userData(req, res) {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        console.log(user);
        res.json(
            {
                username: user.username,
                friends: user.friends.length,
                img: user.img,
                exp: user.exp,
                channels: user.channels.length,
            }
        )
    }catch(err) {
        console.log(err);
    }
}