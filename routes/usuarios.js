//Third party imports
const {Router} = require('express');
const { check } = require('express-validator');
//Middleware personalizardo!
/*
const { validarJWT } = require('../middlewares/validar-jwt');
const {validarCampos}= require('../middlewares/validar-campos');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles'); */
const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');
//DB Validators
const {esRoleValido,emailExiste,usuarioExistePorId} = require('../helpers/db_validators');
//Controllers
const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete } = require('../controllers/usuarios');


const router = Router(); /*llamando la funcion , no estamos creando
una instancia por que no lleva new */
//Rutas de nuestro programa

router.get('/',usuariosGet);

router.put('/:id',[
    /*el check se da cuenta si son los parametros tipo : o ? */
    check('id','No es un ID valido!').isMongoId(),//Validacion propia de express validator 
    check('id').custom(usuarioExistePorId),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPut); // ( /: )Parametros obligatorios que se esperan en el enlace

router.post('/',[
    /*El check es un middleware de express-validator
    el express-validator es un conjunto de middlewares que checan los datos antes de llamar al controlador
    pero que es un middlware? es una funcion que se ejecuta antes que algo
    */
    check('nombre',"El nombre es obligatorio").not().isEmpty(),
    check('password',"El password debe de ser mas de 6 letras").isLength({min:6}),
    check('correo',"El correo no es valido!").isEmail(),
    check('correo').custom(emailExiste),
    //check('rol',"No es un rol valido!").isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido), //((rol)=>esRolValido(rol))
    //Cuando tenemos un callback el cual primer argumento es el mismo que estamos recibiendo podemos hacerlo mas corto como arriba
    validarCampos 
],usuariosPost);

router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un ID valido!').isMongoId(),
    check('id').custom(usuarioExistePorId),
    validarCampos
],usuariosDelete);  








module.exports= router;