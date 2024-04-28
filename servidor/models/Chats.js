import { Schema, model, Types } from 'mongoose';

const chatSchema = new Schema({
    chat_id: { type: String, required: true, unique: true },
    type: { type: String, required: true, enum: ['private', 'group']},
    members: [{ type: Types.ObjectId , required: true, ref: 'User'}],
    chat_name: { type: String, required: true },
    created_at: { type: Date, required: true, default: Date.now()},
    updated_at: { type: Date, required: true, default: Date.now()},
});

const Chat = model('Chat', chatSchema);

export default Chat;