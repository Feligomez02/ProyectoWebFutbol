const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");
const { ValidationError } = require("sequelize");

router.get("/api/alumnos", async function (req, res, next) {
  let data = await db.alumnos.findAll({
    attributes: ["IdAlumno", "NombreAlumno", "FechaAlumno"],
  });
  res.json(data);
});

router.get("/api/alumnos/:id", async function (req, res, next) {
  let data = await db.alumnos.findByPk(req.params.id);
  res.json(data);
});

router.post("/api/alumnos/", async (req, res) => {
  try {
    // Agregar registro de depuración para imprimir el cuerpo de la solicitud
    console.log("Cuerpo de la solicitud POST:", req.body);

    let data = await db.alumnos.create(req.body);
    res.json(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json(error.errors.map((e) => e.message));
    } else {
      res.status(500).json(error);
    }
  }
});

router.put("/api/alumnos/:id", async (req, res) => {
  try {
    let data = await db.alumnos.update(req.body, {
      where: { IdAlumno: req.params.id },
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

router.delete("/api/alumnos/:id", async (req, res) => {
  try {
    let data = await db.alumnos.destroy({
      where: { IdAlumno: req.params.id },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;