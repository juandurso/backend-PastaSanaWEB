const Duenio = require("../models/duenio.model")

const crearDuenio = async(req, res) => {
    const duenio = new Duenio({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono
    });
    await duenio.save()
    res.status(201).json({ message: `duenio registrado ${req.body.nombre}` });
}

module.exports = {
    crearDuenio
}