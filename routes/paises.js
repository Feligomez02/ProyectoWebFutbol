const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");
const { ValidationError } = require("sequelize");

router.get("/api/paises", async function (req, res, next) {
  let data = await db.paises.findAll({
    attributes: ["IdPais", "Nombre", "Fecha"],
  });
  res.json(data);
});

router.get("/api/paises/:id", async function (req, res, next) {
  let data = await db.paises.findByPk(req.params.id);
  res.json(data);
});

router.post("/api/paises/", async (req, res) => {
  try {
    // Agregar registro de depuración para imprimir el cuerpo de la solicitud
    console.log("Cuerpo de la solicitud POST:", req.body);

    let data = await db.paises.create(req.body);
    res.json(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json(error.errors.map((e) => e.message));
    } else {
      res.status(500).json(error);
    }
  }
});

router.put("/api/paises/:id", async (req, res) => {
  try {
    let data = await db.paises.update(req.body, {
      where: { IdPais: req.params.id },
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

router.delete("/api/paises/:id", async (req, res) => {
  try {
    let data = await db.paises.destroy({
      where: { IdPais: req.params.id },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;

