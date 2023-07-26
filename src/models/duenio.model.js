const mongoose = require("mongoose")

const duenioSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 20
        },
        apellido: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 20
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            minLength: 8,
            maxLength: 64
        },
        telefono: {
            type: Number,
            required: true,
            trim: true,
            minLength: 8,
            maxLength: 13,
        }
    }
)

const Duenios = mongoose.model('Duenios', duenioSchema)

module.exports = Duenios