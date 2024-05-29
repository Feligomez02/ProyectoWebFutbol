const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/paises", async function (req, res, next) {
  try {
    let data = await db.paises.findAll({
      attributes: ["IdPais", "Nombre", "Fecha"],
    });
    res.json(data);
  } catch (error) {
    console.log(error); // Add this line to show the error in the console
    next(error);
  }
});

module.exports = router;
