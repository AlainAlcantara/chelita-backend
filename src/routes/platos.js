// src/routes/platos.js
const express = require('express');
const router = express.Router();
const PlatosController = require('../controllers/platosController');

router.get('/', PlatosController.listarPlatos);

module.exports = router;
