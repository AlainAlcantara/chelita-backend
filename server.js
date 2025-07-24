const express = require('express');
const app = express();
require('dotenv').config();

const db = require('./src/config/db');

db.query('SELECT NOW()')
  .then(res => console.log('🕓 Fecha y hora actual desde la base:', res.rows[0]))
  .catch(err => console.error('❌ Error al hacer consulta:', err));

app.use(express.json());

const rolesRoutes = require('./src/routes/roles');
const usuariosRoutes = require('./src/routes/usuarios');
const platosRoutes = require('./src/routes/platos');
const categoriasRoutes = require('./src/routes/categorias');
const estadosPedidoRoutes = require('./src/routes/estadosPedido');
app.use('/estados_pedido', estadosPedidoRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/platos', platosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/roles', rolesRoutes);
console.log('📢 Ruta /roles cargada');


// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Sistema Chelita funcionando desde backend 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
