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
            , IdEquipo integer NOT NULL
            , Activo boolean NOT NULL
            , FechaNacimiento date,
            FOREIGN KEY (IdEquipo) REFERENCES equipos(IdEquipo)
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

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'partidos'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table partidos( IdPartido INTEGER PRIMARY KEY AUTOINCREMENT, NombrePartido text NOT NULL, FechaPartido date, ActivoPartido boolean NOT NULL);"
    );
    console.log("tabla partidos creada!");
    await db.run(
      "insert into partidos values	(1, 'Clásico de la Ciudad', '2024-06-10', true), (2, 'Final de Copa', '2024-07-02', true), (3, 'Derbi Local', '2024-06-20', true), (4, 'Partido Amistoso', '2024-06-15', false), (5, 'Semifinal de Liga', '2024-06-25', true), (6, 'Partido de Pretemporada', '2024-07-10', true), (7, 'Encuentro Internacional', '2024-06-18', true), (8, 'Partido Benéfico', '2024-07-05', false), (9, 'Revancha de Clásico', '2024-07-12', true), (10, 'Partido de Inauguración', '2024-06-08', true);"
    );
  }


  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'arbitros'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table arbitros( IdArbitro INTEGER PRIMARY KEY AUTOINCREMENT, NombreApellido text NOT NULL, FechaNac date, Activo boolean NOT NULL);"
    );
    console.log("tabla arbitros creada!");
    await db.run(
      "insert into arbitros values	(1, 'Fernando Rapalini', '1975-05-15', true), (2, 'Hector Baldassi', '1964-10-20', false), (3, 'Yael Falcon', '1982-03-28', true), (4, 'Hernan Mastrangelo', '1970-08-10', true), (5, 'Fernando Echenique', '1985-12-04', true), (6, 'Nestor Pitana', '1970-07-30', false), (7, 'Nicolas Lamolina', '1978-09-25', true), (8, 'Facundo Tello', '1989-02-18', true), (9, 'Pablo Lunatti', '1969-06-22', false), (10, 'Pablo Dovalo', '1981-11-12', true);"
    );
  }


  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'estadios'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table estadios( 
              IdEstadio INTEGER PRIMARY KEY AUTOINCREMENT
            , NombreEstadio text NOT NULL 
            , PartidoId integer NOT NULL
            , ActivoEstadio boolean NOT NULL
            , FechaEstadio date,
            FOREIGN KEY (PartidoId) REFERENCES partidos(IdPartido)
            );`
    );
    console.log("tabla estadios creada!");

    await db.run(
      `insert into estadios values
        (1, 'Estadio Santiago Bernabéu', 1, true, '2024-06-05'),
        (2, 'Camp Nou', 2, true, '2024-06-04'),
        (3, 'Old Trafford', 3, false, '2024-06-03'),
        (4, 'Anfield', 4, true, '2024-06-02'),
        (5, 'San Siro', 5, false, '2024-06-01'),
        (6, 'Signal Iduna Park', 6, true, '2024-05-31'),
        (7, 'Allianz Arena', 7, true, '2024-05-30'),
        (8, 'Estadio Azteca', 8, true, '2024-05-29'),
        (9, 'Estadio Monumental', 9, false, '2024-05-28'),
        (10, 'Wembley Stadium', 10, true, '2024-05-27')
      ;`
    );
  }

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'torneos'",
    []
  ); 
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table torneos( IdTorneo INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL, FechaInicio date, Activo boolean NOT NULL);"
    );
    console.log("tabla torneos creada!");
    await db.run(
      "insert into torneos values	(1, 'Premier', '1901-05-25', true), (2, 'Ligue One', '1905-04-03', true), (3, 'Serie A', '1905-08-01', true), (4, 'La Liga', '1903-03-25', true), (5, 'Liga Argentina', '1908-04-01', true), (6, 'Eredivisie', '1910-01-01', true), (7, 'Libertadores', '1905-08-04', true), (8, 'Sudamericana', '1887-06-03', true), (9, 'Eurocopa', '1905-03-19', true), (10, 'Champions League', '1889-12-24', true);"
    );
  }

  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'resultados'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table resultados( 
              IdResultado INTEGER PRIMARY KEY AUTOINCREMENT
            , Descripcion text NOT NULL 
            , TorneoId integer NOT NULL
            , Activo boolean NOT NULL
            , FechaResultado date,
            FOREIGN KEY (TorneoId) REFERENCES torneos(IdTorneo)
            );`
    );
    console.log("tabla resultados creada!");

    await db.run(
      `insert into resultados values
      (1, 'Resultado del partido 1 del Torneo 7', 7, true, '2024-06-01'), 
      (2, 'Resultado del partido 2 del Torneo 5', 5, false, '2024-06-02'), 
      (3, 'Resultado del partido 3 del Torneo 1', 1, true, '2024-06-03'), 
      (4, 'Resultado del partido 1 del Torneo 2', 2, true, '2024-06-04'), 
      (5, 'Resultado del partido 2 del Torneo 9', 9, false, '2024-06-05'), 
      (6, 'Resultado del partido 3 del Torneo 6', 6, false, '2024-06-06'), 
      (7, 'Resultado del partido 1 del Torneo 10', 10, true, '2024-06-07'), 
      (8, 'Resultado del partido 2 del Torneo 1', 1, false, '2024-06-08'), 
      (9, 'Resultado del partido 3 del Torneo 7', 7, true, '2024-06-09'), 
      (10, 'Resultado del partido 4 del Torneo 1', 1, true, '2024-06-10');
      ;`
    );
  }


  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;
