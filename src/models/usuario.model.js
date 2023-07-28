const mongoose = require("mongoose")

const usuarioSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            minLength: 8,
            maxLength: 20
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 10,
            maxLength: 128
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            minLength: 8,
            maxLength: 64
        },
        firstname: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 20
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 20
        },
        phone: {
            type: Number,
            required: true,
            trim: true,
            minLength: 8,
            maxLength: 13
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    }
)

const Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = Usuario