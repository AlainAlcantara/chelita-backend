// src/models/platosModel.js
const db = require('../config/db');

const obtenerPlatos = async () => {
  const resultado = await db.query("SELECT * FROM platos WHERE estado = 'activo'");
  return resultado.rows;
};

const registrarPlato = async (nombre, descripcion, precio, estado, id_categoria) => {
  const resultado = await db.query(
    'INSERT INTO platos (nombre, descripcion, precio, estado, id_categoria) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [nombre, descripcion, precio, estado, id_categoria]
  );
  return resultado.rows[0];
};

const actualizarPlato = async (id, nombre, descripcion, precio, estado, id_categoria) => {
  const resultado = await db.query(
    'UPDATE platos SET nombre = $1, descripcion = $2, precio = $3, estado = $4, id_categoria = $5 WHERE id_plato = $6 RETURNING *',
    [nombre, descripcion, precio, estado, id_categoria, id]
  );
  return resultado.rows[0];
};

const eliminarPlato = async (id) => {
  const resultado = await db.query(
    'UPDATE platos SET estado = $1 WHERE id_plato = $2 RETURNING *',
    ['inactivo', id]
  );
  return resultado.rows[0]; // Devuelve el plato desactivado
};

module.exports = {
  obtenerPlatos,
  registrarPlato,
  actualizarPlato,
  eliminarPlato
};
