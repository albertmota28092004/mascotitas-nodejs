const mongoose = require('mongoose');
const usuarioSchema = new mongoose.Schema({
    cedula: {
        type: Number,
        required: true,
        unique: [true, 'Tu cédula ya está registrada'],
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    nombreUsuario: {
        type: String,
        required: true,
        unique: [true, 'Tu usuario ya está registrado'],

    },
    contrasena: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: [true, 'Tu correo ya está registrado']
    },
    rol: {
        type: String,
        required: true
    }
  });
  
  const Usuario = mongoose.model('Usuario', usuarioSchema);

  module.exports = Usuario;