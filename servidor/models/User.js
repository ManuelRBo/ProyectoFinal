import { Schema, model, Types } from "mongoose";


const userSchema = new Schema({
    user_id: { type: Types.ObjectId, ref: 'User', required: true, unique: true, index: true, },
    username: { type: String, required: true, unique: true},
    first_name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    exp: { type: Number, required: true },
    img: { type: String, required: true },
});

const User = model("User", userSchema);

export default User;
