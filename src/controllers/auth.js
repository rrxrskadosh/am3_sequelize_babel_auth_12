import {Users} from "../models/";
import bcryptjs from "bcryptjs";
import {generateJWT} from "../middlewares/jwt";

export const login = async (req, res) => {
    const {email, password} = req.body;
    const results = await Users.findOne({where: {email: email}});
    if(results){
        const valid = bcryptjs.compareSync(password, results.password);
        if(valid){
            const token = generateJWT(results);
            return res.json({
                message: "Has iniciado sesión correctamente",
                token
            });
        }
        return res.json({
            message: "Las credenciales son incorrectas"
        });
    }
    return res.json({
        message: "Las credenciales son incorrectas"
    });
}


export const signIn = async (req, res) => {
    try{
        const pass = req.body.password;
        const encryptedPass = bcryptjs.hashSync(pass, 10); //encripto la contraseña con bcrypt
        req.body.password = encryptedPass; //reasignando la contraseña encriptada
        const results = await Users.create(req.body);
        res.json(results);
    }catch(error){
        console.log(error);
    }
}

