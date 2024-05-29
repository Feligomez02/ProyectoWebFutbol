
//Implementamos con sqlite3 porque aa-sqlite nos daba error.
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Establecer la ruta para el archivo de la base de datos fuera del directorio actual del script
const dbPath = path.join(__dirname, '../.data/basetp2.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al abrir la base de datos:', err.message);
  } else {
    console.log('Base de datos abierta exitosamente');
    initializeDatabase();
  }
});

function initializeDatabase() {
  // Verificar y crear la tabla 'usuarios' si no existe
  db.get("SELECT count(*) as contar FROM sqlite_schema WHERE type='table' AND name='usuarios'", (err, row) => {
    if (err) {
      console.error('Error al verificar la tabla usuarios:', err.message);
    } else if (row.contar === 0) {
      db.run(
        `CREATE TABLE usuarios (
          IdUsuario INTEGER PRIMARY KEY AUTOINCREMENT,
          Nombre TEXT NOT NULL UNIQUE,
          Clave TEXT NOT NULL,
          Rol TEXT NOT NULL
        );`,
        (err) => {
          if (err) {
            console.error('Error al crear la tabla usuarios:', err.message);
          } else {
            console.log("Tabla 'usuarios' creada!");
            db.run(
              `INSERT INTO usuarios (Nombre, Clave, Rol) VALUES
              ('admin', '123', 'admin'),
              ('pedro', '123', 'member'),
              ('felipe', '123', 'member'),
              ('simon', '123', 'member'),
              ('valentino', '123', 'member');`
            );
          }
        }
      );
    }
  });

  // Verificar y crear la tabla 'paises' si no existe
  db.get("SELECT count(*) as contar FROM sqlite_schema WHERE type='table' AND name='paises'", (err, row) => {
    if (err) {
      console.error('Error al verificar la tabla paises:', err.message);
    } else if (row.contar === 0) {
      db.run(
        `CREATE TABLE paises (
          IdPais INTEGER PRIMARY KEY AUTOINCREMENT,
          Nombre TEXT NOT NULL UNIQUE,
          Fecha DATE NOT NULL
        );`,
        (err) => {
          if (err) {
            console.error('Error al crear la tabla paises:', err.message);
          } else {
            console.log("Tabla 'paises' creada!");
            db.run(
              `INSERT INTO paises (Nombre, Fecha) VALUES
              ('Argentina', '2022-01-01'),
              ('Brasil', '2022-01-02'),
              ('Alemania', '2022-01-03'),
              ('USA', '2022-01-04'),
              ('Francia', '2022-01-05'),
              ('Canada', '2022-01-06'),
              ('Spain', '2022-01-07'),
              ('Chile', '2022-01-08'),
              ('Italia', '2022-01-09'),
              ('Inglaterra', '2022-01-10');`
            );
          }
        }
      );
    }
  });

  // Verificar y crear la tabla 'ciudades' si no existe
  db.get("SELECT count(*) as contar FROM sqlite_schema WHERE type='table' AND name='ciudades'", (err, row) => {
    if (err) {
      console.error('Error al verificar la tabla ciudades:', err.message);
    } else if (row.contar === 0) {
      db.run(
        `CREATE TABLE ciudades (
          IdCiudad INTEGER PRIMARY KEY AUTOINCREMENT,
          Nombre TEXT NOT NULL UNIQUE,
          FechaCiudad DATE NOT NULL,
          IdPais INTEGER NOT NULL,
          FOREIGN KEY (IdPais) REFERENCES paises(IdPais)
        );`,
        (err) => {
          if (err) {
            console.error('Error al crear la tabla ciudades:', err.message);
          } else {
            console.log("Tabla 'ciudades' creada!");
            db.run(
              `INSERT INTO ciudades (Nombre, FechaCiudad, IdPais) VALUES
              ('Cordoba', '2022-01-01', 1),
              ('Rio de Janeiro', '2022-01-02', 2),
              ('Madrid', '2022-01-03', 7),
              ('Roma', '2022-01-04', 9),
              ('Londres', '2022-01-05', 10),
              ('Santiago', '2022-01-06', 8),
              ('Berlin', '2022-01-07', 3),
              ('Miami', '2022-01-08', 4),
              ('Paris', '2022-01-09', 5),
              ('Vancouver', '2022-01-10', 6);`
            );
          }
        }
      );
    }
  });

  // Cerrar la conexión de la base de datos después de la inicialización
  db.close((err) => {
    if (err) {
      console.error('Error al cerrar la base de datos:', err.message);
    } else {
      console.log('Base de datos cerrada exitosamente');
    }
  });
}
