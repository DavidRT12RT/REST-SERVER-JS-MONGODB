const {Router} = require('express');
const {check} = require('express-validator');
const {validarJWT, validarCampos, esAdminRole, tieneRole} = require('../middlewares');
const {existeProducto,existeCategoria} = require('../helpers/db_validators');
const router = Router();//Llamando a la funcion no estamos creando una instancia por que tendria que llevar new

const {obtenerProductos,obtenerProducto,crearProducto,actualizarProducto,borrarProducto} = require('../controllers/productos');

router.get('/',obtenerProductos);

router.get('/:id',[
    validarJWT,
    tieneRole,
    check('id','El ID es requerido').not().isEmpty(),
    check('id','No es un ID valido!').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],obtenerProducto);

router.post('/',[
    validarJWT,
    esAdminRole,
    check('nombre','El nombre es obligatorio!').not().isEmpty(),
    check('categoria','La categoria no es un ID valido').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
],crearProducto);

router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('id','El ID es requerido').not().isEmpty(),
    check('id','No es un ID valido!').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],actualizarProducto);

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','El ID es requerido'),
    check('id','No es un ID valido!').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],borrarProducto);

module.exports=router;