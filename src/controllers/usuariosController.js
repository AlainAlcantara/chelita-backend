// src/controllers/usuariosController.js
// src/controllers/usuariosController.js
const UsuariosModel = require('../models/usuariosModel');
const { setEstado } = require('../utils/estado');
const db = require('../config/db');
const { requiredFields, isValidEmail } = require('../utils/validations');
const { ok, fail } = require('../utils/respond');

// GET /usuarios (?incluir_inactivos=1)
const listarUsuarios = async (req, res) => {
  try {
    const { id_rol, estado, q, incluir_inactivos } = req.query;

    const where = [];
    const vals = [];
    let i = 1;

    // activos por defecto
    if (incluir_inactivos !== '1') {
      where.push(`estado = 'activo'`);
    }

    if (id_rol) { where.push(`id_rol = $${i++}`); vals.push(Number(id_rol)); }
    if (estado) { where.push(`estado = $${i++}`); vals.push(estado); }
    if (q) {
      where.push(`(LOWER(nombre) LIKE $${i} OR LOWER(correo) LIKE $${i})`);
      vals.push(`%${String(q).toLowerCase()}%`);
      i++;
    }

    const sql = `SELECT * FROM usuarios ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY id_usuario`;
    const { rows } = await db.query(sql, vals);

    return ok(res, rows, 'Usuarios listados');
  } catch (e) {
    console.error('listarUsuarios:', e.message);
    return fail(res, 'Error al obtener usuarios', 500);
  }
};


// POST /usuarios
const registrarUsuario = async (req, res) => {
  const { nombre, correo, id_rol } = req.body;

  const miss = requiredFields(req.body, ['nombre', 'correo', 'id_rol']);
  if (miss) return fail(res, miss, 400);

  if (!isValidEmail(correo)) {
    return fail(res, 'Correo no válido', 400);
  }

  try {
    // Rol existente
    const rRol = await db.query('SELECT 1 FROM roles WHERE id_rol=$1', [id_rol]);
    if (rRol.rowCount === 0) return fail(res, 'El id_rol no existe', 400);

    // Correo único
    const rMail = await db.query('SELECT 1 FROM usuarios WHERE correo=$1', [correo]);
    if (rMail.rowCount > 0) return fail(res, 'El correo ya está registrado', 409);

    const nuevo = await UsuariosModel.registrarUsuario(nombre, correo, id_rol);
    return ok(res, nuevo, 'Usuario creado', 201);
  } catch (e) {
    console.error('registrarUsuario:', e.message);
    return fail(res, 'Error al registrar usuario', 500);
  }
};

// PUT /usuarios/:id
const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, id_rol, estado } = req.body;

  const miss = requiredFields(req.body, ['nombre', 'correo', 'id_rol']);
  if (miss) return fail(res, miss, 400);

  if (!isValidEmail(correo)) {
    return fail(res, 'Correo no válido', 400);
  }

  try {
    const rRol = await db.query('SELECT 1 FROM roles WHERE id_rol=$1', [id_rol]);
    if (rRol.rowCount === 0) return fail(res, 'El id_rol no existe', 400);

    // Correo no duplicado en otro usuario
    const rMail = await db.query(
      'SELECT 1 FROM usuarios WHERE correo=$1 AND id_usuario<>$2',
      [correo, id]
    );
    if (rMail.rowCount > 0) return fail(res, 'El correo ya está en uso por otro usuario', 409);

    const upd = await UsuariosModel.actualizarUsuario(id, nombre, correo, id_rol, estado);
    if (!upd) return fail(res, 'Usuario no encontrado', 404);
    return ok(res, upd, 'Usuario actualizado');
  } catch (e) {
    console.error('actualizarUsuario:', e.message);
    return fail(res, 'Error al actualizar usuario', 500);
  }
};

// PUT /usuarios/:id/desactivar
const desactivarUsuario = async (req, res) => {
  try {
    const des = await setEstado({ tabla: 'usuarios', pk: 'id_usuario', id: req.params.id, estado: 'inactivo' });
    if (!des) return fail(res, 'Usuario no encontrado', 404);
    return ok(res, des, 'Usuario desactivado');
  } catch (e) {
    console.error('desactivarUsuario:', e.message);
    return fail(res, 'Error al desactivar usuario', 500);
  }
};

// PUT /usuarios/:id/activar
const activarUsuario = async (req, res) => {
  try {
    const act = await setEstado({ tabla: 'usuarios', pk: 'id_usuario', id: req.params.id, estado: 'activo' });
    if (!act) return fail(res, 'Usuario no encontrado', 404);
    return ok(res, act, 'Usuario activado');
  } catch (e) {
    console.error('activarUsuario:', e.message);
    return fail(res, 'Error al activar usuario', 500);
  }
};

module.exports = {
  listarUsuarios,
  registrarUsuario,
  actualizarUsuario,
  desactivarUsuario,
  activarUsuario
};
