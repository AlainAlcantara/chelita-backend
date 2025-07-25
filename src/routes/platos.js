// src/routes/platos.js
const express = require('express');
const router = express.Router();
const PlatosController = require('../controllers/platosController');

router.get('/', PlatosController.listarPlatos);
router.post('/', PlatosController.registrarPlato);
router.put('/:id', PlatosController.actualizarPlato);
router.delete('/:id', PlatosController.eliminarPlato);

module.exports = router;
