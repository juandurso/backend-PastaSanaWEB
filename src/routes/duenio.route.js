const { Router } = require("express");
const {
  crearDuenio,
  actualizarDuenioById,
  borrarDuenioById,
  buscarDuenioById,
  findAllDuenios,
} = require("../controllers/duenio.controller");
const { expressValidations } = require("../middlewares/common.validations");

const { body, param } = require("express-validator");

const duenioRouter = Router();

// CREATE http://localhost:8000/duenio/create

duenioRouter.post(
  "/create",
  [
    body("nombre").notEmpty().withMessage("Debe mandar un nombre"),
    body("apellido").notEmpty().withMessage("Debe mandar un apellido"),
    body("email").notEmpty().isEmail(),
    body("telefono").notEmpty(),
    // body("description", "Debe mandar un description").notEmpty(),
  ],
  
  crearDuenio
);

// READALL http://localhost:8000/duenio/find-all
duenioRouter.get("/find-all", findAllDuenios);

// READBYID http://localhost:8000/duenio/find-by-id/:id
duenioRouter.get(
  "/find-by-id/:id",
  [param("id").isMongoId().withMessage("Debe mandar un ID valido")],
  buscarDuenioById
);

// UPDATE http://localhost:8000/duenio/update-by-id/:id
duenioRouter.put(
  "/update-by-id/:id",
  [
    param("id").isMongoId().withMessage("Debe mandar un ID valido"),
    body("nombre").isString().withMessage("Debe mandar un nombre"),
    body("apellido").isString().withMessage("Debe mandar un apellido"),
    body("email").isEmail().withMessage("debe mandar un email valido"),
    body("telefono").isNumeric().withMessage("debe mandar un telefono valido"),
  ],
  actualizarDuenioById
);

// DELETE http://localhost:8000/duenio/delete-by-id/:id
duenioRouter.delete(
    "/delete-by-id/:id",
    [param("id").isMongoId().withMessage("Debe mandar un ID valido")],
    borrarDuenioById
  );

module.exports = duenioRouter;
