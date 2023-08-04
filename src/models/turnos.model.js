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
        // idPaciente: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        //     ref: 'Pacientes'
        // },
        // idDuenio: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        //     ref: 'Duenios'
        // },
        fecha: {
            type: Date,
            required: true,
        }
    }
)

const Turnos = mongoose.model('Turnos', turnoSchema)

module.exports = Turnos