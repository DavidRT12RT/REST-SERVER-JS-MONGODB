const {Router} = require('express');
const {check} = require('express-validator');
const { validarJWT, validarCampos, esAdminRole, tieneRole} = require('../middlewares');
const {crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria} = require('../controllers/categorias');
const {existeCategoria} = require('../helpers/db_validators');
const router = Router();

//Obtener todas las categorias -publico
router.get('/',[
    validarJWT,
    tieneRole('ADMIN_ROLE','USER_ROLE'),
    validarCampos
],obtenerCategorias);

//Obtener una categoria en particular por id - publico
router.get('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE','USER_ROLE'),
    check('id','No es un ID valido!').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],obtenerCategoria);

//Crear una nueva categoria - privado - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    esAdminRole,
    check('nombre','El nombre es obligatorio!').not().isEmpty(),
    validarCampos
],crearCategoria);

//Actualizar - privado -cualquiera con token valido
router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('nombre','Nombre obligatorio!').not().isEmpty(),
    check('id').custom(existeCategoria),
    validarCampos
],actualizarCategoria);

//Borrar categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un ID Valido!').isMongoId(),
    check('id','Necesito el ID').not().isEmpty(),
    validarCampos
],borrarCategoria);


module.exports=router;