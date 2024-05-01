import { Router } from "express";
import register, { registerValidator } from "../Auth/register.js";
import login from "../Auth/login.js";

const routes = Router();

routes.post("/auth/register", registerValidator, register)
routes.post("/auth/login", login)

export default routes