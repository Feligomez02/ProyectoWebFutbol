// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/basetp.db");
  //await db.open(process.env.base);

  let existe = false;
  let res = null;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'usuarios'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table usuarios( IdUsuario INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, Clave text NOT NULL, Rol text NOT NULL);"
    );
    console.log("tabla usuarios creada!");
    await db.run(
      "insert into usuarios values	(1,'admin','123','admin'),(2,'juan','123','member');"
    );
  }

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'paises'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table paises( IdPais INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, Fecha date);"
    );
    console.log("tabla paises creada!");
    await db.run(
      "insert into paises values	(1, 'Argentina', '1816-07-09'), (2, 'Japón', '660-01-01'), (3, 'Australia', '1901-01-01'), (4, 'Nigeria', '1960-10-01'), (5, 'Canadá', '1867-07-01'), (6, 'Egipto', '1922-02-28'), (7, 'Noruega', '1814-05-17'), (8, 'Brasil', '1822-09-07'), (9, 'India', '1947-08-15'), (10, 'Sudáfrica', '1910-05-31');"
    );
  }

  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'ciudades'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table ciudades( 
              IdCiudad INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre text NOT NULL 
            , PaisId integer
            , FechaCiudad date,
            FOREIGN KEY (PaisId) REFERENCES paises(IdPais)
            );`
    );
    console.log("tabla ciudades creada!");

    await db.run(
      `insert into ciudades values
        (1, 'Buenos Aires', 1, '1536-04-02'),
        (2, 'Tokio', 2, '1457-01-01'),
        (3, 'Sidney', 3, '1788-01-26'),
        (4, 'Abuya', 4, '1991-12-12'),
        (5, 'Ottawa', 5, '1857-01-01'),
        (6, 'El Cairo', 6, '969-01-01'),
        (7, 'Oslo', 7, '1048-01-01'),
        (8, 'Brasilia', 8, '1960-04-21'),
        (9, 'Nueva Delhi', 9, '1911-12-12'),
        (10, 'Pretoria', 10, '1855-01-01')
      ;`
    );
  }

  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;
