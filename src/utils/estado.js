const db = require('../config/db');

async function setEstado({ tabla, pk, id, estado }) {
  const q = `UPDATE ${tabla} SET estado = $1 WHERE ${pk} = $2 RETURNING *`;
  const r = await db.query(q, [estado, id]);
  return r.rows[0] || null;
}

module.exports = { setEstado };
