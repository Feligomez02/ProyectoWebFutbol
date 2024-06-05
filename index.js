const express = require("express");

// crear servidor
const app = express();
app.use(express.json());
require("./base-orm/sqlite-init.js");  // crear base si no existe

const equiposRouter = require("./routes/equipos");
app.use(equiposRouter);

const jugadoresRouter = require("./routes/jugadores");
app.use(jugadoresRouter);

const partidosRouter = require("./routes/partidos");
app.use(partidosRouter);

const arbitrosRouter = require("./routes/arbitros");
app.use(arbitrosRouter);

const estadiosRouter = require("./routes/estadios");
app.use(estadiosRouter);

const torneosRouter = require("./routes/torneos");
app.use(torneosRouter);

const resultadosRouter = require("./routes/resultados");
app.use(resultadosRouter);

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

