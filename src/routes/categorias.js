// src/routes/categorias.js
const express = require('express');
const router = express.Router();
const CategoriasController = require('../controllers/categoriasController');

router.get('/', CategoriasController.listarCategorias);
router.post('/', CategoriasController.registrarCategoria);
router.put('/:id', CategoriasController.actualizarCategoria);
router.delete('/:id', CategoriasController.eliminarCategoria);

module.exports = router;
