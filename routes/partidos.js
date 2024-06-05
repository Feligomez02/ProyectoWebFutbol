const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");
const { ValidationError } = require("sequelize");

router.get("/api/partidos", async function (req, res, next) {
  let data = await db.partidos.findAll({
    attributes: ["IdPartido", "NombrePartido", "FechaPartido", "ActivoPartido"],
  });
  res.json(data);
});

router.get("/api/partidos/:id", async function (req, res, next) {
  let data = await db.partidos.findByPk(req.params.id);
  res.json(data);
});

router.post("/api/partidos/", async (req, res) => {
  try {
    // Agregar registro de depuración para imprimir el cuerpo de la solicitud
    console.log("Cuerpo de la solicitud POST:", req.body);

    let data = await db.partidos.create(req.body);
    res.json(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json(error.errors.map((e) => e.message));
    } else {
      res.status(500).json(error);
    }
  }
});

router.put("/api/partidos/:id", async (req, res) => {
  try {
    let data = await db.partidos.update(req.body, {
      where: { IdPartido: req.params.id },
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

router.delete("/api/partidos/:id", async (req, res) => {
  try {
    let data = await db.partidos.destroy({
      where: { IdPartido: req.params.id },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;
