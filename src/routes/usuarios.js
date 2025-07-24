// src/routes/usuarios.js
const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/usuariosController');

router.get('/', UsuariosController.listarUsuarios);

module.exports = router;
