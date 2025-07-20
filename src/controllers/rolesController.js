const RolesModel = require('../models/rolesModel');

const listarRoles = async (req, res) => {
  try {
    const roles = await RolesModel.obtenerRoles();
    res.json(roles);
  } catch (error) {
    console.error('Error al obtener roles:', error);
    res.status(500).json({ error: 'Error al obtener roles' });
  }
};

module.exports = {
  listarRoles
};