const Duenio = require("../models/duenio.model");

const crearDuenio = async (req, res) => {
  try {
    const duenio = new Duenio({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      dni: req.body.dni,
      email: req.body.email,
      telefono: req.body.telefono,
      pacientes: [],
    });
    await duenio.save();
    res.status(201).json(duenio);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "algo salio mal" });
  }
};

const findAllDuenios = async (req, res) => {
  try {
    const nombreRegex = new RegExp(req.query.nombre, "i");
    const dniRegex = new RegExp(req.query.dni, "i");
    const filters = {
      nombre: {
        $regex: nombreRegex,
      },
      dni: {
        $regex: dniRegex,
      },
    };
    const duenio = await Duenio.find(filters);

    res.json({ message: "duenio encontrado/s", data: duenio });
  } catch (error) {
    console.log(error);

    res.status(500).json({ massage: "algo salio mal!" });
  }
};

const buscarDuenioById = async (req, res) => {
  try {
    const duenio = await Duenio.findById(req.params.id).populate("pacientes");

    if (duenio === null) {
      res.status(404);
      return res.json({ message: "duenio no encontrado" });
    }

    res.json({ message: "FIND DUENIO BY ID", data: duenio });
  } catch (error) {
    res.status(500).json({ massage: "algo salio mal" });
  }
};

const actualizarDuenioById = async (req, res) => {
  try {
    const duenio = await Duenio.findById(req.params.id);

    if (duenio === null) {
      res.status(404);
      return res.json({ message: "DUENIO NO ENCONTRADO" });
    }

    await Duenio.findByIdAndUpdate(req.params.id, {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      dni: req.body.dni,
      email: req.body.email,
      telefono: req.body.telefono,
    });

    res.json({ message: "DUENIO ACTUALIZADO" });
  } catch (error) {
    res.status(500).json({ massage: "algo salio mal" });
  }
};

const borrarDuenioById = async (req, res) => {
  try {
    const duenio = await Duenio.findById(req.params.id);

    if (duenio === null) {
      res.status(404);
      return res.json({ message: "DUENIO NO ENCONTRADO" });
    }

    const filters = { _id: req.params.id };
    await Duenio.deleteOne(filters);

    res.json({ message: `DUENIO BORRADO ${duenio.nombre}` });
  } catch (error) {
    res.status(500).json({ massage: "algo salio mal" });
  }
};

module.exports = {
  crearDuenio,
  buscarDuenioById,
  actualizarDuenioById,
  borrarDuenioById,
  findAllDuenios,
};
