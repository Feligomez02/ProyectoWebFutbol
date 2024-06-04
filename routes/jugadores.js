const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");
const { ValidationError } = require("sequelize");

router.get("/api/jugadores", async function (req, res, next) {
  let data = await db.jugadores.findAll({
    attributes: ["IdJugador", "Nombre", "EquipoId", "Activo", "FechaNacimiento"],
  });
  res.json(data);
});

router.get("/api/jugadores/:id", async function (req, res, next) {
  let data = await db.jugadores.findByPk(req.params.id);
  res.json(data);
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

router.delete("/api/jugadores/:id", async (req, res) => {
  try {
    let data = await db.jugadores.destroy({
      where: { IdJugador: req.params.id },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;
