// src/routes/usuarios.js
const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/usuariosController');

router.get('/', UsuariosController.listarUsuarios);
router.post('/', UsuariosController.registrarUsuario);
router.put('/:id', UsuariosController.actualizarUsuario);
router.delete('/:id', UsuariosController.eliminarUsuario);

module.exports = router;
