const mongoose = require("mongoose")

const pacienteSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 20
        },
        idDuenio: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Duenios'
        },
        especie: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 20
        },
        raza: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 20
        }
    }
)

const Pacientes = mongoose.model('Pacientes', pacienteSchema)

module.exports = Pacientes