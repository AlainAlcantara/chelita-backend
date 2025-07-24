// src/controllers/estadosPedidoController.js
const EstadosPedidoModel = require('../models/estadosPedidoModel');

const listarEstadosPedido = async (req, res) => {
  try {
    const estados = await EstadosPedidoModel.obtenerEstadosPedido();
    res.json(estados);
  } catch (error) {
    console.error('Error al listar estados de pedido:', error);
    res.status(500).json({ mensaje: 'Error al obtener estados' });
  }
};

module.exports = { listarEstadosPedido };
