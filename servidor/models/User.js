import { Schema, model, Types, connect } from "mongoose";


const userSchema = new Schema({
    username: { type: String, required: true, unique: true},
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    birthdate: { type: Date, required: true },
    exp: { type: String, required: true },
    img: { type: String, required: false, default: null},
    friends: [{
        user : { type: Types.ObjectId, ref: 'User', required: true},
        date: { type: Date, required: false, default: Date.now()},
        _id: false,
        }],
    friend_requests: [{ type: Types.ObjectId, ref: 'User', required: false }],
    channels: [
        {
            channel: { type: Types.ObjectId, ref: 'Chat', required: true },
            date: { type: Date, required: false, default: Date.now() },
            _id: false,
        },
    ],
    connected: { type: Boolean, required: false, default: false },
});

const User = model("User", userSchema);

export default User;
