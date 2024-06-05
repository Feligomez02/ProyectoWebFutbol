const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");
const { ValidationError } = require("sequelize");

router.get("/api/torneos", async function (req, res, next) {
  let data = await db.torneos.findAll({
    attributes: ["IdTorneo", "Nombre", "FechaInicio", "Activo"],
  });
  res.json(data);
});

router.get("/api/torneos/:id", async function (req, res, next) {
  let data = await db.torneos.findByPk(req.params.id);
  res.json(data);
});

router.post("/api/torneos/", async (req, res) => {
  try {
    // Agregar registro de depuración para imprimir el cuerpo de la solicitud
    console.log("Cuerpo de la solicitud POST:", req.body);

    let data = await db.torneos.create(req.body);
    res.json(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json(error.errors.map((e) => e.message));
    } else {
      res.status(500).json(error);
    }
  }
});

router.put("/api/torneos/:id", async (req, res) => {
  try {
    let data = await db.torneos.update(req.body, {
      where: { IdTorneo: req.params.id },
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

router.delete("/api/torneos/:id", async (req, res) => {
  try {
    let data = await db.torneos.destroy({
      where: { IdTorneo: req.params.id },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;