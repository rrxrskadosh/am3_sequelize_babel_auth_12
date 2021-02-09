import { Users } from "../models/";
import { validateJWT } from "../middlewares/jwt";

//Get Users (Obtener todos los usuarios)
export const getUsers = async (req,res) => {
    // console.log(req.headers.authorization.split(" ")[1]);
    const tokenVerify = await validateJWT(req,res);
    //Si el Token es Valido me devuelve el Payload
    // console.log(results);
    try{
        if(tokenVerify){ //Si tokenVerify es valido pedimos TODOS los Usuarios con findAll y retornamos una respuesta de ESTADO 200 junto con los resultados
            const results = await Users.findAll();
            return res.status(200).json(results);
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
            return res.status(200).json(results);
        }else{
            return res.status(401).json({message: 'Token inválido'});
        }
    }catch{
        console.log(error)
    }
}