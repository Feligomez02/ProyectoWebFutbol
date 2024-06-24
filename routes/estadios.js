const express = require("express");
const router = express.Router();
const { Op} = require("sequelize");
const db = require("../base-orm/sequelize-init");
const { ValidationError } = require("sequelize");

router.get("/api/estadios", async function (req, res, next) {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'obtiene todos los Articulos'
  // consulta de artículos con filtros y paginacion

  let where = {};
  if (req.query.NombreEstadio != undefined && req.query.NombreEstadio !== "") {
    where.NombreEstadio = {
      [Op.like]: "%" + req.query.NombreEstadio + "%",
    };
  }
  if (req.query.ActivoEstadio != undefined && req.query.ActivoEstadio !== "") {
    // true o false en el modelo, en base de datos es 1 o 0
    // convertir el string a booleano
    where.ActivoEstadio = req.query.ActivoEstadio === "true";
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.estadios.findAndCountAll({
    attributes: [
      "IdEstadio",
      "NombreEstadio",
      "PartidoId",
      "ActivoEstadio",
      "FechaEstadio",
    ],
    order: [["NombreEstadio", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});
router.get("/api/estadios/:id", async function (req, res, next) {
  let items = await db.estadios.findOne({
    attributes: [
      "IdEstadio",
      "NombreEstadio",
      "PartidoId",
      "ActivoEstadio",
      "FechaEstadio"
    ],
    where: { IdEstadio: req.params.id },
  });
  res.json(items);
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
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'elimina un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo..' }

  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.estadios.destroy({
      where: { IdEstadio: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja lógica
    try {
      let data = await db.sequelize.query(
        "UPDATE estadios SET ActivoEstadio = case when ActivoEstadio = 1 then 0 else 1 end WHERE IdEstadio = :IdEstadio",
        {
          replacements: { IdEstadio: +req.params.id },
        }
      );
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validación, los devolvemos
        const messages = err.errors.map((x) => x.message);
        res.status(400).json(messages);
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
  }
});
module.exports = router;
