const { Router } = require("express");
const {
  crearDuenio,
  actualizarDuenioById,
  borrarDuenioById,
  buscarDuenioById,
  findAllDuenios,
} = require("../controllers/duenio.controller");

const { validationResult ,body, param } = require("express-validator");

const duenioRouter = Router();

const expressValidations = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400)
        return res.send({ errors: result.array() });
    }
    next()
}

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
  expressValidations,
  crearDuenio
);

// READALL http://localhost:8000/duenio/find-all
duenioRouter.get("/find-all", findAllDuenios);

// READBYID http://localhost:8000/duenio/find-by-id/:id
duenioRouter.get(
  "/find-by-id/:id",
  [param("id").isMongoId().withMessage("Debe mandar un ID valido")],
  expressValidations,
  buscarDuenioById
);

// UPDATE http://localhost:8000/duenio/update-by-id/:id
duenioRouter.put(
  "/update-by-id/:id",
  [
    param("id").isMongoId().withMessage("Debe mandar un ID valido"),
    body("nombre").optional().isString().withMessage("Debe mandar un nombre"),
    body("apellido").optional().isString().withMessage("Debe mandar un apellido"),
    body("email").optional().isEmail().withMessage("debe mandar un email valido"),
    body("telefono").optional().isNumeric().withMessage("debe mandar un telefono valido"),
  ],
  expressValidations,
  actualizarDuenioById
);

// DELETE http://localhost:8000/duenio/delete-by-id/:id
duenioRouter.delete(
    "/delete-by-id/:id",
    [param("id").isMongoId().withMessage("Debe mandar un ID valido")],
    expressValidations,
    borrarDuenioById

  );

module.exports = duenioRouter;
