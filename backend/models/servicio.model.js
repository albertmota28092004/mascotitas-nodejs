const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const servicioSchema = new mongoose.Schema({
    nombre:  { 
        type: String,
        required: true
    }, 
    descripcion: { 
        type: String,
        required: true
    }
  });
  
  const Servicio = mongoose.model('Servicio', servicioSchema);
  
  // Exportar los modelos
  module.exports = Servicio;