import Message from "../models/Message.js";
import User from "../models/User.js";

export default async function getMessages(req, res) {
    const { id } = req.params;

    try {
        const findMessages = await Message.find({ chat_id: id })
            .select("sender_id message createdAt")
            .sort({ createdAt: 1 });

        // Utiliza Promise.all para esperar todas las promesas de User.findById
        const transformMessages = await Promise.all(
            findMessages.map(async (message) => {
                const sender = await User.findById(message.sender_id).select("username -_id");
                return {
                    sender_id: message.sender_id,
                    sender_user: sender ? sender.username : null, // Solo extrae el nombre de usuario
                    message: message.message,
                    time: message.createdAt,
                };
            })
        );

        res.status(200).json(transformMessages);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
