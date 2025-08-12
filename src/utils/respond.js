// Formato estándar:
// Éxito: { ok: true, mensaje, data? }
// Error:  { ok: false, mensaje, errores?/extra? }

function ok(res, data = null, mensaje = 'OK', status = 200) {
  const body = { ok: true, mensaje };
  if (data !== null) body.data = data;
  return res.status(status).json(body);
}

function fail(res, mensaje = 'Error', status = 400, extra = null) {
  const body = { ok: false, mensaje };
  if (extra) body.extra = extra; // detalles opcionales (validaciones, SQL, etc.)
  return res.status(status).json(body);
}

module.exports = { ok, fail };
