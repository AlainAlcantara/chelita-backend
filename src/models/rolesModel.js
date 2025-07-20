const db = require('../config/db');

const obtenerRoles = async () => {
  const result = await db.query('SELECT * FROM roles ORDER BY id_rol');
  return result.rows;
};

module.exports = {
  obtenerRoles
};