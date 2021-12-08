const Role = require('../models/role');
const {Usuario,Categoria, Producto} = require('../models');
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
const existeCategoria = async(id)=>{    
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){        
        throw new Error(`El id ${id} NO existe!`);
    }
}

const existeProducto = async(id)=>{
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`El id ${id} NO existe!`);
    }
}
module.exports={
    esRoleValido,
    emailExiste,
   usuarioExistePorId,
   existeCategoria,
   existeProducto,
}