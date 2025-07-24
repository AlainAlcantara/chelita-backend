// src/models/platosModel.js
const db = require('../config/db');

const obtenerPlatos = async () => {
  const resultado = await db.query('SELECT * FROM platos');
  return resultado.rows;
};

module.exports = { obtenerPlatos };
