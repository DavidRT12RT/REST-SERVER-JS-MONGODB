//Primer modelo de base de datos
const {Schema,model} = require('mongoose');

const usuarioSchema = Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio!']
    },
    correo:{
        type:String,
        required:[true,'El correo es obligatorio!'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'La contraseña es obligatoria!'],
    },
    img:{
        type:String,
    },
    rol:{
        type:String,
        required:[true,'El rol es requerido!'],
        enum:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
});

//Pedira el nombre del modelo a la cual le agregare una 's' y por ultimo el Schema
module.exports=model('Usuario',usuarioSchema);