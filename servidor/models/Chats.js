import { Schema, model, Types } from 'mongoose';

const chatSchema = new Schema({
    type: { type: String, required: true, enum: ['private', 'group']},
    members: [{ type: Types.ObjectId , required: false, ref: 'User'}],
    chat_name: { type: String, required: false },
    img: { type: String, required: false },
}, {timestamps: true});

const Chat = model('Chat', chatSchema);

export default Chat;