const { validationResult } = require('express-validator');
//Como es un middleware necesito poner un next para especificar si todo esta bien que siga!
const validarCampos=(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }    
    next();
}
module.exports={
    validarCampos
}