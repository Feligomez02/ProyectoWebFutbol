const express = require("express");

// crear servidor
const app = express();
app.use(express.json());
require("./base-orm/sqlite-init.js");  // crear base si no existe

const paisesRouter = require("./routes/paises");
app.use(paisesRouter);

const ciudadesRouter = require("./routes/ciudades");
app.use(ciudadesRouter);



// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial TP2");
});



if (!module.parent) {   // si no es llamado por otro módulo, es decir, si es el módulo principal -> levantamos el servidor
  const port = process.env.PORT || 3000;   // en producción se usa el puerto de la variable de entorno PORT
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}
module.exports = app; // para testing

