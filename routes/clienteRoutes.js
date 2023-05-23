const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Rutas de cliente
router.get('/clientes', clienteController.obtenerClientes);
router.post('/clientes', clienteController.crearCliente);
router.put('/clientes/:id', clienteController.actualizarCliente);
router.delete('/clientes/:id', clienteController.eliminarCliente);

module.exports = router;
