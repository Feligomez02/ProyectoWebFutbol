const fs = require('fs');
const path = require('path');
const db = require('aa-sqlite');

const dbPath = path.join(__dirname, '../.data/basetp2.db');
const dbDir = path.dirname(dbPath);

async function ensureDirectoryExistence(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function openDatabase(filePath) {
  return new Promise((resolve, reject) => {
    db.open(filePath)
      .then(resolve)
      .catch(err => reject("AA-SQLite3Open error: " + err.message));
  });
}

async function CrearBaseSiNoExiste() {
  try {
    // Ensure the directory exists
    await ensureDirectoryExistence(dbDir);

    // Open the database, create it if it doesn't exist
    await openDatabase(dbPath);

    // Check and create 'usuarios' table if it doesn't exist
    let tablaUsuarios = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'usuarios'";
    let res = await db.get(tablaUsuarios);
    if (res.contar === 0) {
      await db.run(
        `CREATE TABLE usuarios(
          IdUsuario INTEGER PRIMARY KEY AUTOINCREMENT,
          Nombre TEXT NOT NULL UNIQUE,
          Clave TEXT NOT NULL,
          Rol TEXT NOT NULL
        );`
      );
      console.log("Tabla 'usuarios' creada!");

      await db.run(
        `INSERT INTO usuarios (Nombre, Clave, Rol) VALUES
        ('admin', '123', 'admin'),
        ('pedro', '123', 'member'),
        ('felipe', '123', 'member'),
        ('simon', '123', 'member'),
        ('valentino', '123', 'member');`
      );
    }

    // Check and create 'paises' table if it doesn't exist
    let tablaPaises = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'paises'";
    res = await db.get(tablaPaises);
    if (res.contar === 0) {
      await db.run(
        `CREATE TABLE paises(
          IdPais INTEGER PRIMARY KEY AUTOINCREMENT,
          Nombre TEXT NOT NULL ,
          Fecha text 
        );`
      );
      console.log("Tabla 'paises' creada!");

      await db.run(
        `INSERT INTO paises (IdPais, Nombre, Fecha) VALUES
        (1,'Argentina', '2022-01-01'),
        (2,'Brasil', '2022-01-02'),
        (3,'Alemania', '2022-01-03'),
        (4,'USA', '2022-01-04'),
        (5,'Francia', '2022-01-05'),
        (6,'Canada', '2022-01-06'),
        (7,'Spain', '2022-01-07'),
        (8,'Chile', '2022-01-08'),
        (9,'Italia', '2022-01-09'),
        (10,'Inglaterra', '2022-01-10');`
      );
    }

    // Check and create 'ciudades' table if it doesn't exist
    let tablaCiudades = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'ciudades'";
    res = await db.get(tablaCiudades);
    if (res.contar === 0) {
      await db.run(
        `CREATE TABLE ciudades(
          IdCiudad INTEGER PRIMARY KEY AUTOINCREMENT,
          Nombre TEXT NOT NULL UNIQUE,
          FechaCiudad TEXT,
          IdPais INTEGER NOT NULL,
          FOREIGN KEY (IdPais) REFERENCES paises(IdPais)
        );`
      );
      console.log("Tabla 'ciudades' creada!");

      await db.run(
        `INSERT INTO ciudades (IdCiudad, Nombre, FechaCiudad, IdPais) VALUES
        (1,'Cordoba', '2022-01-01', 1),
        (2,'Rio de Janeiro', '2022-01-02', 2),
        (3,'Madrid', '2022-01-03', 7),
        (4,'Roma', '2022-01-04', 9),
        (5,'Londres', '2022-01-05', 10),
        (6,'Santiago', '2022-01-06', 8),
        (7,'Berlin', '2022-01-07', 3),
        (8,'Miami', '2022-01-08', 4),
        (9,'Paris', '2022-01-09', 5),
        (10,'Vancouver', '2022-01-10', 6);`
      );
    }

  } catch (error) {
    console.error("Error al crear o acceder a la base de datos:", error);
  } finally {
    // Ensure the database is closed
    await db.close();
  }
}

CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;
