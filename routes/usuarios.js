const {Router} = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');
const router = Router(); //llamando la funcion
//Rutas de nuestro programa
//funcion() = la invocas , funcion = solo haces referencia a ella
router.get('/',usuariosGet);

//Parametros obligatorios
router.put('/:id',usuariosPut);

router.post('/',usuariosPost);

router.delete('/',usuariosDelete);  








module.exports= router;