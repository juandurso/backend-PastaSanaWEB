const { Router } = require("express");
const {
  crearPaciente,
  findAllPacientes,
  buscarPacienteById,
  actualizarPacienteById,
  borrarPacienteById,
} = require("../controllers/paciente.controller");
const { validationResult, body, param } = require("express-validator");

const pacienteRouter = Router();

const expressValidations = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400);
    return res.send({ errors: result.array() });
  }
  next();
};

// CREATE http://localhost:8000/paciente/create
pacienteRouter.post(
  "/create",
  [
    body("nombre").notEmpty().withMessage("Debe mandar un nombre"),
    body("especie").notEmpty().withMessage("Debe mandar un apellido"),
    body("raza").notEmpty().withMessage("debe enviar una raza"),
  ],
  expressValidations,
  crearPaciente
);

// READALL http://localhost:8000/paciente/find-all
pacienteRouter.get("/find-all", findAllPacientes);

// READBYID http://localhost:8000/paciente/find-by-id/:id
pacienteRouter.get(
  "/find-by-id/:id",
  [param("id").isMongoId().withMessage("Debe mandar un ID valido")],
  expressValidations,
  buscarPacienteById
);

// UPDATE http://localhost:8000/paciente/update-by-id/:id
pacienteRouter.put(
  "/update-by-id/:id",
  [
    param("id").isMongoId().withMessage("Debe mandar un ID valido"),
    body("nombre").optional().isString().withMessage("Debe mandar un nombre"),
    body("especie")
      .optional()
      .isString()
      .withMessage("Debe mandar un apellido"),
    body("raza")
      .optional()
      .isEmail()
      .withMessage("debe mandar un email valido"),
  ],
  expressValidations,
  actualizarPacienteById
);

// DELETE http://localhost:8000/duenio/delete-by-id/:id
pacienteRouter.delete(
  "/delete-by-id/:id",
  [param("id").isMongoId().withMessage("Debe mandar un ID valido")],
  expressValidations,
  borrarPacienteById
);

module.exports = pacienteRouter;

