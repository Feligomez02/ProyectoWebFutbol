import React from "react";
import moment from "moment";

export default function EstadiosListado({
  Items,
  Consultar,
  Modificar,
  ActivarDesactivar,
  Imprimir,
  Pagina,
  RegistrosTotal,
  Paginas,
  Buscar,
}) {

  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">NombreEstadio</th>
            <th className="text-center">Partido</th>
            <th className="text-center">Activo Estadio</th>
            <th className="text-center">Fecha de Estadio</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items && Items.map((Item) => (
            <tr key={Item.IdEstadio}>
              <td>{Item.NombreEstadio}</td>
              <td className="text-center">{Item.partidos.NombrePartido}</td>
              <td className="text-center">{Item.ActivoEstadio ? "SI" : "NO"}</td>
              <td className="text-center">
                {moment(Item.FechaEstadio).format("DD/MM/YYYY")}
              </td>
              <td className="text-center text-nowrap">
                <button
                  className="btn btn-sm btn-outline-primary"
                  title="Consultar"
                  onClick={() => Consultar(Item)}
                >
                  <i className="fa fa-eye"></i>
                </button>
                <button
                  className="btn btn-sm btn-outline-primary"
                  title="Modificar"
                  onClick={() => Modificar(Item)}
                >
                  <i className="fa fa-pencil"></i>
                </button>
                <button
                  className={
                    "btn btn-sm " +
                    (Item.ActivoEstadio
                      ? "btn-outline-danger"
                      : "btn-outline-success")
                  }
                  title={Item.ActivoEstadio ? "Desactivar" : "Activar"}
                  onClick={() => ActivarDesactivar(Item)}
                >
                  <i
                    className={"fa fa-" + (Item.ActivoEstadio ? "times" : "check")}
                  ></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginador*/}
      <div className="paginador">
        <div className="row">
          <div className="col">
            <span className="pyBadge">Registros: {RegistrosTotal}</span>
          </div>
          <div className="col text-center">
            Pagina: &nbsp;
            <select
              value={Pagina}
              onChange={(e) => {
                Buscar(e.target.value);
              }}
            >
              {Paginas?.map((x) => (
                <option value={x} key={x}>
                  {x}
                </option>
              ))}
            </select>
            &nbsp; de {Paginas?.length}
          </div>

          <div className="col">
            <button
              className="btn btn-primary float-end"
              onClick={() => Imprimir()}
            >
              <i className="fa fa-print"></i>Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}