import { Link } from "react-router-dom";

function Inicio() {
  return (
    <div className="mt-4 p-5 rounded" style={{ backgroundColor: "lightgray" }}>
      <h1>WEB FUTBOL</h1>
      <p>Este ejemplo está desarrollado con las siguientes tecnologías:</p>
      <p>
        Backend: NodeJs, Express , WebApiRest, Swagger, Sequelize, Sqlite
        múltiples capas en Javascript.
      </p>
      <p>
        Frontend: Single Page Application, HTML, CSS, Bootstrap, Javascript, NodeJs y React.
      </p>
      <Link to="/equipos" className="btn btn-primary">
        <i className="fa fa-search"> </i>
        Ver Equipos
      </Link>
    </div>
  );
}
export { Inicio };

  