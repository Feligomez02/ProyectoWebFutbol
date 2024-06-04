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
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'equipos'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table equipos( IdEquipo INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL, FechaCreacion date, Activo boolean NOT NULL);"
    );
    console.log("tabla equipos creada!");
    await db.run(
      "insert into equipos values	(1, 'River Plate', '1901-05-25', true), (2, 'Boca Juniors', '1905-04-03', true), (3, 'Independiente', '1905-08-01', true), (4, 'Racing Club', '1903-03-25', true), (5, 'San Lorenzo', '1908-04-01', true), (6, 'Vélez Sarsfield', '1910-01-01', true), (7, 'Estudiantes de La Plata', '1905-08-04', true), (8, 'Gimnasia y Esgrima La Plata', '1887-06-03', true), (9, 'Belgrano', '1905-03-19', true), (10, 'Rosario Central', '1889-12-24', true);"
    );
  }

  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'jugadores'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table jugadores( 
              IdJugador INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre text NOT NULL 
            , EquipoId integer NOT NULL
            , Activo boolean NOT NULL
            , FechaNacimiento date,
            FOREIGN KEY (EquipoId) REFERENCES equipos(IdEquipo)
            );`
    );
    console.log("tabla jugadores creada!");

    await db.run(
      `insert into jugadores values
      (1, 'Lionel Messi', 1, true, '1987-06-24'), 
      (2, 'Carlos Tevez', 2, true, '1984-02-05'), 
      (3, 'Sergio Agüero', 3, true, '1988-06-02'), 
      (4, 'Diego Milito', 4, false, '1979-06-12'), 
      (5, 'Néstor Ortigoza', 5, true, '1984-10-07'), 
      (6, 'Maximiliano Moralez', 6, true, '1987-02-27'), 
      (7, 'Juan Sebastián Verón', 7, false, '1975-03-09'), 
      (8, 'Lucas Licht', 8, true, '1981-04-06'), 
      (9, 'Matías Suárez', 9, true, '1988-05-09'), 
      (10, 'Ángel Di María', 10, true, '1988-02-14')
      ;`
    );
  }

  existe=false
  sql=
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'alumnos'"
  res = await db.get(sql,[])
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table alumnos( IdAlumno INTEGER PRIMARY KEY AUTOINCREMENT, NombreAlumno text NOT NULL UNIQUE, FechaAlumno date);"
    );
    console.log("tabla alumnos creada!");
    await db.run(
        "INSERT INTO alumnos VALUES (1, 'Carlos', '2024-05-10'), (2, 'María', '2024-05-11'), (3, 'Juan', '2024-05-12'), (4, 'Ana', '2024-05-13'), (5, 'Luis', '2024-05-14'), (6, 'Sofía', '2024-05-15'), (7, 'Pablo', '2024-05-16'), (8, 'Andrea', '2024-05-17'), (9, 'Daniel', '2024-05-18'), (10, 'Lucía', '2024-05-19');"
      );
  }





  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;
