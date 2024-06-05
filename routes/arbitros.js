const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");
const { ValidationError } = require("sequelize");

router.get("/api/arbitros", async function (req, res, next) {
  let data = await db.arbitros.findAll({
    attributes: ["IdArbitro", "NombreApellido", "FechaNac", "Activo"],
  });
  res.json(data);
});

router.get("/api/arbitros/:id", async function (req, res, next) {
  let data = await db.arbitros.findByPk(req.params.id);
  res.json(data);
});

router.post("/api/arbitros/", async (req, res) => {
  try {
    // Agregar registro de depuración para imprimir el cuerpo de la solicitud
    console.log("Cuerpo de la solicitud POST:", req.body);

    let data = await db.arbitros.create(req.body);
    res.json(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json(error.errors.map((e) => e.message));
    } else {
      res.status(500).json(error);
    }
  }
});

router.put("/api/arbitros/:id", async (req, res) => {
  try {
    let data = await db.arbitros.update(req.body, {
      where: { IdArbitro: req.params.id },
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

router.delete("/api/arbitros/:id", async (req, res) => {
  try {
    let data = await db.arbitros.destroy({
      where: { IdArbitro: req.params.id },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;

