const Turnos = require("../models/turnos.model");
const Paciente = require("../models/paciente.model");

const crearTurno = async (req, res) => {
  try {
    const PacienteExiste = await Paciente.findById(req.body.idPaciente);

    if (!PacienteExiste)
      return res.status(404).json({ message: "No existe el Paciente" });

    const turno = new Turnos({
      detalle: req.body.detalle,
      veterinario: req.body.veterinario,
      fecha: req.body.fecha,
    });
    await turno.save();

    await Paciente.findByIdAndUpdate(
      req.body.idPaciente,
      { $push: { turnos: turno._id } },
      { new: true }
    );

    res.status(201).json(Paciente);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "algo salio mal!" });
  }
};

const findAllTurnos = async (req, res) => {
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

const buscarTurnoById = async (req, res) => {
  try {
    const turno = await Turnos.findById(req.params.id);

    if (turno === null) {
      res.status(404);
      return res.json({ message: "turno no encontrado" });
    }

    res.json({ message: "FIND TURNO BY ID", data: turno });
  } catch (error) {
    res.status(500).json({ massage: "algo salio mal" });
  }
};

const actualizarTurnoById = async (req, res) => {
  try {
    const turno = await Turnos.findById(req.params.id);

    if (turno === null) {
      res.status(404);
      return res.json({ message: "TURNO NO ENCONTRADO" });
    }

    await Turnos.findByIdAndUpdate(req.params.id, {
      descipcion: req.body.descipcion,
      veterinario: req.body.veterinario,
      fecha: req.body.fecha,
    });

    res.json({ message: "TURNO ACTUALIZADO" });
  } catch (error) {
    res.status(500).json({ massage: "algo salio mal" });
  }
};

const borrarTurnoById = async (req, res) => {
  try {
    const turno = await Turnos.findById(req.params.id);

    if (turno === null) {
      res.status(404);
      return res.json({ message: "TURNO NO ENCONTRADO" });
    }

    const filters = { _id: req.params.id };
    await Turnos.deleteOne(filters);

    res.json({ message: `TURNO BORRADO ${turno.fecha}` });
  } catch (error) {
    res.status(500).json({ massage: "algo salio mal" });
  }
};

module.exports = {
  crearTurno,
  findAllTurnos,
  buscarTurnoById,
  actualizarTurnoById,
  borrarTurnoById,
};
