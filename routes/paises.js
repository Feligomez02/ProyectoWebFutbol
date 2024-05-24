const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/paises", async function (req, res, next) {
  let data = await db.paises.findAll({
    attributes: ["IdPais", "Nombre", "Fecha"],
  });
  res.json(data);
});

module.exports = router;
