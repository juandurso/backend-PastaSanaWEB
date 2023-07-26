const { Router } = require("express");
const {crearDuenio} = require("../controllers/duenio.controller")
const { expressValidations } = require("../middlewares/common.validations");


const duenioRouter = Router();

// CREATE http://localhost:8000/duenio/create

duenioRouter.post("/create",crearDuenio )

module.exports = duenioRouter
