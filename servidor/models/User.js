import { Schema, model, Types } from "mongoose";


const userSchema = new Schema({
    username: { type: String, required: true, unique: true},
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    birthdate: { type: Date, required: true },
    exp: { type: String, required: true },
    img: { type: String, required: false, default: null},
    friends: [{ type: Types.ObjectId, ref: 'User' }],
});

const User = model("User", userSchema);

export default User;
