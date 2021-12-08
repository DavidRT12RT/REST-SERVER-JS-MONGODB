const {Schema,model} = require('mongoose');
const CategoriaSchema = Schema({
   nombre:{
       type:String,
       required:[true,'El nombre es obligatorio!'],
       unique:true
   },
   estado:{
       type:Boolean,
       default:true,
       required:true
   },
   usuario:{
       type:Schema.Types.ObjectId,//Es decir otro objecto que tenemos de mongo
       ref:'Usuario',//tener referencia de mi otro schema
       required:true
   }
});



CategoriaSchema.methods.toJSON=function(){
    const {__v,estado,...data}=this.toObject();
    return data
}
module.exports=model('Categoria',CategoriaSchema);