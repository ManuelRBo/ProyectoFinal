import Message from "../models/Message.js";

export default async function getMessages(req, res) {
    const { id } = req.params;

    try{
        const findMessages = await Message.find({ chat_id: id }).select("sender_id message createdAt").sort({ createdAt: 1 });
        const transformMessages = findMessages.map((message) => {
            return {
                sender_id: message.sender_id,
                message: message.message,
                time: message.createdAt
            }
        });
        res.status(200).send(transformMessages);
    }catch(err){
        console.log(err);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
}