// src/models/categoriasModel.js
const db = require('../config/db');

const obtenerCategorias = async (incluirInactivos = false) => {
  const sql = incluirInactivos
    ? 'SELECT * FROM categorias ORDER BY id_categoria'
    : "SELECT * FROM categorias WHERE estado='activo' ORDER BY id_categoria";
  const r = await db.query(sql);
  return r.rows;
};

const registrarCategoria = async (nombre, descripcion) => {
  const r = await db.query(
    'INSERT INTO categorias (nombre, descripcion) VALUES ($1,$2) RETURNING *',
    [nombre, descripcion || null]
  );
  return r.rows[0];
};

const actualizarCategoria = async (id, nombre, descripcion, estado) => {
  const r = await db.query(
    'UPDATE categorias SET nombre=$1, descripcion=$2, estado=COALESCE($3, estado) WHERE id_categoria=$4 RETURNING *',
    [nombre, descripcion, estado, id]
  );
  return r.rows[0];
};

module.exports = { obtenerCategorias, registrarCategoria, actualizarCategoria };
