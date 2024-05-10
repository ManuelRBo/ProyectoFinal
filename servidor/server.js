// Importa las dependencias necesarias
import express from 'express';
import http from 'http';
import cors from 'cors';
import db from './database.js';
import routes from './Routes/routes.js';
import { Server } from 'socket.io';
import mainSocket from './Sockets/mainSocket.js';
import jwt from 'jsonwebtoken';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
 });

const PORT = 3000;

io.use((socket, next) => {
  const token = socket.handshake.headers.cookie.split('=')[1];
  const secret = "prueba";
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return next(new Error('Authentication error'));
    }
    next();
  });
});

io.on('connection', (socket) => {
  mainSocket(socket);
});


export default io;

// Middleware para permitir CORS
app.use(cors({
    origin: 'http://localhost:5173', // Ajusta según necesidad
    methods: ['GET', 'POST'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  

// Middleware para parsear JSON en las solicitudes entrantes
app.use(express.json());

app.use(routes);

// Inicia el servidor
server.listen(PORT, () => {
  console.log(`Servidor de API corriendo en http://localhost:${PORT}`);
});
