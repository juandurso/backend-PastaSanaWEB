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

const findAllDuenios = async (req, res) => {
    const nombreRegex = new RegExp(req.query.nombre, "i");
    const emailRegex = new RegExp(req.query.email, "i");
    const filters = {
      nombre: {
        $regex: nombreRegex,
      },
      email: {
        $regex: emailRegex,
      },
    };
    const duenio = await Duenio.find(filters);

  res.json({ message: "duenio encontrado/s", data: duenio });
};

const buscarDuenioById = async (req, res) => {
    const duenio = await Duenio.findById(req.params.id);
  
    if (duenio === null) {
      res.status(404)
      return res.json({ message: "duenio no encontrado" })
    }
  
    res.json({ message: "FIND DUENIO BY ID", data: duenio });
  };

  const actualizarDuenioById = async (req, res) => {
    const duenio = await Duenio.findById(req.params.id);
  
    if (duenio === null) {
      res.status(404)
      return res.json({ message: "DUENIO NO ENCONTRADO" })
    }
  
    await Duenio.findByIdAndUpdate(req.params.id, {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono
    })
  
    res.json({ message: "DUENIO ACTUALIZADO" });
  };

  const borrarDuenioById = async (req, res) => {
    const duenio = await Duenio.findById(req.params.id);
  
    if (duenio === null) {
      res.status(404)
      return res.json({ message: "DUENIO NO ENCONTRADO" })
    }
  
    const filters = { _id: req.params.id }
    await Duenio.deleteOne(filters)
  
    res.json({ message: `DUENIO BORRADO ${duenio.nombre}`});
  };

module.exports = {
    crearDuenio,
    buscarDuenioById,
    actualizarDuenioById,
    borrarDuenioById,
    findAllDuenios
}