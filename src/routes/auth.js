import express from "express";
import {login, signIn, getUsers, getUserById } from "../controllers/auth";
const router = express.Router();
//Enrutando peticiones
router.post("/login", login);
router.post("/signin", signIn);
router.get("/users", getUsers);
router.get("/user/:id", getUserById);

export default router;