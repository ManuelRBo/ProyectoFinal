import User from '../models/User.js';
import { body, validationResult } from "express-validator";
import bcrypt from 'bcrypt';

export const loginValidator = [
    body('user_email').isString().withMessage('El email debe ser un string'),
    body('password').isString().withMessage('La contraseña debe ser un string'),
    body('password').trim().escape(),
    body('user_email').toLowerCase().escape().trim(),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

export default async function login(req, res) {
    const { user_email, password } = req.body;
    try{
        const user = await User.findOne( {$or: [{email: user_email}, {username: user_email}]})
        if(!user){
            return res.status(400).json({message: 'Usuario no encontrado'});
        }
        console.log(user);
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Contraseña incorrecta'});
        }
        return res.status(200).json({message: 'Usuario autenticado correctamente', user: user});
    }catch(error){
        console.log(error);
    }
}