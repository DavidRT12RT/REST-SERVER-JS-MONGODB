const {response, request, json} = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generarJWT");

const login =async(req=request,res=response)=>{

    const {correo,password} = req.body;
    try {
        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({//400 bad request
                msg:'Usuario / password no son correctos!'
            })
        }

        //Verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:"El estado del usuario es FALSO no tiene acceso..."
            })
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos'
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
            msg:"Hable con el administrador! (David)"
        });
        
    }
}


module.exports={
    login
}