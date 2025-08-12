// src/models/platosModel.js
const db = require('../config/db');

const obtenerPlatos = async (incluirInactivos = false) => {
  const sql = incluirInactivos
    ? 'SELECT * FROM platos ORDER BY id_plato'
    : "SELECT * FROM platos WHERE estado='activo' ORDER BY id_plato";
  const r = await db.query(sql);
  return r.rows;
};

const registrarPlato = async (nombre, descripcion, precio, estado, id_categoria) => {
  const r = await db.query(
    'INSERT INTO platos (nombre, descripcion, precio, estado, id_categoria) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [nombre, descripcion, precio, estado || 'activo', id_categoria]
  );
  return r.rows[0];
};

const actualizarPlato = async (id, nombre, descripcion, precio, estado, id_categoria) => {
  const r = await db.query(
    'UPDATE platos SET nombre=$1, descripcion=$2, precio=$3, estado=COALESCE($4, estado), id_categoria=$5 WHERE id_plato=$6 RETURNING *',
    [nombre, descripcion, precio, estado, id_categoria, id]
  );
  return r.rows[0];
};

module.exports = { obtenerPlatos, registrarPlato, actualizarPlato };
