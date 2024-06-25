const express = require("express");
const router = express.Router();
const { Op} = require("sequelize");
const db = require("../base-orm/sequelize-init");
const { ValidationError } = require("sequelize");

router.get("/api/designaciones", async function (req, res, next) {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'obtiene todos los Articulos'
  // consulta de artículos con filtros y paginacion

  let where = {};
  if (req.query.Descripcion != undefined && req.query.Descripcion !== "") {
    where.Descripcion = {
      [Op.like]: "%" + req.query.Descripcion + "%",
    };
  }
  if (req.query.Confirmada != undefined && req.query.Confirmada !== "") {
    // true o false en el modelo, en base de datos es 1 o 0
    // convertir el string a booleano
    where.Confirmada = req.query.Confirmada === "true";
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.designaciones.findAndCountAll({
    attributes: [
      "IdDesignacion",
      "IdArbitro",
      "Descripcion",
      "Confirmada",
      "FechaDesig",
    ],
    order: [["Descripcion", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});
router.get("/api/designaciones/:id", async function (req, res, next) {
  let items = await db.designaciones.findOne({
    attributes: [
      "IdDesignacion",
      "IdArbitro",
      "Descripcion",
      "Confirmada",
      "FechaDesig",
    ],
    where: { IdDesignacion: req.params.id },
  });
  res.json(items);
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
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'elimina un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo..' }

  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.designaciones.destroy({
      where: { IdDesignacion: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja lógica
    try {
      let data = await db.sequelize.query(
        "UPDATE designaciones SET Confirmada = case when Confirmada = 1 then 0 else 1 end WHERE IdDesignacion = :IdDesignacion",
        {
          replacements: { IdDesignacion: +req.params.id },
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
