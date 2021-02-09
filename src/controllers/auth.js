import { Users } from "../models/";
import bcryptjs from "bcryptjs";
import { generateJWT } from "../middlewares/jwt";

//1. Completar la logica para manejar el inicio de sesión
// - responder con un codigo de estado 401 cuando las credenciales sean incorrectas
// - responder con un mensaje (message) y codigo de estado 200 cuando las credenciales sean correctas
// - responder con el token jwt (token) 
export const login = async (req, res) => {
    const { email, password } = req.body;
    const results = await Users.findOne({where: {email: email}});
    if(results){
        const valid = bcryptjs.compareSync(password, results.password);
        if(valid){
            const token = generateJWT(results);
            return res.status(200).json({
                message: "Credenciales correctas. Inicio de sesión exitoso!",
                token,
            });
        }
        return res.status(401).json({
            message:"Credenciales incorrectas. Fallo de contraseña"
        });
     }
     return res.status(401).json({
        message:"Credenciales incorrectas. No existe un usuario con estas credenciales"
    });
}

//2. Completar el registro de usuario
// - responder con un codigo de estado fallido 400 > cuando hagan falta campos o cuando el usuario ya exista en la base de datos
// - responder con el objeto del usuario que ha sido creado y un codigo 201 cuando el registro sea satisfactorio
export const signIn = async (req, res) => {
    try{
        const {firstName, lastName, email, password} = req.body;

        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({message: 'El Registro está incompleto, faltan los campos nombre y apellido'})
        }else {
            const encryptedPassword = bcryptjs.hashSync(req.body.password, 10); //encripto la contraseña con bcrypt
            req.body.password = encryptedPassword; //reasignando la contraseña encriptada
        }
      
        let validatingUserExist = await Users.findOne({where: {email: req.body.email}});

        if(validatingUserExist){
            res.status(400).json({message: 'El Usuario ya existe en la base de datos'});
        }else{
            const results = await Users.create(req.body);
            res.status(201).json(results);
        }
        
    }catch(error){
        console.log(error);
    }

}

