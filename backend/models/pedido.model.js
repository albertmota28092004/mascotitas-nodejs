const mongoose = require('mongoose');
const Decimal128 = mongoose.Types.Decimal128;
const Schema = mongoose.Schema;
require('./usuario.model')
const Usuario = mongoose.model('Usuario');
const pedidoSchema = new mongoose.Schema({
    usuario: {
        type: Schema.ObjectId,
        ref: "Usuario",
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: new Decimal128(),
        required: true
    }
  });
  
  const Pedido = mongoose.model('Pedido', pedidoSchema);

  module.exports = Pedido;