// src/models/usuariosModel.js
const db = require('../config/db');

const obtenerUsuarios = async () => {
  const resultado = await db.query('SELECT * FROM usuarios');
  return resultado.rows;
};

const registrarUsuario = async (nombre, correo, id_rol) => {
  const resultado = await db.query(
    'INSERT INTO usuarios (nombre, correo, id_rol) VALUES ($1, $2, $3) RETURNING *',
    [nombre, correo, id_rol]
  );
  return resultado.rows[0];
};
const actualizarUsuario = async (id, nombre, correo, id_rol) => {
  const resultado = await db.query(
    'UPDATE usuarios SET nombre = $1, correo = $2, id_rol = $3 WHERE id_usuario = $4 RETURNING *',
    [nombre, correo, id_rol, id]
  );
  return resultado.rows[0];
};
const eliminarUsuario = async (id) => {
  const resultado = await db.query(
    'DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *',
    [id]
  );
  return resultado.rows[0]; // Devuelve el eliminado o undefined si no existe
};


// ✅ Exporta ambos al final
module.exports = {
  obtenerUsuarios,
  registrarUsuario,
  actualizarUsuario,
  eliminarUsuario
};
