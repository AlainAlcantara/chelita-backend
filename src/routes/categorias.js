// src/routes/categorias.js
const express = require('express');
const router = express.Router();
const C = require('../controllers/categoriasController');

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Lista categorías (activos por defecto)
 *     tags: [Categorías]
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema: { type: string, enum: [activo, inactivo] }
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *         description: Busca por nombre o descripción
 *       - in: query
 *         name: incluir_inactivos
 *         schema: { type: string, enum: ["1"] }
 *         description: Si es "1", incluye inactivos
 *     responses:
 *       200: { description: Categorías listadas }
 *   post:
 *     summary: Crea categoría
 *     tags: [Categorías]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CategoriaInput' }
 *     responses:
 *       201: { description: Categoría creada }
 *       400: { description: Datos inválidos }
 */
router.get('/', C.listarCategorias);
router.post('/', C.registrarCategoria);

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Actualiza categoría
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CategoriaUpdate' }
 *     responses:
 *       200: { description: Categoría actualizada }
 *       404: { description: No encontrado }
 */
router.put('/:id', C.actualizarCategoria);

/**
 * @swagger
 * /categorias/{id}/desactivar:
 *   put:
 *     summary: Desactiva categoría (borrado lógico)
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Categoría desactivada }
 *       404: { description: No encontrado }
 *
 * /categorias/{id}/activar:
 *   put:
 *     summary: Activa categoría
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Categoría activada }
 *       404: { description: No encontrado }
 */
router.put('/:id/desactivar', C.desactivarCategoria);
router.put('/:id/activar',   C.activarCategoria);

module.exports = router;
