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

const registrarUsuario = async (req, res) => {
  const { nombre, correo, id_rol } = req.body;

  if (!nombre || !correo || !id_rol) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
  }

  try {
    const nuevoUsuario = await UsuariosModel.registrarUsuario(nombre, correo, id_rol);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};
const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, id_rol } = req.body;

  if (!nombre || !correo || !id_rol) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
  }

  try {
    const usuarioActualizado = await UsuariosModel.actualizarUsuario(id, nombre, correo, id_rol);

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(usuarioActualizado);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ mensaje: 'Error al actualizar usuario' });
  }
};
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuarioEliminado = await UsuariosModel.eliminarUsuario(id);

    if (!usuarioEliminado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario eliminado correctamente', usuario: usuarioEliminado });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ mensaje: 'Error al eliminar usuario' });
  }
};


// ✅ Exporta ambos al final, UNA sola vez
module.exports = {
  listarUsuarios,
  registrarUsuario,
  actualizarUsuario,
  eliminarUsuario
};

