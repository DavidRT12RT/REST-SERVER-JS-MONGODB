const {Router} = require('express');
const { check } = require('express-validator');
//Middleware personalizardo!
const {validarCampos}= require('../middlewares/validar-campos');
const {esRoleValido,emailExiste,usuarioExistePorId} = require('../helpers/db_validators');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');
const router = Router(); //llamando la funcion
//Rutas de nuestro programa

router.get('/',usuariosGet);

router.put('/:id',[
    check('id','No es un ID valido!').isMongoId(),
    check('id').custom(usuarioExistePorId),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPut); // ( /: )Parametros obligatorios que se esperan en el enlace

router.post('/',[
    //El check es un middleware de express-validator
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
    check('id','No es un ID valido!').isMongoId(),
    check('id').custom(usuarioExistePorId),
    validarCampos
],usuariosDelete);  








module.exports= router;