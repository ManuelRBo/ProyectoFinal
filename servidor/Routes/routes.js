import { Router } from "express";
import register, { registerValidator } from "../Auth/register.js";

const routes = Router();

routes.post("/auth/register", registerValidator, register)

export default routes