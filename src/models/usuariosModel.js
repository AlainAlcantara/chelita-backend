// src/models/usuariosModel.js
const db = require('../config/db');

const obtenerUsuarios = async (incluirInactivos = false) => {
  const sql = incluirInactivos
    ? 'SELECT * FROM usuarios ORDER BY id_usuario'
    : "SELECT * FROM usuarios WHERE estado='activo' ORDER BY id_usuario";
  const r = await db.query(sql);
  return r.rows;
};

const registrarUsuario = async (nombre, correo, id_rol) => {
  const r = await db.query(
    "INSERT INTO usuarios (nombre, correo, id_rol, estado) VALUES ($1,$2,$3,'activo') RETURNING *",
    [nombre, correo, id_rol]
  );
  return r.rows[0];
};

const actualizarUsuario = async (id, nombre, correo, id_rol, estado) => {
  const r = await db.query(
    'UPDATE usuarios SET nombre=$1, correo=$2, id_rol=$3, estado=COALESCE($4, estado) WHERE id_usuario=$5 RETURNING *',
    [nombre, correo, id_rol, estado, id]
  );
  return r.rows[0];
};

module.exports = { obtenerUsuarios, registrarUsuario, actualizarUsuario };
