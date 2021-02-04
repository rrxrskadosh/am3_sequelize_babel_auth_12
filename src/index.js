import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(authRouter);

app.listen(PORT, () => {
    console.log("Servidor escuchando sobre el puerto", PORT);
});