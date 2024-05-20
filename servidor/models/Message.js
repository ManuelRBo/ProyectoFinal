import { Schema, Types, model } from "mongoose";

const messageSchema = new Schema({
    chat_id: { type: Types.ObjectId, ref: "Chat", required: true },
    sender_id: { type: Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true},
}, {timestamps: true});

const Message = model("Message", messageSchema);

export default Message;