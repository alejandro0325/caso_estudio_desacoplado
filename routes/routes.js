const express = require('express');
const router = express.Router();

// Ruta raíz ("/")
router.get('/', (req, res) => {
  res.send('¡Hola desde la ruta raíz!');
});

// Otras rutas...

module.exports = router;
