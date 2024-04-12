const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./servicio.model')
require('./usuario.model')
const Servicio = mongoose.model('Servicio');
const Usuario = mongoose.model('Usuario');
const Decimal128 = mongoose.Types.Decimal128;
const citaSchema = new mongoose.Schema({
  cliente: {
    type: Schema.ObjectId,
    ref: "Usuario",
    required: true
  },
  fechaHora: {
    type: Date,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  servicio: {
    type: Schema.ObjectId,
    ref: "Servicio",
    required: true
  }
});

const Cita = mongoose.model('Cita', citaSchema);

module.exports = Cita;
