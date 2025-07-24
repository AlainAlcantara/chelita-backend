// src/routes/categorias.js
const express = require('express');
const router = express.Router();
const CategoriasController = require('../controllers/categoriasController');

router.get('/', CategoriasController.listarCategorias);

module.exports = router;
