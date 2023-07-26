const express = require("express");
const mongoose = require("mongoose");
const turnosRouter = require("./src/routes/turno.route")
const Usuario = require("./src/models/usuario.model");
const duenioRouter = require("./src/routes/duenio.route");
const pacienteRouter = require("./src/routes/paciente.route");


const app = express();
const port = 8000;
app.use(express.json({limit: "5mb"}))


// http://localhost:8000/turnos
app.use("/turnos", turnosRouter)
app.use("/duenio", duenioRouter)
app.use("/paciente", pacienteRouter)


mongoose.connect(
    "mongodb+srv://juan_durso:123@cluster0.lwcspj1.mongodb.net/prueba_vet?retryWrites=true&w=majority"
  )
  .then(() => { 
    console.log("conectado a la DB")
    Usuario.find().then((usuarios) => {
      if(usuarios.length === 0)
      {
        const usuario = new Usuario(
          {
            username: "adminadmin",
            password: "adminadmin",
            email: "admin@admin",
            firstname: "juan ignacio",
            lastname: "durso",
            phone: 3816105817,
            isAdmin: true
          }
        )
        usuario.save()
      }
    } )
    app.listen(port, () => {
      console.log(`Aplicacion ejecutandose en el puerto --> ${port}`)
    })
  }
  )
  .catch(() => console.log("Error al conectar a la DB"));


  