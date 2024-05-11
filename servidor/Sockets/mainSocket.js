export const userSockets = new Map();
import jwt from 'jsonwebtoken';
import addFriend from '../Users/addFriend.js';
 

export default function mainSocket(socket) {
    console.log('Usuario conectado');
    const token = socket.handshake.headers.cookie.split('=')[1];
    const user = jwt.decode(token).id;
    userSockets.set(user, socket.id);  
    console.log(userSockets);

    socket.on('disconnect', () => {
        userSockets.delete(user);
        console.log('Usuario desconectado');
        console.log(userSockets);
    });

    socket.on('addFriend', async ({ id }, callback)=>{
        try{
            const response = await addFriend(userSockets, user, id);
            callback(response);
        }catch(err){
            console.log(err);
            callback({error: 'Internal server error'});
        }

    });

}