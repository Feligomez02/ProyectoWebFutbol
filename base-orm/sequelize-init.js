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
const alumnos = sequelize.define(
  "alumnos",
  {
    IdAlumno: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    NombreAlumno: {
      // todo evitar que string autocomplete con espacios en blanco, debería ser varchar sin espacios
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "NombreAlumno es requerido",
        },
        len: {
          args: [3, 30],
          msg: "NombreAlumno debe ser tipo caracteres, entre 3 y 30 de longitud",
        },
      },
    },
    FechaAlumno: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: {
          args: true,
          msg: "FechaAlumno debe ser tipo fecha",
        },
      },
    },
  },
  
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (alumnos, options) {
        if (typeof alumnos.NombreAlumno === "string") {
          alumnos.NombreAlumno = alumnos.NombreAlumno.toUpperCase().trim();
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
  alumnos,
};
