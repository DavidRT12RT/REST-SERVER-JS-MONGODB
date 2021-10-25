const {response,request} = require('express');
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
const usuariosPost = (req,res=response)=>{
    //Obtenemos el json que viene desde la web , tenemos que asegurarnos de limpiarlo por seguridad
    //const body = req.body;
    const {Nombre,edad,id,apellido}=req.body;
    res.json({
            msg:"post API controlador",
            Nombre,
            edad
        });
    }
const usuariosDelete = (request,response)=>{
    response.json({
        msg:"delete API"
        });
    }
module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}