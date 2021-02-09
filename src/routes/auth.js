import express from "express";
import {login, signIn } from "../controllers/auth";
import { getUsers, getUserById } from "../controllers/users";
const router = express.Router();
//Enrutando peticiones
router.post("/login", login);
router.post("/signin", signIn);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);

export default router;