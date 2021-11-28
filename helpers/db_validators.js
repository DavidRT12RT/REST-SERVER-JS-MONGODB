const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol='')=>{
        const existeRol = await Role.findOne({rol});
        if(!existeRol){
            throw new Error(`El rol ${rol} no esta registrado en las base de datos!`);
        }
    }
const emailExiste = async(correo='')=>{
  //Verificar si el correo existe
    correo=correo.toLowerCase();
    const existeEmail = await Usuario.findOne({correo:correo});
    if(existeEmail){
        throw new Error(`El correo: ${correo} ya esta registrado!`);
    }
}

const usuarioExistePorId = async (id)=>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id ${id} NO existe!`);
    }
}
/*const passwordStrong=(password="")=>{
    //Verificar si el password es fuerte
    if(!password.includes("")){
        throw new Error("La contraseña debe de tener MAYUSCULAS y caracteres especiales");
    }
}*/
module.exports={
    esRoleValido,
    emailExiste,
    usuarioExistePorId
}