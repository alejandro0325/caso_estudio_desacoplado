const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now },
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
