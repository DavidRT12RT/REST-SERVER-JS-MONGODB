const {response,request} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
//Controlador de nuestro programa
//Hay gente que llama al archivo usuarios.controller.js para especificar que es el controlador de la ruta
const usuariosGet = (req=request,res=response)=>{
    //Obteniendo los parametros opcionales (/?)
    const {q,nombre="No Name",apikey} = req.query;
    res.json({
        msg:"Get Api -controlador",
        q,
        nombre,
        apikey
        });
    }
const usuariosPut = (req,res=response)=>{
    //const id = req.params.id;
    const {id} = req.params;
    res.json({
        msg:"put Api controlador",
        id
        });
    }
const usuariosPost = async(req,res=response)=>{
  
    //Obtenemos el json que viene desde la web , tenemos que asegurarnos de limpiarlo por seguridad
    const {nombre,correo,password,rol}=req.body;
    const usuario = new Usuario({nombre,correo,password,rol});  
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo:correo});
    if(existeEmail){
        return res.status(400).json({
            msg:"El correo ya existe!"
        });
    }
    //Encriptar la contraseña
    const salt=bcryptjs.genSaltSync();
    usuario.password=bcryptjs.hashSync(password,salt);
    //Guardar en base de datos
    await usuario.save();
    res.json({
            usuario
        });
    }

const usuariosDelete = (request,res=response)=>{
    res.json({
        msg:"delete API"
        });
    }
module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}