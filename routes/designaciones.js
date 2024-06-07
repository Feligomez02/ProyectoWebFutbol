const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");
const { ValidationError } = require("sequelize");

router.get("/api/designaciones", async function (req, res, next) {
  let data = await db.designaciones.findAll({
    attributes: ["IdDesignacion", "IdArbitro", "Confirmada", "FechaDesig"],
  });
  res.json(data);
});

router.get("/api/designaciones/:id", async function (req, res, next) {
  let data = await db.designaciones.findByPk(req.params.id);
  res.json(data);
});
  
router.post("/api/designaciones/", async (req, res) => {
  try {
    // Agregar registro de depuración para imprimir el cuerpo de la solicitud
    console.log("Cuerpo de la solicitud POST:", req.body);

    let data = await db.designaciones.create(req.body);
    res.json(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json(error.errors.map((e) => e.message));
    } else {
      res.status(500).json(error);
    }
  }
});

router.put("/api/designaciones/:id", async (req, res) => {
  try {
    let data = await db.designaciones.update(req.body, {
      where: { IdDesignacion: req.params.id },
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

router.delete("/api/designaciones/:id", async (req, res) => {
  try {
    let data = await db.designaciones.destroy({
      where: { IdDesignacion: req.params.id },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;
