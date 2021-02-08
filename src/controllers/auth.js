import { Users } from "../models/";
import bcryptjs from "bcryptjs";
import { generateJWT, validateJWT } from "../middlewares/jwt";

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
    let data = req.body;
    let validatingUserExist = await Users.findOne({where: {email: data.email}});
    // let validateRegisterFailed (REVISAR)
    try{
        if(validatingUserExist){
            res.status(400).json({message: 'El Usuario ya existe en la base de datos'});
        }else{
            const encryptedPassword = bcryptjs.hashSync(data.password, 10); //encripto la contraseña con bcrypt
            data.password = encryptedPassword; //reasignando la contraseña encriptada
            const results = await Users.create(data);
            res.status(201).json(results);
        }
        // if(validateRegisterFailed){ (REVISAR)
        //     return res.status(400).json({message: 'El Registro está incompleto, faltan los campos nombre y apellido'})
        // }
    }catch(error){
        console.log(error);
    }

}

//Get Users (Obtener todos los usuarios)
export const getUsers = async (req,res) => {
        // console.log(req.headers.authorization.split(" ")[1]);
        const tokenVerify = await validateJWT(req,res);
        //Si el Token es Valido me devuelve el Payload
        // console.log(results);
        try{
            if(tokenVerify){ //Si tokenVerify es valido pedimos TODOS los Usuarios con findAll y retornamos una respuesta de ESTADO 200 junto con los resultados
                const results = await Users.findAll();
                return res.status(200).json({  
                    results
                });
            }else{ //Si es invalido pasamos un estado igual o mayor a 402 y un mensaje de ERROR!
                return res.status(401).json({message: 'Token inválido'});
            }
        }catch{
            console.log(error);
        }
        
    }

//Get User by ID (Obtener usuario por ID)
export const getUserById = async (req,res) => {
        const tokenVerify = await validateJWT(req,res);
        try {
            if(tokenVerify){
                const results = await Users.findOne({where: {id: req.params.id}});
                return res.status(200).json({  
                    results
                });
            }else{
                return res.status(401).json({message: 'Token inválido'});
            }
        }catch{
            console.log(error)
        }
}