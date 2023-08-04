const Paciente = require("../models/paciente.model");
const Duenio = require("../models/duenio.model");

const crearPaciente = async (req, res) => {
  try {
    const duenioExiste = await Duenio.findById(req.body.idDuenio);

    if (!duenioExiste)
      return res.status(404).json({ message: "No existe el duenio" });

    const paciente = new Paciente({
      nombre: req.body.nombre,
      especie: req.body.especie,
      raza: req.body.raza,
    });
    await paciente.save();

    await Duenio.findByIdAndUpdate(
      req.body.idDuenio,
      { $push: { pacientes: paciente._id } },
      { new: true }
    );

    res.status(201).json(paciente);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "algo salio mal!" });
  }
};

const findAllPacientes = async (req, res) => {
  const nombreRegex = new RegExp(req.query.nombre, "i");
  const razaRegex = new RegExp(req.query.raza, "i");
  const filters = {
    nombre: {
      $regex: nombreRegex,
    },
    raza: {
      $regex: razaRegex,
    },
  };
  const paciente = await Paciente.find(filters);

  res.json({ message: "paciente encontrado/s", data: paciente });
};

const buscarPacienteById = async (req, res) => {
  const paciente = await Paciente.findById(req.params.id).populate("turnos");

  if (paciente === null) {
    res.status(404);
    return res.json({ message: "Paciente no encontrado" });
  }

  res.json({ message: "FIND PACIENTE BY ID", data: paciente });
};

const actualizarPacienteById = async (req, res) => {
  const paciente = await Paciente.findById(req.params.id);

  if (paciente === null) {
    res.status(404);
    return res.json({ message: "PACIENTE NO ENCONTRADO" });
  }

  await Paciente.findByIdAndUpdate(req.params.id, {
    nombre: req.body.nombre,
    especie: req.body.especie,
    raza: req.body.raza,
  });

  res.json({ message: "PACIENTE ACTUALIZADO" });
};

const borrarPacienteById = async (req, res) => {
  const paciente = await Paciente.findById(req.params.id);

  if (paciente === null) {
    res.status(404);
    return res.json({ message: "PACIENTE NO ENCONTRADO" });
  }

  const filters = { _id: req.params.id };
  await Paciente.deleteOne(filters);

  res.json({ message: `PACIENTE BORRADO ${duenio.nombre}` });
};

module.exports = {
  crearPaciente,
  findAllPacientes,
  buscarPacienteById,
  actualizarPacienteById,
  borrarPacienteById,
};
