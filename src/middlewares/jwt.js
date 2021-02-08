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
// verify a token symmetric - synchronous (Cuando es una comunicación donde se necesita una API KEY de ambos lados [Cliente-Servidor])
export const validateJWT = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        return verified;
    } catch (error) {
        return null; //Se regresa la contra del verified, en este caso vacío.
    }
}



// const userAction = async () => { const response = await fetch('http://example.com/movies.json', 
// { method: 'POST', body: myBody, // string or object headers: { 'Content-Type': 'application/json' } }); 
//     const myJson = await response.json(); 
//     extract JSON from the http response 
//     do something with myJson }