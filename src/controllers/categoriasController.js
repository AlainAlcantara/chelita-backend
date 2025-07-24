// src/controllers/categoriasController.js
const CategoriasModel = require('../models/categoriasModel');

const listarCategorias = async (req, res) => {
  try {
    const categorias = await CategoriasModel.obtenerCategorias();
    res.json(categorias);
  } catch (error) {
    console.error('Error al listar categorías:', error);
    res.status(500).json({ mensaje: 'Error al obtener categorías' });
  }
};

module.exports = { listarCategorias };
