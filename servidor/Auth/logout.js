import User from "../models/User.js";

export default async function logout(req, res) {
    const user_id = req.user.id;
    const user = await User.findById(user_id);
    user.connected = false;
    await user.save();
    res.clearCookie('token');
    res.end();
}