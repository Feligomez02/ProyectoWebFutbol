const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");
const { ValidationError } = require("sequelize");

router.get("/api/jugadores", async function (req, res, next) {
  try {
    let where = {};
       
    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 10;    
    const { count, rows } = await db.jugadores.findAndCountAll({
        attributes: [
          "IdJugador",
          "Nombre",
          "IdEquipo",
          "Activo",
          "FechaNacimiento",
        ],
        order: [["IdJugador", "ASC"]],
        where,
        offset: (Pagina - 1) * TamañoPagina,
        limit: TamañoPagina,
      });
    
      return res.json({ Items: rows, RegistrosTotal: count });  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los jugadores' });
      }
    })
router.get("/api/jugadores/:id", async function (req, res, next) {
  let data = await db.jugadores.findByPk(req.params.id);
  if (data === null) {
    res.status(404).json({ error: "No se encuentra el registro" });
    return;
  }
  res.json(data);
});

router.post("/api/jugadores/", async (req, res) => {
  try {
    // Agregar registro de depuración para imprimir el cuerpo de la solicitud
    console.log("Cuerpo de la solicitud POST:", req.body);

    let data = await db.jugadores.create(req.body);
    res.json(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json(error.errors.map((e) => e.message));
    } else {
      res.status(500).json(error);
    }
  }
});

router.put("/api/jugadores/:id", async (req, res) => {
  try {
    let data = await db.jugadores.update(req.body, {
      where: { IdJugador: req.params.id },
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

router.delete("/api/jugadores/:id", async (req, res) => {
  try {
    let data = await db.jugadores.destroy({
      where: { IdJugador: req.params.id },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;
