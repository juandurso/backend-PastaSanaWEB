const mongoose = require("mongoose");

const pacienteSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 20,
  },
  especie: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 20,
  },
  raza: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 20,
  },
  turnos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Turnos",
    },
  ],
});

const Pacientes = mongoose.model("Pacientes", pacienteSchema);

module.exports = Pacientes;
