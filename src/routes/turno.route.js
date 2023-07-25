const {Router} = require("express")
const Turnos = require("../models/turnos.model")

const turnosRouter = Router()

    turnosRouter.get("/findAll", async (req,res) => {
        const turnos = await Turnos.find()
        res.status(200)
        res.json(turnos)
    })

    module.exports = turnosRouter