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
        mascota: {
            type: String,
            required: true,
            trim: true
        },
        fecha: {
            type: Date,
            required: true,
        }
    }
)

const Turnos = mongoose.model('Turnos', turnoSchema)

module.exports = Turnos