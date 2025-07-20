const express = require('express');
const router = express.Router();
const RolesController = require('../controllers/rolesController');

router.get('/', RolesController.listarRoles);

module.exports = router;
