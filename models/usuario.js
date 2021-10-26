/* MongoDB es una base de datos No relacional que guarda las cosas 
como objetos o documentos dentro de las colecciones que si venimos de una base relacional 
serian las tablas*/
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
        index:true,
        unique:true,
        sparse:true
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
        required:[true,'El rol es necesario!'],
        emun:['ADMIN_ROLE','USER_ROLE']
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
//Reescribiendo el metodo json
usuarioSchema.methods.toJSON = function(){
    //Sacando la version y password
    const {__v,password,...usuario} = this.toObject();
    //Operador rest
    return usuario
}
//Pedira el nombre del modelo a la cual le agregare una 's' y por ultimo el Schema
module.exports=model('Usuario',usuarioSchema);
//Exportando el modelo