import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";


export const registerValidator = [
  body("username")
    .isString()
    .isLength({ min: 2 })
    .withMessage("El nombre de usuario debe tener al menos 2 caracteres"),
  body("name")
    .isString()
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres"),
  body("lastname")
    .isString()
    .isLength({ min: 2 })
    .withMessage("El apellido debe tener al menos 2 caracteres"),
  body("birthdate")
    .isDate()
    .isBefore(new Date().toISOString().split("T")[0])
    .withMessage("La fecha de nacimiento no puede ser mayor a la fecha actual"),
  body("email").isEmail().withMessage("Ingrese un correo válido"),
  body("password")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
    .withMessage(
      "La contraseña debe tener al menos 6 caracteres y contener letras y números"
    ),
  body("name").trim().escape().toLowerCase(),
  body("lastname").trim().escape().toLowerCase(),
  body("birthdate").trim().escape(),
  body("email").normalizeEmail(),
  body("password").trim().escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default async function register(req, res) {
  const { username, name, lastname, birthdate, email, password, experience } =
    req.body;

  try {
    const hasPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username: username,
      first_name: name,
      last_name: lastname,
      password: hasPassword,
      email: email,
      birthdate: birthdate,
      exp: experience,
    });
    console.log(user);
    try {
      await user.save();
      const payload = {
        id: user.id,
        username: user.username,
      };
      const token = jwt.sign(payload, "prueba", { expiresIn: "1h" });
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        if (error.keyValue.email) {
          return res.status(400).json({
            errors: [
              { path: "email", msg: "El correo electrónico ya está en uso" },
            ],
          });
        } else if (error.keyValue.username) {
          return res.status(400).json({
            errors: [
              { path: "username", msg: "El nombre de usuario ya está en uso" },
            ],
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}
