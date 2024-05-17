import { Schema, model, Types } from 'mongoose';

const chatSchema = new Schema({
    _id: { type: String, required: true, unique: true },
    type: { type: String, required: true, enum: ['private', 'group']},
    members: [{ type: Types.ObjectId , required: true, ref: 'User'}],
    chat_name: { type: String, required: false },
    img: { type: String, required: false },
}, {timestamps: true});

const Chat = model('Chat', chatSchema);

export default Chat;