// src/controllers/categoriasController.js
// src/controllers/categoriasController.js
const CategoriasModel = require('../models/categoriasModel');
const { setEstado } = require('../utils/estado');
const { requiredFields, isOneOf } = require('../utils/validations');
const { ok, fail } = require('../utils/respond');
const db = require('../config/db');

// GET /categorias (?incluir_inactivos=1)
const listarCategorias = async (req, res) => {
  try {
    const { estado, q, incluir_inactivos } = req.query;

    const where = [];
    const vals = [];
    let i = 1;

    if (incluir_inactivos !== '1') {
      where.push(`estado = 'activo'`);
    }
    if (estado) { where.push(`estado = $${i++}`); vals.push(estado); }
    if (q) {
      where.push(`(LOWER(nombre) LIKE $${i} OR LOWER(descripcion) LIKE $${i})`);
      vals.push(`%${String(q).toLowerCase()}%`);
      i++;
    }

    const sql = `SELECT * FROM categorias ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY id_categoria`;
    const { rows } = await db.query(sql, vals);

    return ok(res, rows, 'Categorías listadas');
  } catch (e) {
    console.error('listarCategorias:', e.message);
    return fail(res, 'Error al obtener categorías', 500);
  }
};


// POST /categorias
const registrarCategoria = async (req, res) => {
  const { nombre, descripcion } = req.body;

  const miss = requiredFields(req.body, ['nombre']);
  if (miss) return fail(res, miss, 400);

  try {
    const nueva = await CategoriasModel.registrarCategoria(nombre, descripcion || null);
    return ok(res, nueva, 'Categoría creada', 201);
  } catch (e) {
    console.error('registrarCategoria:', e.message);
    return fail(res, 'Error al registrar categoría', 500);
  }
};

// PUT /categorias/:id
const actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, estado } = req.body;

  const miss = requiredFields(req.body, ['nombre']);
  if (miss) return fail(res, miss, 400);

  if (estado && !isOneOf(estado, ['activo','inactivo'])) {
    return fail(res, 'Estado inválido', 400);
  }

  try {
    const upd = await CategoriasModel.actualizarCategoria(id, nombre, descripcion || null, estado);
    if (!upd) return fail(res, 'Categoría no encontrada', 404);
    return ok(res, upd, 'Categoría actualizada');
  } catch (e) {
    console.error('actualizarCategoria:', e.message);
    return fail(res, 'Error al actualizar categoría', 500);
  }
};

// PUT /categorias/:id/desactivar
const desactivarCategoria = async (req, res) => {
  try {
    const des = await setEstado({ tabla: 'categorias', pk: 'id_categoria', id: req.params.id, estado: 'inactivo' });
    if (!des) return fail(res, 'Categoría no encontrada', 404);
    return ok(res, des, 'Categoría desactivada');
  } catch (e) {
    console.error('desactivarCategoria:', e.message);
    return fail(res, 'Error al desactivar categoría', 500);
  }
};

// PUT /categorias/:id/activar
const activarCategoria = async (req, res) => {
  try {
    const act = await setEstado({ tabla: 'categorias', pk: 'id_categoria', id: req.params.id, estado: 'activo' });
    if (!act) return fail(res, 'Categoría no encontrada', 404);
    return ok(res, act, 'Categoría activada');
  } catch (e) {
    console.error('activarCategoria:', e.message);
    return fail(res, 'Error al activar categoría', 500);
  }
};

module.exports = {
  listarCategorias,
  registrarCategoria,
  actualizarCategoria,
  desactivarCategoria,
  activarCategoria
};
