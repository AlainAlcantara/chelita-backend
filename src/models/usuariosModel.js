// src/models/usuariosModel.js
const db = require('../config/db');

const obtenerUsuarios = async () => {
  const resultado = await db.query('SELECT * FROM usuarios');
  return resultado.rows;
};

module.exports = { obtenerUsuarios };
