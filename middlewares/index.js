const validaCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/validar-roles');
/* Ahora tengo unas constantes que tienen todo lo que exportan estos archivos*/

module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validarRoles
}