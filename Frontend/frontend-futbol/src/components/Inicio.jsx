import { Link } from "react-router-dom";

function Inicio() {
  return (
    <div className="mt-4 p-5 rounded" style={{ backgroundColor: "lightgray" }}>
      <img 
          src="https://upload.wikimedia.org/wikipedia/commons/8/85/Logo_lpf_afa.png" 
          alt="Logo LPF AFA" 
          style={{ width: '50px', marginRight: '20px' }} 
        />
      <h1>LIGA PROFESIONAL DE FUTBOL</h1>
      
      <p>Este TP está desarrollado con las siguientes tecnologías:</p>
      <p>
        Backend: NodeJs, Express , WebApiRest, Swagger, Sequelize, Sqlite
        múltiples capas en Javascript.
      </p>
      <p>
        Frontend: Single Page Application, HTML, CSS, Bootstrap, Javascript, NodeJs y React.
      </p>
      <Link to="/equipos" className="btn btn-primary" style={{ marginRight: '20px' }}>
        <i className="fa fa-search"> </i>
        Ver Equipos
      </Link>

      <Link to="/arbitros" className="btn btn-primary" style={{ marginRight: '20px' }}>
        <i className="fa fa-search"> </i>
        Ver Arbitros
      </Link>
    </div>
  );
}
export { Inicio };

  