// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("sqlite:" + process.env.base );
const sequelize = new Sequelize("sqlite:" + "./.data/basetp.db");

// definicion del modelo de datos
const paises = sequelize.define(
  "paises",
  {
    IdPais: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      // todo evitar que string autocomplete con espacios en blanco, debería ser varchar sin espacios
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [3, 30],
          msg: "Nombre debe ser tipo caracteres, entre 3 y 30 de longitud",
        },
      },
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: {
          args: true,
          msg: "Fecha debe ser tipo fecha",
        },
      },
    },
  },
  
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (paises, options) {
        if (typeof paises.Nombre === "string") {
          paises.Nombre = paises.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);


const ciudades = sequelize.define(
  "ciudades",
  {
    IdCiudad: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [3, 60],
          msg: "Nombre debe ser tipo caracteres, entre 3 y 60 de longitud",
        },
      },
    },
    PaisId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "PaisId es requerido",
        }
      }
    },
    FechaCiudad: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: {
          args: true,
          msg: "FechaCiudad debe ser tipo fecha",
        },
      }
    }      
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (ciudades, options) {
        if (typeof ciudades.Nombre === "string") {
          ciudades.Nombre = ciudades.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);


module.exports = {
  sequelize,
  paises,
  ciudades,
};
