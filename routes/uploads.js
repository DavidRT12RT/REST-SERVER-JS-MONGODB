const {Router} = require('express');
const {check} = require('express-validator');
const {coleccionesPermitidas} = require('../helpers');
//Controllers
const { cargarArchivo, actualizarImagen,mostrarImagen, actualizarImagenCloudinary} = require('../controllers/uploads');

//Middlewares
const { validarCampos,validarArchivo } = require('../middlewares/');

const router = Router(); //Creando instancia del router

router.post('/',validarArchivo,cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivo,
    check('id','El id debe ser de mongo!').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarImagenCloudinary);
//actualizarImagen

router.get('/:coleccion/:id',[
    check('id','El id debe ser de mongo!').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagen);
module.exports=router;