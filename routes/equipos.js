const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");
const { ValidationError } = require("sequelize");

router.get("/api/equipos", async function (req, res, next) {
  let data = await db.equipos.findAll({
    attributes: ["IdEquipo", "Nombre", "FechaCreacion", "Activo"],
  });
  res.json(data);
});

router.get("/api/equipos/:id", async function (req, res, next) {
  let data = await db.equipos.findByPk(req.params.id);
  res.json(data);
});


router.post("/api/equipos/", async (req, res) => {
  try {
    // Agregar registro de depuración para imprimir el cuerpo de la solicitud
    console.log("Cuerpo de la solicitud POST:", req.body);

    let data = await db.equipos.create(req.body);
    res.json(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json(error.errors.map((e) => e.message));
    } else {
      res.status(500).json(error);
    }
  }
});

router.put("/api/equipos/:id", async (req, res) => {
  try {
    let data = await db.equipos.update(req.body, {
      where: { IdEquipo: req.params.id },
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

router.delete("/api/equipos/:id", async (req, res) => {
  try {
    let data = await db.equipos.destroy({
      where: { IdEquipo: req.params.id },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;

