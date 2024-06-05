// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("sqlite:" + process.env.base );
const sequelize = new Sequelize("sqlite:" + "./.data/basetp.db");

// definicion del modelo de datos
const equipos = sequelize.define(
  "equipos",
  {
    IdEquipo: {
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
    FechaCreacion: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: {
          args: true,
          msg: "FechaCreacion debe ser tipo fecha",
        },
      },
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Activo es requerido",
        },
      },
    },
  },
  
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (equipos, options) {
        if (typeof equipos.Nombre === "string") {
          equipos.Nombre = equipos.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);


const jugadores = sequelize.define(
  "jugadores",
  {
    IdJugador: {
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
    EquipoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "EquipoId es requerido",
        }
      }
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Activo es requerido",
        },
      },
    },
    FechaNacimiento: {
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
      beforeValidate: function (jugadores, options) {
        if (typeof jugadores.Nombre === "string") {
          jugadores.Nombre = jugadores.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);


// definicion del modelo de datos
const partidos = sequelize.define(
  "partidos",
  {
    IdPartido: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    NombrePartido: {
      // todo evitar que string autocomplete con espacios en blanco, debería ser varchar sin espacios
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "NombrPartido es requerido",
        },
        len: {
          args: [3, 30],
          msg: "NombrePartido debe ser tipo caracteres, entre 3 y 30 de longitud",
        },
      },
    },
    FechaPartido: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: {
          args: true,
          msg: "FechaPartido debe ser tipo fecha",
        },
      },
    },
    ActivoPartido: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "ActivoPartido es requerido",
        },
      },
    },
  },
  
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (partidos, options) {
        if (typeof partidos.NombrePartido === "string") {
          partidos.NombrePartido = partidos.NombrePartido.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);

// Definicion de modelo de datos 

const arbitros = sequelize.define(
  "arbitros",
  {
    IdArbitro: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    NombreApellido: {
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

    FechaNac: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: {
          args: true,
          msg: "Fecha debe ser tipo fecha",
        },
      },
    },
  
  Activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Activo es requerido",
      },
    },
  },
  },

  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (arbitros, options) {
        if (typeof arbitros.NombreApellido === "string") {
          arbitros.NombreApellido = arbitros.NombreApellido.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }

);



module.exports = {
  sequelize,
  equipos,
  jugadores,
  partidos,
  arbitros,
};
