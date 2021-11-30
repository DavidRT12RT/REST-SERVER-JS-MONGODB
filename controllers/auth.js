const {response, request, json} = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generarJWT");
const { googleverify } = require("../helpers/google-verify");
const { DefaultTransporter } = require("google-auth-library");

const login =async(req=request,res=response)=>{

    const {correo,password} = req.body;
    try {
        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({//400 bad request
                msg:'Usuario / password no son correctos! -correo'
            })
        }

        //Verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario / password no son correctos -estado:false'
            })
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos -estado:contraseña'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

     res.json({
         usuario,
         token
        });     

    } catch (error) {
        console.log(error);
        return res.status(500).json({//500 internal server error
            msg:"Hable con el administrador!"
        });
        
    }
}

const googleSignIn=async(req=request,res=response)=>{

    const {id_token} = req.body;
    try {
        const {nombre,img,correo}= await googleverify(id_token);

        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            //el usuario NO existe y Tengo que crearlo ya 
            const data = {
                nombre,
                correo,
                rol:'USER_ROLE',
                password:':P',
                img,
                google:true
            };
            usuario=new Usuario(data);
            await usuario.save();
        }

        //Si el usuario en DB
        if(!usuario.estado){
            return res.status(401).json({
                msg:'Hable con el administrador , usuario bloqueado!'
            });
        }
         //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });    

    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'El token no se pudo verificar!'
        });
        
    }
}

module.exports={
    login,
    googleSignIn
}