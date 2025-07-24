// src/controllers/usuariosController.js
const UsuariosModel = require('../models/usuariosModel');

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuariosModel.obtenerUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al listar usuarios:', error);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};

module.exports = { listarUsuarios };
