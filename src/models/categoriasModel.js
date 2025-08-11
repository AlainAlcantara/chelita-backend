// src/models/categoriasModel.js
const db = require('../config/db');

const obtenerCategorias = async () => {
  const resultado = await db.query('SELECT * FROM categorias');
  return resultado.rows;
};

const registrarCategoria = async (nombre, descripcion) => {
  const resultado = await db.query(
    'INSERT INTO categorias (nombre, descripcion) VALUES ($1, $2) RETURNING *',
    [nombre, descripcion]
  );
  return resultado.rows[0];
};

const actualizarCategoria = async (id, nombre, descripcion) => {
  const resultado = await db.query(
    'UPDATE categorias SET nombre = $1, descripcion = $2 WHERE id_categoria = $3 RETURNING *',
    [nombre, descripcion, id]
  );
  return resultado.rows[0];
};

const eliminarCategoria = async (id) => {
  const resultado = await db.query(
    'UPDATE categorias SET estado = $1 WHERE id_categoria = $2 RETURNING *',
    ['inactivo', id]
  );
  return resultado.rows[0];
};

module.exports = {
  obtenerCategorias,
  registrarCategoria,
  actualizarCategoria,
  eliminarCategoria
};
