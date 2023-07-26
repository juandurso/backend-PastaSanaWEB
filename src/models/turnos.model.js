const mongoose = require("mongoose")

const turnoSchema = mongoose.Schema(
    {
        detalle: {
            type: String,
            required: true,
            trim: true
        },
        veterinario: {
            type: String,
            required: true,
            trim: true
        },
        idDuenio: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Duenios'
        },
        idPaciente: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Pacientes'
        },
        fecha: {
            type: Date,
            required: true,
        }
    }
)

const Turnos = mongoose.model('Turnos', turnoSchema)

module.exports = Turnos