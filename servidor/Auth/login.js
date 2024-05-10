import User from '../models/User.js';
import { body, validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import io from '../server.js';

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
            return res.status(400).json( {errors: [{path: 'user_email', msg: 'Usuario no encontrado'}]});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({errors: [{path: 'password', msg: 'Contraseña incorrecta'}]});
        }
        const payload = {
            id: user.id,
            username: user.username,
        }
        const token = jwt.sign(payload, "prueba", {expiresIn: '1d'});
        res.cookie('token', token, {httpOnly: true, secure: true, sameSite: 'strict', expires: new Date(Date.now() + 24 * 60 * 60 * 1000)});
        io.engine.emit('login', user.id);
        return res.status(200).json({message: 'Usuario autenticado correctamente'});
    }catch(error){
        console.log(error);
    }
}