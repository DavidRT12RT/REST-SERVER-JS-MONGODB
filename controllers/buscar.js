const { response } = require("express");
const {ObjectId} = require('mongoose').Types;
const {Usuario,Categoria,Producto} = require('../models');
const coleccionesPermitidas = [
    'categorias',
    'productos',
    'usuarios',
    'roles',
];
const buscarUsuarios=async(termino='',res=response)=>{
    const esMongoID = ObjectId.isValid(termino);
    if(esMongoID){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results:(usuario)?[usuario]:[]
        });
    }
    //Haciendo una expresión regular del termino insensible de mayusculas o minusculas
    const regex = new RegExp(termino,'i');
    const usuarios = await Usuario.find({
        $or:[{nombre:regex},{correo:regex}],
        $and:[{estado:true}]//Tambien tiene que cumplir con estas condiciones
    });
    return res.json({
         results:usuarios
    });
}
const buscarCategorias=async(termino='',res=response)=>{
    const esMongoID=ObjectId.isValid(termino);
    if(esMongoID){
        const categoria=await Categoria.findById(termino);
        return res.json({
            results:(categoria)?[categoria]:[]
        });
    }
    //Expresion regular para hacer la busqueda de varias categorias insensible de mayuscula o minuscula
    const regex = new RegExp(termino,'i');
    const categorias = await Categoria.find({nombre:regex,estado:true});
    return res.json({
        results:(categorias)?[categorias]:[]
    });
}
const buscarProductos=async(termino='',res=response)=>{
    const esMongoID=ObjectId.isValid(termino);
    if(esMongoID){
        const producto=Producto.findById(termino).populate('categoria','nombre');
        return res.json({
            results:(producto)?[producto]:[]
        });
    }
    //Buscando por expresiones regulares las categorias
    const regex = new RegExp(termino,'i');
    const productos=await Producto.find({nombre:regex,estado:true}).populate('categoria','nombre');
    return res.json({
        results:(productos)?[productos]:[]
    });
}
const buscar=(req,res=response)=>{
    //El orden de como deestruturemos un objeto no son importante pero el nombre si lo es
    const {coleccion,termino}=req.params;
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg:`Las colecciones permitidas son :${coleccionesPermitidas}`
        });
    }
    switch (coleccion) {
       case 'categorias':
           buscarCategorias(termino,res);
           break;
        case 'productos':
            buscarProductos(termino,res);
            break;
        case 'usuarios':
            buscarUsuarios(termino,res);
            break;
        default:
            res.status(500).json({
                msg:'Se me olvido hacer esta busqueda'
            });
    }
}

module.exports={
    buscar
}