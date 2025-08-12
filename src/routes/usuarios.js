// src/routes/usuarios.js
const express = require('express');
const router = express.Router();
const C = require('../controllers/usuariosController');

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista usuarios (activos por defecto)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: id_rol
 *         schema: { type: integer }
 *       - in: query
 *         name: estado
 *         schema: { type: string, enum: [activo, inactivo] }
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *         description: Busca por nombre o correo
 *       - in: query
 *         name: incluir_inactivos
 *         schema: { type: string, enum: ["1"] }
 *         description: Si es "1", incluye inactivos
 *     responses:
 *       200:
 *         description: Usuarios listados
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/StandardOk' }
 *   post:
 *     summary: Crea usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/UsuarioInput' }
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/StandardOk' }
 *       400: { description: Datos inválidos }
 *       409: { description: Correo duplicado }
 */
router.get('/', C.listarUsuarios);
router.post('/', C.registrarUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualiza usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/UsuarioUpdate' }
 *     responses:
 *       200: { description: Usuario actualizado }
 *       404: { description: No encontrado }
 */
router.put('/:id', C.actualizarUsuario);

/**
 * @swagger
 * /usuarios/{id}/desactivar:
 *   put:
 *     summary: Desactiva usuario (borrado lógico)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Usuario desactivado }
 *       404: { description: No encontrado }
 *
 * /usuarios/{id}/activar:
 *   put:
 *     summary: Activa usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Usuario activado }
 *       404: { description: No encontrado }
 */
router.put('/:id/desactivar', C.desactivarUsuario);
router.put('/:id/activar',   C.activarUsuario);

module.exports = router;
