export const userSockets = new Map();
import jwt from 'jsonwebtoken';
import addFriend from '../Users/addFriend.js';
import saveMessage, { sanitizeInput } from '../Chats/saveMessage.js';
import connected from '../Users/connected.js';

 

export default function mainSocket(socket) {
    console.log('Usuario conectado');
    const token = socket.handshake.headers.cookie.split('=')[1];
    const user = jwt.decode(token).id;
    userSockets.set(user, socket.id);  
    console.log(userSockets);
    connected(userSockets, user, socket);

    socket.on('disconnect', () => {
        userSockets.delete(user);
        console.log('Usuario desconectado');
        console.log(userSockets);
    });

    socket.on('addFriend', async ({ id }, callback)=>{
        console.log(id);
        try{
            const response = await addFriend(userSockets, user, id);
            callback(response);
        }catch(err){
            console.log(err);
            callback({error: 'Internal server error'});
        }

    });

    socket.on('send-message', async ({ chat_id, message }, callback)=>{
        try{
            chat_id = sanitizeInput(chat_id);
            message = sanitizeInput(message);
            const response = await saveMessage(userSockets, user, chat_id, message);
            callback(response);
        }catch(err){
            console.log(err);
            callback({error: 'Internal server error'});
        }
    });
}