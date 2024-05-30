const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");
const { ValidationError } = require("sequelize");

router.get("/api/ciudades", async function (req, res, next) {
  let data = await db.ciudades.findAll({
    attributes: ["IdCiudad", "Nombre", "PaisId", "FechaCiudad"],
  });
  res.json(data);
});

router.get("/api/ciudades/:id", async function (req, res, next) {
  let data = await db.ciudades.findByPk(req.params.id);
  res.json(data);
});

router.post("/api/ciudades/", async (req, res) => {
  try {
    // Agregar registro de depuración para imprimir el cuerpo de la solicitud
    console.log("Cuerpo de la solicitud POST:", req.body);

    let data = await db.ciudades.create(req.body);
    res.json(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json(error.errors.map((e) => e.message));
    } else {
      res.status(500).json(error);
    }
  }
});

router.put("/api/ciudades/:id", async (req, res) => {
  try {
    let data = await db.ciudades.update(req.body, {
      where: { IdCiudad: req.params.id },
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

router.delete("/api/ciudades/:id", async (req, res) => {
  try {
    let data = await db.ciudades.destroy({
      where: { IdCiudad: req.params.id },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;
