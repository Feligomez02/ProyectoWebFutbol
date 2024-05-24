// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/pymes.db");
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
      "insert into usuarios values	(1,'admin','123','admin'),(2,'pedro','123','member'),(3,'felipe','123','member'),(4,'simon','123','member'),(5,'valenitno','123','member')));"
    );
  }

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'articulosfamilias'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table articulosfamilias( IdArticuloFamilia INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE);"
    );
    console.log("tabla articulosfamilias creada!");
    await db.run(
      "insert into articulosfamilias values	(1,'ACCESORIOS'),(2,'AUDIO'),(3,'CELULARES'),(4,'CUIDADO PERSONAL'),(5,'DVD'),(6,'FOTOGRAFIA'),(7,'FRIO-CALOR'),(8,'GPS'),(9,'INFORMATICA'),(10,'LED - LCD');"
    );
  }

  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'articulos'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table articulos( 
              IdArticulo INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre text NOT NULL UNIQUE
            , Precio real
            , CodigoDeBarra
            , IdArticuloFamilia integer
            , Stock integer
            , FechaAlta text
            , Activo boolean,
            FOREIGN KEY (IdArticuloFamilia) REFERENCES articulosfamilias(IdArticuloFamilia)
            );`
    );
    console.log("tabla articulos creada!");

    await db.run(
      `insert into articulos values
      (1,'KIT DIRECT TV PREPA 0.60MT',299.00, '0779815559001', 10, 329,'2017-01-19', 1 ),
      (2,'KIT DIRECT TV PREPA 0.90MT',349.00, '0779815559002', 10, 468,'2017-01-31', 1 ),
      (3,'LED 22" LG FHD 22MN42APM',2669.00, '0779808338808', 10, 536,'2017-01-12', 1 ),
      (199,'CAMARA DIGITAL C1433 SLVER GE',899.00, '0084695100018', 6, 528,'2017-02-02', 1 ),
      (200,'LIMPIADOR CD SV 8336 ONE FOR ALL',55.00, '0871618404342', 1, 508,'2016-12-27', 1 ),
      (201,'LIMPIADOR LCD SV 8410 ONE FOR ALL',102.00, '0871618404333', 1, 186,'2017-02-02', 1 )
      ;`
    );
  }

  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;
