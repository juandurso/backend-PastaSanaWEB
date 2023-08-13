const express = require("express");
const mongoose = require("mongoose");
const turnosRouter = require("./src/routes/turno.route");
const Usuario = require("./src/models/usuario.model");
const duenioRouter = require("./src/routes/duenio.route");
const pacienteRouter = require("./src/routes/paciente.route");
const authRouter = require("./src/routes/auth.route");
const bcrypt = require("bcrypt");
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const app = express();
const port = process.env.PORT;
app.use(express.json({ limit: "5mb" }));
app.use(cors())

// http://localhost:8000/turnos
app.use("/turnos", turnosRouter);
app.use("/duenio", duenioRouter);
app.use("/paciente", pacienteRouter);
app.use("/auth", authRouter);

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    console.log("conectado a la DB");
    Usuario.find().then((usuarios) => {
      if (usuarios.length === 0) {
        const salt = bcrypt.genSaltSync(5);
        const hashedPassword = bcrypt.hashSync("adminadmin", salt);
        const usuario = new Usuario({
          username: "adminadmin",
          password: hashedPassword,
          email: "admin@admin",
          firstname: "juan ignacio",
          lastname: "durso",
          phone: 3816105817,
          isAdmin: true,
        });

        usuario.save();
      }
    });
    app.listen(port, () => {
      console.log(`Aplicacion ejecutandose en el puerto --> ${port}`);
    });
  })
  .catch(() => console.log("Error al conectar a la DB"));
