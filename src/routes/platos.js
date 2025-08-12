// src/routes/platos.js
const express = require('express');
const router = express.Router();
const C = require('../controllers/platosController');

/**
 * @swagger
 * /platos:
 *   get:
 *     summary: Lista platos (activos por defecto)
 *     tags: [Platos]
 *     parameters:
 *       - in: query
 *         name: id_categoria
 *         schema: { type: integer }
 *       - in: query
 *         name: estado
 *         schema: { type: string, enum: [activo, inactivo] }
 *       - in: query
 *         name: min
 *         schema: { type: number, format: float }
 *       - in: query
 *         name: max
 *         schema: { type: number, format: float }
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *         description: Busca por nombre o descripción
 *       - in: query
 *         name: incluir_inactivos
 *         schema: { type: string, enum: ["1"] }
 *         description: Si es "1", incluye inactivos
 *     responses:
 *       200:
 *         description: Platos listados
 *   post:
 *     summary: Crea plato
 *     tags: [Platos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/PlatoInput' }
 *     responses:
 *       201: { description: Plato creado }
 *       400: { description: Datos inválidos }
 */
router.get('/', C.listarPlatos);
router.post('/', C.registrarPlato);

/**
 * @swagger
 * /platos/{id}:
 *   put:
 *     summary: Actualiza plato
 *     tags: [Platos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/PlatoUpdate' }
 *     responses:
 *       200: { description: Plato actualizado }
 *       404: { description: No encontrado }
 */
router.put('/:id', C.actualizarPlato);

/**
 * @swagger
 * /platos/{id}/desactivar:
 *   put:
 *     summary: Desactiva plato (borrado lógico)
 *     tags: [Platos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Plato desactivado }
 *       404: { description: No encontrado }
 *
 * /platos/{id}/activar:
 *   put:
 *     summary: Activa plato
 *     tags: [Platos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Plato activado }
 *       404: { description: No encontrado }
 */
router.put('/:id/desactivar', C.desactivarPlato);
router.put('/:id/activar',   C.activarPlato);

module.exports = router;
