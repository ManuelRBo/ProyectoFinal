import { Schema, Types, model } from "mongoose";

const messageSchema = new Schema({
    message_id: { type: Types.ObjectId, ref: "Message", required: true, unique: true, index: true },
    chat_id: { type: Types.ObjectId, ref: "Chat", required: true },
    sender_id: { type: Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true},
    created_at: { type: Date, required: true, default: Date.now()},
});

const Message = model("Message", messageSchema);

export default Message;