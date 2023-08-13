const { Router } = require("express");
const Turnos = require("../models/turnos.model");
const {
  crearTurno,
  findAllTurnos,
  buscarTurnoById,
  actualizarTurnoById,
  borrarTurnoById,
} = require("../controllers/turno.controller");
const { validationResult, body, param } = require("express-validator");

const turnosRouter = Router();
const expressValidations = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400);
    return res.send({ errors: result.array() });
  }
  next();
};

// CREATE http://localhost:8000/turnos/create
turnosRouter.post(
  "/create",
  [
    body("detalle")
      .notEmpty()
      .isString()
      .withMessage("Debe mandar detalle del turno"),
    body("veterinario")
      .notEmpty()
      .withMessage("Debe manda el veterinario asociado"),
      body("fecha")
      .notEmpty()
      .isString()
      .matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
      .withMessage('El formato de fecha y hora debe ser YYYY-MM-DDTHH:mm')
      .withMessage("debe mandar una fecha valida"),

  ],
  expressValidations,
  crearTurno
);

// READALL http://localhost:8000/turnos/find-all
turnosRouter.get("/find-all", findAllTurnos);

// http://localhost:8000/turnos/find-by-id/:id
turnosRouter.get(
  "/find-by-id/:id",
  [param("id").isMongoId().withMessage("Debe mandar un ID valido")],
  expressValidations,
  buscarTurnoById
);

// UPDATE http://localhost:8000/turnos/update-by-id/:id
turnosRouter.put(
  "/update-by-id/:id",
  [
    param("id").isMongoId().withMessage("Debe mandar un ID valido"),
    body("detalle")
      .optional()
      .isString()
      .withMessage("Debe mandar una descripcion"),
    body("veterinario")
      .optional()
      .isString()
      .withMessage("Debe mandar un veterinario"),
    body("fecha")
      .optional()
      .isString()
      .matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
      .withMessage('El formato de fecha y hora debe ser YYYY-MM-DDTHH:mm')
      .withMessage("debe mandar una fecha valida"),
      
  ],
  expressValidations,
  actualizarTurnoById
);

// DELETE http://localhost:8000/turnos/delete-by-id/:id
turnosRouter.delete(
  "/delete-by-id/:id",
  [param("id").isMongoId().withMessage("Debe mandar un ID valido")],
  expressValidations,
  borrarTurnoById
);

module.exports = turnosRouter;
