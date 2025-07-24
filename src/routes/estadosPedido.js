// src/routes/estadosPedido.js
const express = require('express');
const router = express.Router();
const EstadosPedidoController = require('../controllers/estadosPedidoController');

router.get('/', EstadosPedidoController.listarEstadosPedido);

module.exports = router;
