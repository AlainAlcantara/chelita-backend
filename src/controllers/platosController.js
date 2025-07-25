// src/controllers/platosController.js
const PlatosModel = require('../models/platosModel');

const listarPlatos = async (req, res) => {
  try {
    const platos = await PlatosModel.obtenerPlatos();
    res.json(platos);
  } catch (error) {
    console.error('Error al obtener platos:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const registrarPlato = async (req, res) => {
  const { nombre, descripcion, precio, estado, id_categoria } = req.body;
  if (!nombre || !descripcion || !precio || !estado || !id_categoria) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
  }

  try {
    const nuevo = await PlatosModel.registrarPlato(nombre, descripcion, precio, estado, id_categoria);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al registrar plato:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const actualizarPlato = async (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion, precio, estado, id_categoria } = req.body;

  try {
    const actualizado = await PlatosModel.actualizarPlato(id, nombre, descripcion, precio, estado, id_categoria);
    res.json(actualizado);
  } catch (error) {
    console.error('Error al actualizar plato:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const eliminarPlato = async (req, res) => {
  const id = req.params.id;

  try {
    const platoDesactivado = await PlatosModel.eliminarPlato(id);

    if (!platoDesactivado) {
      return res.status(404).json({ mensaje: 'Plato no encontrado' });
    }

    res.json({ mensaje: 'Plato desactivado correctamente', plato: platoDesactivado });
  } catch (error) {
    console.error('Error al desactivar plato:', error.message);
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

module.exports = {
  listarPlatos,
  registrarPlato,
  actualizarPlato,
  eliminarPlato
};
