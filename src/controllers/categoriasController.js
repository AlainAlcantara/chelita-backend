// src/controllers/categoriasController.js
const CategoriasModel = require('../models/categoriasModel');

const listarCategorias = async (req, res) => {
  try {
    const categorias = await CategoriasModel.obtenerCategorias();
    res.json(categorias);
  } catch (error) {
    console.error('Error al obtener categorías:', error.message);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const registrarCategoria = async (req, res) => {
  const { nombre, descripcion } = req.body;

  if (!nombre) {
    return res.status(400).json({ mensaje: 'El nombre es obligatorio' });
  }

  try {
    const nueva = await CategoriasModel.registrarCategoria(nombre, descripcion);
    res.status(201).json(nueva);
  } catch (error) {
    console.error('Error al registrar categoría:', error.message);
    res.status(500).json({ mensaje: 'Error al registrar categoría' });
  }
};

const actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  try {
    const actualizada = await CategoriasModel.actualizarCategoria(id, nombre, descripcion);
    res.json(actualizada);
  } catch (error) {
    console.error('Error al actualizar categoría:', error.message);
    res.status(500).json({ mensaje: 'Error al actualizar categoría' });
  }
};

const eliminarCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    const desactivada = await CategoriasModel.eliminarCategoria(id);

    if (!desactivada) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    res.json({ mensaje: 'Categoría desactivada correctamente', categoria: desactivada });
  } catch (error) {
    console.error('Error al desactivar categoría:', error.message);
    res.status(500).json({ mensaje: 'Error al desactivar categoría' });
  }
};

module.exports = {
  listarCategorias,
  registrarCategoria,
  actualizarCategoria,
  eliminarCategoria
};
