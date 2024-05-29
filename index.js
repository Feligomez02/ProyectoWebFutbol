const express = require("express");

// crear servidor
const app = express();
app.use(express.json());
require("./base-orm/sqlite-init.js");  // crear base si no existe

const paisesRouter = require("./routes/paises");
app.use(paisesRouter);



// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial TP2");
});



// levantar servidor
const port = 3000;
app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
});
