// src/models/estadosPedidoModel.js
const db = require('../config/db');

const obtenerEstadosPedido = async () => {
  const resultado = await db.query('SELECT * FROM estados_pedido');
  return resultado.rows;
};

module.exports = { obtenerEstadosPedido };
