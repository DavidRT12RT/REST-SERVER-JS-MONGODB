const {Router} = require('express');
const { check } = require('express-validator');
//Middleware personalizardo!
const {validarCampos}=require('../middlewares/validar-campos');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');
const router = Router(); //llamando la funcion
//Rutas de nuestro programa

router.get('/',usuariosGet);
//Parametros obligatorios que se esperan en el enlace
router.put('/:id',usuariosPut);

router.post('/',[
    //El check es un middleware de express-validator
    check('nombre',"El nombre es obligatorio").not().isEmpty(),
    check('password',"El password debe de ser mas de 6 letras").isLength({min:6}),
    check('correo',"El correo no es valido!").isEmail(),
    check('rol',"No es un rol valido!").isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos 
],usuariosPost);

router.delete('/',usuariosDelete);  








module.exports= router;