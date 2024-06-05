const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");
const { ValidationError } = require("sequelize");

router.get("/api/resultados", async function (req, res, next) {
  let data = await db.resultados.findAll({
    attributes: ["IdResultado", "Descripcion", "TorneoId", "Activo", "FechaResultado"],
  });
  res.json(data);
});

router.get("/api/resultados/:id", async function (req, res, next) {
  let data = await db.resultados.findByPk(req.params.id);
  res.json(data);
});

router.post("/api/resultados/", async (req, res) => {
  try {
    // Agregar registro de depuración para imprimir el cuerpo de la solicitud
    console.log("Cuerpo de la solicitud POST:", req.body);

    let data = await db.resultados.create(req.body);
    res.json(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json(error.errors.map((e) => e.message));
    } else {
      res.status(500).json(error);
    }
  }
});

router.put("/api/resultados/:id", async (req, res) => {
  try {
    let data = await db.resultados.update(req.body, {
      where: { IdResultado: req.params.id },
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

router.delete("/api/resultados/:id", async (req, res) => {
  try {
    let data = await db.resultados.destroy({
      where: { IdResultado: req.params.id },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;