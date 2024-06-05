const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");
const { ValidationError } = require("sequelize");

router.get("/api/estadios", async function (req, res, next) {
  let data = await db.estadios.findAll({
    attributes: ["IdEstadio", "NombreEstadio", "PartidoId", "ActivoEstadio", "FechaEstadio"],
  });
  res.json(data);
});

router.get("/api/estadios/:id", async function (req, res, next) {
  let data = await db.estadios.findByPk(req.params.id);
  res.json(data);
});

router.post("/api/estadios/", async (req, res) => {
  try {
    // Agregar registro de depuración para imprimir el cuerpo de la solicitud
    console.log("Cuerpo de la solicitud POST:", req.body);

    let data = await db.estadios.create(req.body);
    res.json(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json(error.errors.map((e) => e.message));
    } else {
      res.status(500).json(error);
    }
  }
});

router.put("/api/estadios/:id", async (req, res) => {
  try {
    let data = await db.estadios.update(req.body, {
      where: { IdEstadio: req.params.id },
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

router.delete("/api/estadios/:id", async (req, res) => {
  try {
    let data = await db.estadios.destroy({
      where: { IdEstadio: req.params.id },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;