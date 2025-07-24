// src/controllers/platosController.js
const PlatosModel = require('../models/platosModel');

const listarPlatos = async (req, res) => {
  try {
    const platos = await PlatosModel.obtenerPlatos();
    res.json(platos);
  } catch (error) {
    console.error('Error al listar platos:', error);
    res.status(500).json({ mensaje: 'Error al obtener platos' });
  }
};

module.exports = { listarPlatos };
