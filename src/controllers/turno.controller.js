const Paciente = require("../models/turnos.model");


const crearTurno = async (req, res) => {
    try {
      const turno = new turno({
        detalle: req.body.detalle,
        veterinario: req.body.veterinario,
        idPaciente: req.body.idPaciente,
        fecha: req.body.fecha,
      });
      await turno.save();
      res.status(201).json({ message: `turno registrado ${req.body.idPaciente}` });
    } catch (error) {
      res.status(500).json({ massage: "algo salio mal" });
    }
  };


  module.exports = {
    crearTurno,
    
}