const express = require('express');
const app = express();
require('dotenv').config();

const db = require('./src/config/db');

db.query('SELECT NOW()')
  .then(res => console.log('🕓 Fecha y hora actual desde la base:', res.rows[0]))
  .catch(err => console.error('❌ Error al hacer consulta:', err));

app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Sistema Chelita funcionando desde backend 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
