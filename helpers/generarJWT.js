/* Un JSON WEB TOKEN TIENE 3 CARACTERISTICAS PRINCIPALES
1.-Header = Información sobre que algoritmo se uso para incriptar la info
2.-Payload = Es sumamente volatil, cualquier persona
con un codigo va a poder abrir el JSONWEBTOKEN y ver que hay
NUNCA usar el JSONWT para almacenar contraseñas
, nada de tarjetas de credito
Solo almacenar información que da igual si alguien la da
3.-Firma
*/
const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') =>{//uid = User identifier
    return new Promise((resolve,reject) =>{
        const payload = {uid}
        //Generar un nuevo token!
        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn:'168h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se puede generar el token , checa las variables de entorno por la palabra secreta!')
            }else{
                resolve(token);
            }
        })
    });
}

module.exports={
    generarJWT
}