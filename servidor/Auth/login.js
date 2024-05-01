import User from '../models/User.js';

export default async function login(req, res) {
    const { user_email, password } = req.body;
    try{
        const user = await User.findOne( {$or: [{email: user_email}, {username: user_email}]})
        if(!user){
            return res.status(400).json({message: 'Usuario no encontrado'});
        }
        console.log(user);
        const isMatch = await user.password===password;
        if(!isMatch){
            return res.status(400).json({message: 'Contraseña incorrecta'});
        }
        return res.status(200).json({message: 'Usuario autenticado correctamente', user: user});
    }catch(error){
        console.log(error);
    }
}