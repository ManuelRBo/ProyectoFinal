// Importa las dependencias necesarias
import express from "express";
import http from "http";
import cors from "cors";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import db from "./database.js";
import routes from "./Routes/routes.js";
import mainSocket from "./Sockets/mainSocket.js";

// Crea una instancia de la aplicación Express
const app = express();

// Crea el servidor HTTP utilizando la aplicación Express
const server = http.createServer(app);

// Configura el servidor de Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://192.168.1.165:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

export default io;

// Middleware para permitir CORS
app.use(
  cors({
    origin: "http://192.168.1.165:5173", // Ajusta según necesidad
    methods: ["GET", "POST"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware para parsear JSON en las solicitudes entrantes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public',express.static('public'));

// Middleware para manejar las rutas definidas en el archivo 'routes.js'
app.use(routes);

// Middleware para autenticación con Socket.IO
io.use((socket, next) => {
  const token = socket.handshake.headers.cookie.split("=")[1];
  const secret = "prueba";
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return next(new Error("Authentication error"));
    }
    next();
  });
});

// Configura las conexiones de Socket.IO
io.on("connection", (socket) => {
  mainSocket(socket);
});

// Inicia el servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor de API corriendo en http://localhost:${PORT}`);
});
