import io from "../server.js";

const userSockets = new Map();


export default function mainSocket(socket) {
    console.log('Usuario conectado');

    socket.on('disconnect', () => {
        
        console.log('Usuario desconectado');
    });

    io.engine.on('login', (data) => {
        userSockets.set(data, socket.id);
    });

    socket.on('addFriend', (data) => {
        console.log(data);
    });

    console.log(userSockets);
}