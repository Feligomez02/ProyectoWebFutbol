function Equipos() {
    return (
      <>
        <div className="tituloPagina">Equipos</div>
        <div className="table-responsive">
           <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{ width: "40%" }}>IdEquipo</th>
                <th style={{ width: "60%" }}>Nombre</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Accesorios</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Audio</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
  export { Equipos };
  