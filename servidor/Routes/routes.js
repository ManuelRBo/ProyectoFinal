import { Router } from "express";
import register, { registerValidator } from "../Auth/register.js";
import login, { loginValidator } from "../Auth/login.js";
import check from "../Auth/check.js";
import userData from "../UserData/userData.js";
import checkJWT from "../UserData/checkJWT.js";


const routes = Router();

routes.post("/auth/register", registerValidator, register)
routes.post("/auth/login", loginValidator, login)
routes.post("/auth/check", check)
routes.get("/userData/userData", checkJWT, userData)

export default routes