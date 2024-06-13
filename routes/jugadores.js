const express = require("express");
const router = express.Router();
const { Op} = require("sequelize");
const db = require("../base-orm/sequelize-init");
const { ValidationError } = require("sequelize");

router.get("/api/jugadores", async function (req, res, next) {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'obtiene todos los Articulos'
  // consulta de artículos con filtros y paginacion

  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }
  if (req.query.Activo != undefined && req.query.Activo !== "") {
    // true o false en el modelo, en base de datos es 1 o 0
    // convertir el string a booleano
    where.Activo = req.query.Activo === "true";
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.jugadores.findAndCountAll({
    attributes: [
      "IdJugador",
      "Nombre",
      "IdEquipo",
      "Activo",
      "FechaNacimiento",
    ],
    order: [["Nombre", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});
router.get("/api/jugadores/:id", async function (req, res, next) {
  let items = await db.jugadores.findOne({
    attributes: [
      "IdJugador",
      "Nombre",
      "IdEquipo",
      "Activo",
      "FechaNacimiento",
    ],
    where: { IdJugador: req.params.id },
  });
  res.json(items);
});

router.post("/api/jugadores/", async (req, res) => {
  try {
    // Agregar registro de depuración para imprimir el cuerpo de la solicitud
    console.log("Cuerpo de la solicitud POST:", req.body);

    let data = await db.jugadores.create(req.body);
    res.json(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json(error.errors.map((e) => e.message));
    } else {
      res.status(500).json(error);
    }
  }
});

router.put("/api/jugadores/:id", async (req, res) => {
  try {
    let data = await db.jugadores.update(req.body, {
      where: { IdJugador: req.params.id },
    });
    res.json(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json(error.errors.map((e) => e.message));
    } else {
      res.status(500).json(error);
    }
  }
});

router.delete('/api/jugadores/:id', async (req, res) => {
  try {
    const numFilasEliminadas = await db.jugadores.destroy({
      where: { IdJugador: req.params.id },
    });
    if (numFilasEliminadas === 1) {
      res.json({ message: 'Jugador eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Jugador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el Jugador' });
  }
});
module.exports = router;
