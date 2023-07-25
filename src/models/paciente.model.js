const mongoose = require("mongoose")

const pacienteSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        especie: {
            type: String,
            required: true,
            trim: true
        },
        raza: {
            type: String,
            required: true,
            trim: true
        }
    }
)

const Pacientes = mongoose.model('Pacientes', pacienteSchema)

module.exports = Pacientes