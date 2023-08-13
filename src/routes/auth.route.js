const { Router } = require("express");
const { check, header, validationResult } = require("express-validator");
const {
  registerUser,
  loginUser,
  verifyJWT,
} = require("../controllers/auth.controller");

const authRouter = Router();

const expressValidations = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400);
    return res.send({ errors: result.array() });
  }
  next();
};

// http://localhost:8000/auth/register

authRouter.post(
  "/register",
  [
    check("username", "Debe mandar nombre de usuario").notEmpty(),
    check("username", "Debe ser alphanumerico").isAlphanumeric(),
    check("password", "Debe mandar password de usuario").notEmpty(),
    check("password", "Debe ser alphanumerico").isAlphanumeric(),
    check("email", "Debe tener formato de mail").notEmpty(),
    check("email", "Debe tener formato de mail").isEmail(),
    check("firstname", "Debe mandar nombre").notEmpty().isString(),
    check("lastname", "Debe mandar nombre").notEmpty().isString(),
    check("phone", "Debe mandar telefono").notEmpty().isNumeric(),
  ],
  expressValidations,
  registerUser
);

// http://localhost:8000/auth/login
authRouter.post(
  "/login",
  [
    check("username", "Debe mandar nombre de usuario").notEmpty(),
    check("username", "Debe ser alphanumerico").isAlphanumeric(),
    check("password", "Debe mandar password de usuario").notEmpty(),
    check("password", "Debe ser alphanumerico").isAlphanumeric(),
  ],
  expressValidations,
  loginUser
);

module.exports = authRouter;
