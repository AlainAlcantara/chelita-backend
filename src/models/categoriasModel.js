// src/models/categoriasModel.js
const db = require('../config/db');

const obtenerCategorias = async () => {
  const resultado = await db.query('SELECT * FROM categorias');
  return resultado.rows;
};

module.exports = { obtenerCategorias };
