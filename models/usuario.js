/* MongoDB es una base de datos No relacional que guarda las cosas 
como objetos o documentos dentro de las colecciones que si venimos de una base relacional 
serian las tablas*/
//Primer modelo de base de datos
const {Schema,model} = require("mongoose");

const usuarioSchema = Schema({
    nombre:{
        type:String,
        required:[true,"El nombre es obligatorio!"]
    },
    correo:{
        type:String,
        required:[true,"El correo es obligatorio!"],
        index:true,
        unique:true,
        sparse:true
    },
    password:{
        type:String,
        required:[true,"La contraseña es obligatoria!"],
    },
    telefono:{
        type:String,
        unique:true
    },
    //Imagenes
    img:{
        //URL de la imagen del usuario
        type:String
    },
    actaNacimiento:{
        type:String
    },
    licenciaConducir:{
        type:String
    },
    INE:{
        type:String
    },
    diplomados:{
        type:String
    },
    cedula:{
        type:String
    },
    titulo:{
        type:String
    },
    comprobanteDomicilio:{
        type:String
    },
    //Cierra imagenes
    rol:{
        type:String,
        required:[true,"El rol es necesario!"],
        emun:["ADMIN_ROLE",'USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true,
    },
    NSS:{
        type:String,
        required:[true,"El numero de seguro social es necesario al momento de registrarse!"],
        unique:true
        //Con unique mongo no me permitira valores duplicados del campo
    },
    RFC:{
        type:String,
        required:[true,"El RFC es necesario al momento de registrarse!"],
        unique:true
    },
    CURP:{
        type:String,
        required:[true,"El CURP es necesario al momento de registrarse!"],
        unique:true
    },
    /*Podemos registrar una personalizada, pero si no por defecto 
    sera la que se haya hecho en ese momento
    */
    fechaRegistro:{
        type:Date,
        default:Date.now()
    }
});
//Reescribiendo el metodo json para imprimir
usuarioSchema.methods.toJSON = function(){
    const {__v,password,_id,...usuario} = this.toObject(); //Operador rest
    usuario.uid=_id;//creando una nueva propiedad llamada "uid" que viene de _id 
    return usuario
}
//Pedira el nombre del modelo a la cual le agregare una "s" y por ultimo el Schema
module.exports=model("Usuario",usuarioSchema);
//Exportando el modelo