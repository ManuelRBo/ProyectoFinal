import { Router } from "express";
import register, { registerValidator } from "../Auth/register.js";
import login, { loginValidator } from "../Auth/login.js";

const routes = Router();

routes.post("/auth/register", registerValidator, register)
routes.post("/auth/login", loginValidator, login)

export default routes