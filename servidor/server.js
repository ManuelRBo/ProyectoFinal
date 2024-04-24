// Importa las dependencias necesarias
import express from 'express';
import cors from 'cors';
import register from './Auth/register.js';

const app = express();
const PORT = 3000;

// Middleware para permitir CORS
app.use(cors({
    origin: 'http://localhost:5173', // Ajusta según necesidad
    methods: ['GET', 'POST'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  

// Middleware para parsear JSON en las solicitudes entrantes
app.use(express.json());

app.post('/auth/register', register);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor de API corriendo en http://localhost:${PORT}`);
});
