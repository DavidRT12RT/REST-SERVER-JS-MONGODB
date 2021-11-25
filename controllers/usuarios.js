const {response,request} = require('express');
const bcryptjs = require('bcryptjs'); //Paquete para encriptar contraseñas
const Usuario = require('../models/usuario'); //Modelo para guardar en la coleción

//**Controlador de nuestro programa de la ruta**
//Hay gente que llama al archivo usuarios.controller.js para especificar que es el controlador de la ruta

const usuariosGet = async (req=request,res=response)=>{
    //Obteniendo los parametros opcionales (/?)
    //const {q,nombre="No Name",apikey} = req.query;
    //Los elementos que vienen de la query son strings
    const {limite=5,desde=0} = req.query;

    //Ejecutara ambas promesas de manera simultanea
    const [total,usuarios]= await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        usuarios
    });
    }

const usuariosPut = async(req,res=response)=>{
    //const id = req.params.id;
    const {id} = req.params;
    const {_id,password,google,correo,...resto} = req.body;

    //TODO Validar contra base de datos
    if(password){
        //Encriptar la contraseña
        const salt=bcryptjs.genSaltSync();
        resto.password=bcryptjs.hashSync(password,salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json(usuario);
    }

const usuariosPost = async(req,res=response)=>{
  
    //Obtenemos el json que viene desde la web , tenemos que asegurarnos de limpiarlo por seguridad
    let{nombre,correo,password,rol}=req.body;//destructurado de objecto json
    correo=correo.toLowerCase();
    const usuario = new Usuario({nombre,correo,password,rol});  

    //Encriptar la contraseña
    const salt=bcryptjs.genSaltSync();
    usuario.password=bcryptjs.hashSync(usuario.password,salt);

    //Guardar en base de datos
    await usuario.save();
    res.json({
            usuario
        });
    }

const usuariosDelete = async(req,res=response)=>{
    const {id} = req.params;
    //Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    res.json({
        usuario
        });
    }
module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}