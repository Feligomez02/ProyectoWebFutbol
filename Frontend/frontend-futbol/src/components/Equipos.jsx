import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is imported

function Equipos() {
  const tituloPagina = "Equipos";
  const [equipos, setEquipos] = useState([]);
  const urlResource = "http://localhost:3000/api/equipos";

  // Function to fetch the data
  async function BuscarEquipos() {
    try {
      const resp = await axios.get(urlResource);
      setEquipos(resp.data); // Set the fetched data to state
    } catch (error) {
      console.error('Error fetching the equipos:', error);
    }
  }

  // useEffect to fetch the data once the component mounts
  useEffect(() => {
    BuscarEquipos();
  }, []);

  return (
    <div>
      <div className="container mt-1">
      <div className="tituloPagina">{tituloPagina}</div></div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>IdEquipo</th>
            <th style={{ width: "60%" }}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {equipos.length > 0 ? (
            equipos.map((equipo) => (
              <tr key={equipo.IdEquipo}>
                <td>{equipo.IdEquipo}</td>
                <td>{equipo.Nombre}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export { Equipos };