const {response,request} = require('express');
const bcryptjs = require('bcryptjs'); //Paquete para encriptar contraseñas
const Usuario = require('../models/usuario'); //Modelo para guardar en la coleción

//**Controlador de nuestro programa de la ruta**
//Hay gente que llama al archivo usuarios.controller.js para especificar que es el controlador de la ruta

const usuariosGet = async (req=request,res=response)=>{
    //Obteniendo los parametros opcionales (/?) = localhost::8080/api/usuarios?limite=5
    //const {q,nombre="No Name",apikey} = req.query;
    //Los elementos que vienen de la query siempre son strings
    //const usuarios = await Usuario.find(); devuelve toda la coleccion de Usuarios

    const {limite=5,desde=0,nombre=""} = req.query;

    let query = {estado:true};

    if(nombre.length>0){
        //query={estado:true,nombre};
        query = {...query,nombre};
    }

    const [total,usuarios]= await Promise.all([ //Ejecutara ambas promesas de manera simultanea
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    /* La respuesta es una coleccion de las promesas*/
    res.json({
        total,
        usuarios
    });
    }

const usuariosPut = async(req,res=response)=>{
    //const id = req.params.id;
    const {id} = req.params;
    const {_id,password,correo,...resto} = req.body;
    
    if(password){
        //Si viene la contraseña la encriptamos y la actualizamos!
        const salt=bcryptjs.genSaltSync();
        resto.password=bcryptjs.hashSync(password,salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto,{new:true});
    //el metodo .findByIdAndUpdate aparte de encontrarlo tambien lo actualiza

    res.json(usuario);
    }

const usuariosPost = async(req,res=response)=>{
    
    //Obtenemos el json que viene desde la web , tenemos que asegurarnos de limpiarlo por seguridad
    let{nombre,password,correo,rol,RFC,NSS,CURP}=req.body;//destructurado de objecto json
    nombre=nombre.toLowerCase();
    correo=correo.toLowerCase();
    const usuario = new Usuario({nombre,password,correo,rol,RFC,NSS,CURP});  
    //Encriptar la contraseña
    const salt=bcryptjs.genSaltSync();//Primero hay que generar un salt 
    usuario.password=bcryptjs.hashSync(usuario.password,salt);
    //Guardar en base de datos
    await usuario.save();
    res.json({
            usuario
        });

    }

const usuariosDelete = async(req,res=response)=>{
    const {id} = req.params;
    //Fisicamente lo borramos const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false},{new:true});
    res.json(usuario);
    }
module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}