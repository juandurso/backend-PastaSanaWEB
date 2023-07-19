const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.json("Hello World!");
});

mongoose
  .connect(
    "mongodb+srv://juan_durso:123@cluster0.lwcspj1.mongodb.net/vet_patasana?retryWrites=true&w=majority"
  )
  .then(() => { 
    console.log("conectado a la DB")
    app.listen(port, () => {
      console.log(`Aplicacion ejecutandose en el puerto --> ${port}`)
    })
  }
  )
  .catch(() => console.log("Error al conectar a la DB"));


  