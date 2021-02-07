import jwt from "jsonwebtoken";

//Completar la funcion para generar un token JWT en base al usuario que ha iniciado sesion
export const generateJWT = (user) => {
    //SECRET KEY del Token y algoritmo de encriptacion
    const userObj = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    };
    const token = jwt.sign(userObj, process.env.SECRET_KEY, {algorithm: "HS384", expiresIn: "1h"});
    return token;
}

//Validar el token 
export const validateJWT = (req, res, next) => {
    // const tokenApproved = req.header('auth_token'); //Agregar header en Insomnia
    // if (!tokenApproved) return res.status(401).json({ error: 'Acceso denegado' });
    // try {
    //     const verified = jwt.verify(tokenApproved, process.env.SECRET_KEY);
    //     req.user = verified;
    //     next() // continuamos
    // } catch (error) {
    //     res.status(400).json({error: 'Token inválido'})
    // }
}