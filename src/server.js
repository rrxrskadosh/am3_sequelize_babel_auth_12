import app from "./index";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 9500;

app.listen(PORT, () => {
    console.log("Servidor escuchando sobre el puerto", PORT);
});