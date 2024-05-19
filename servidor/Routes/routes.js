import { Router } from "express";
import register, { registerValidator } from "../Auth/register.js";
import login, { loginValidator } from "../Auth/login.js";
import check from "../Auth/check.js";
import userData from "../UserData/userData.js";
import checkJWT from "../UserData/checkJWT.js";
import searchUsers from "../Users/searchUsers.js";
import logout from "../Auth/logout.js";
import userRequestData from "../UserData/userRequestData.js";
import acceptFriend from "../Users/acceptFriend.js";
import rejectFriend from "../Users/rejectFriend.js";
import userFriendsData from "../UserData/userFriendsData.js";
import createChat from "../Chats/createChat.js";
import dataChat from "../Chats/dataChat.js";
import getMessages from "../Chats/getMessages.js";
import followChat from "../Chats/followChat.js";

const routes = Router();

routes.post("/auth/register", registerValidator, register)
routes.post("/auth/login", loginValidator, login)
routes.post("/auth/logout", checkJWT, logout)
routes.post("/auth/check", check)
routes.post("/chat/createChat", checkJWT, createChat)
routes.post("/chat/followChat", checkJWT, followChat)
routes.get("/userData/userData", checkJWT, userData)
routes.get("/searchUsers", checkJWT, searchUsers)
routes.get("/userData/userRequestData", checkJWT, userRequestData)
routes.get("/userData/userFriendsData", checkJWT, userFriendsData)
routes.get("/chat/chatData/:id", checkJWT, dataChat)
routes.get("/chat/messages/:id", checkJWT, getMessages)
routes.patch("/userData/acceptFriend", checkJWT, acceptFriend)
routes.patch("/userData/rejectFriend", checkJWT, rejectFriend)

export default routes;