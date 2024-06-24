import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is imported

function Partidos() {
  const tituloPagina = "Partidos";
  const [partidos, setPartidos] = useState([]);
  const urlResource = "http://localhost:3000/api/partidos";

  // Function to fetch the data
  async function BuscarPartidos() {
    try {
      const resp = await axios.get(urlResource);
      setPartidos(resp.data); // Set the fetched data to state
    } catch (error) {
      console.error('Error fetching the partidos:', error);
    }
  }

  // useEffect to fetch the data once the component mounts
  useEffect(() => {
    BuscarPartidos();
  }, []);

  return (
    <div>
      <div className="container mt-1">
      <div className="tituloPagina">{tituloPagina}</div></div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>IdPartidos</th>
            <th style={{ width: "60%" }}>NombrePartido</th>
          </tr>
        </thead>
        <tbody>
          {partidos.length > 0 ? (
            partidos.map((partido) => (
              <tr key={partido.IdPartido}>
                <td>{partido.IdPartido}</td>
                <td>{partido.NombrePartido}</td>
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

export { Partidos };