import { body, validationResult } from 'express-validator';
import User from '../Models/User.js';

export const registerValidator = [
    body('username').isString().isLength({ min: 2 }).withMessage('El nombre de usuario debe tener al menos 2 caracteres'),
    body('name').isString().isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('lastname').isString().isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
    body('birthdate').isDate().isBefore(new Date().toISOString().split("T")[0]).withMessage('La fecha de nacimiento no puede ser mayor a la fecha actual'),
    body('email').isEmail().withMessage('Ingrese un correo válido'),
    body('password').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).withMessage('La contraseña debe tener al menos 6 caracteres y contener letras y números'),
    body('name').trim().escape(),
    body('lastname').trim().escape(),
    body('birthdate').trim().escape(),
    body('email').normalizeEmail(),
    body('password').trim(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default async function register(req, res) {
    const {username, name, lastname, birthdate, email, password, experience} = req.body;
    console.log(req.body);
    const user = new User({ 
        username: username,
        first_name: name,
        last_name: lastname,
        password: password,
        email: email,
        birthdate: birthdate,
        exp: experience,
    });
    console.log(user);
    try {
        await user.save();
        console.log('Usuario creado');
    } catch (error) {
        console.log(error);
    }
}