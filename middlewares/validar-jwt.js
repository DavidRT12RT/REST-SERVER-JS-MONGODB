//Un middlware no es mas que una simple función
const { response, request } = require('express');
const jwt=require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req=request,res=response,next)=>{

    const token = req.header('x-token');//obteniendo el token del header del fronted
    if(!token){
        return res.status(401).json({//401:UnAuthorized
            msg:'No hay token en la peticion!'
        })
    }
    //validando JWT 
    try {
       const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);

       //leer el usuario que corresponde al uid
       const usuario=await Usuario.findById(uid);
       
       //Verificar si el usuario existe
       if(!usuario){
           return res.status(401).json({
               msg:'Token no valido -usuario no existe en DB'
           })
       }

       //Verificar si el estado es true
       if(!usuario.estado){
           return res.status(401).json({
               msg:'Token no valido! -usuario con estado False'
           })
       }
       req.usuario=usuario;//Creando una nueva propiedad en el objecto request llamada usuario
       next();


   } catch (error) {
       console.log(error);
       res.status(401).json({
           msg:'Token no valido!'
       })
   } 
}

module.exports={
    validarJWT
}