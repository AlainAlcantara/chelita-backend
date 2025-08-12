// src/controllers/platosController.js
// src/controllers/platosController.js
const PlatosModel = require('../models/platosModel');
const { setEstado } = require('../utils/estado');
const db = require('../config/db');
const { requiredFields, isPositiveNumber, isOneOf } = require('../utils/validations');
const { ok, fail } = require('../utils/respond');

// GET /platos (?incluir_inactivos=1)
const listarPlatos = async (req, res) => {
  try {
    const { id_categoria, estado, min, max, q, incluir_inactivos } = req.query;

    const where = [];
    const vals = [];
    let i = 1;

    if (incluir_inactivos !== '1') {
      where.push(`estado = 'activo'`);
    }
    if (id_categoria) { where.push(`id_categoria = $${i++}`); vals.push(Number(id_categoria)); }
    if (estado) { where.push(`estado = $${i++}`); vals.push(estado); }
    if (min) { where.push(`precio >= $${i++}`); vals.push(Number(min)); }
    if (max) { where.push(`precio <= $${i++}`); vals.push(Number(max)); }
    if (q) {
      where.push(`(LOWER(nombre) LIKE $${i} OR LOWER(descripcion) LIKE $${i})`);
      vals.push(`%${String(q).toLowerCase()}%`);
      i++;
    }

    const sql = `SELECT * FROM platos ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY id_plato`;
    const { rows } = await db.query(sql, vals);

    return ok(res, rows, 'Platos listados');
  } catch (e) {
    console.error('listarPlatos:', e.message);
    return fail(res, 'Error al obtener platos', 500);
  }
};


// POST /platos
const registrarPlato = async (req, res) => {
  const { nombre, descripcion, precio, estado, id_categoria } = req.body;

  const miss = requiredFields(req.body, ['nombre','descripcion','precio','id_categoria']);
  if (miss) return fail(res, miss, 400);

  if (!isPositiveNumber(precio)) return fail(res, 'El precio debe ser mayor a 0', 400);
  if (estado && !isOneOf(estado, ['activo','inactivo'])) return fail(res, 'Estado inválido', 400);

  try {
    const rCat = await db.query('SELECT 1 FROM categorias WHERE id_categoria=$1', [id_categoria]);
    if (rCat.rowCount === 0) return fail(res, 'La categoría no existe', 400);

    const nuevo = await PlatosModel.registrarPlato(
      nombre, descripcion, Number(precio), estado, id_categoria
    );
    return ok(res, nuevo, 'Plato creado', 201);
  } catch (e) {
    console.error('registrarPlato:', e.message);
    return fail(res, 'Error al registrar plato', 500);
  }
};

// PUT /platos/:id
const actualizarPlato = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, estado, id_categoria } = req.body;

  const miss = requiredFields(req.body, ['nombre','descripcion','precio','id_categoria']);
  if (miss) return fail(res, miss, 400);

  if (!isPositiveNumber(precio)) return fail(res, 'El precio debe ser mayor a 0', 400);
  if (estado && !isOneOf(estado, ['activo','inactivo'])) return fail(res, 'Estado inválido', 400);

  try {
    const rCat = await db.query('SELECT 1 FROM categorias WHERE id_categoria=$1', [id_categoria]);
    if (rCat.rowCount === 0) return fail(res, 'La categoría no existe', 400);

    const upd = await PlatosModel.actualizarPlato(
      id, nombre, descripcion, Number(precio), estado, id_categoria
    );
    if (!upd) return fail(res, 'Plato no encontrado', 404);
    return ok(res, upd, 'Plato actualizado');
  } catch (e) {
    console.error('actualizarPlato:', e.message);
    return fail(res, 'Error al actualizar plato', 500);
  }
};

// PUT /platos/:id/desactivar
const desactivarPlato = async (req, res) => {
  try {
    const des = await setEstado({ tabla: 'platos', pk: 'id_plato', id: req.params.id, estado: 'inactivo' });
    if (!des) return fail(res, 'Plato no encontrado', 404);
    return ok(res, des, 'Plato desactivado');
  } catch (e) {
    console.error('desactivarPlato:', e.message);
    return fail(res, 'Error al desactivar plato', 500);
  }
};

// PUT /platos/:id/activar
const activarPlato = async (req, res) => {
  try {
    const act = await setEstado({ tabla: 'platos', pk: 'id_plato', id: req.params.id, estado: 'activo' });
    if (!act) return fail(res, 'Plato no encontrado', 404);
    return ok(res, act, 'Plato activado');
  } catch (e) {
    console.error('activarPlato:', e.message);
    return fail(res, 'Error al activar plato', 500);
  }
};

module.exports = { listarPlatos, registrarPlato, actualizarPlato, desactivarPlato, activarPlato };
