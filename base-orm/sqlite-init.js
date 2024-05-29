// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/basetp2.db");
  //await db.open(process.env.base);

  let existe = false;
  let res = null;
  
  tablaUsuarios = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'usuarios'" ;
  res = await db.get(
    tablaUsuarios,
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table usuarios( IdUsuario INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, Clave text NOT NULL, Rol text NOT NULL);`
    );
    console.log("tabla usuarios creada!");
    await db.run(
      `INSERT INTO usuarios (IdUsuario, Nombre, Clave) VALUES	
      (1,'admin','123','admin'),
      (2,'pedro','123','member'),
      (3,'felipe','123','member'),
      (4,'simon','123','member'),
      (5,'valentino','123','member');`
    );
  }

  existe = false;
  tablaPaises = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'paises'" ; 
  res = await db.get(tablaPaises,[]);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table paises( IdPais INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, Fecha date NOT NULL);`
    );
    console.log("tabla de paises creada!");
    await db.run(
      `INSERT INTO paises (IdPais, Nombre, Fecha) VALUES 
      (1,'Argentina','2022-01-01'),
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

  existe = false;
  tablaCiudades =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'ciudades'";
  res = await db.get(tablaCiudades, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table ciudades( 
              IdCiudad INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre text NOT NULL UNIQUE
            , FechaCiudad date NOT NULL
            , IdPais INTEGER NOT NULL
            ,FOREIGN KEY (IdPais) REFERENCES ciudades(IdPais)
            );`
    );
    console.log("tabla de ciudades creada!");

    await db.run(
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

  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;
