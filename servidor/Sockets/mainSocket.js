const userSockets = new Map();


export default function mainSocket(socket) {
    console.log('Usuario conectado');

    socket.on('disconnect', () => {
        
        console.log('Usuario desconectado');
    });

    socket.on('addFriend', (data) => {
        console.log(data);
    });

    console.log(userSockets);
}