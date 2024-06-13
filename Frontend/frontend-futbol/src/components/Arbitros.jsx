import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is imported

function Arbitros() {
  const tituloPagina = "Arbitros";
  const [arbitros, setArbitros] = useState([]);
  const urlResource = "http://localhost:3000/api/arbitros";

  // Function to fetch the data
  async function BuscarArbitros() {
    try {
      const resp = await axios.get(urlResource);
      setArbitros(resp.data); // Set the fetched data to state
    } catch (error) {
      console.error('Error fetching the arbitros:', error);
    }
  }

  // useEffect to fetch the data once the component mounts
  useEffect(() => {
    BuscarArbitros();
  }, []);

  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>IdArbitro</th>
            <th style={{ width: "60%" }}>Nombre Y Apellido</th>
          </tr>
        </thead>
        <tbody>
          {arbitros.length > 0 ? (
            arbitros.map((arbitro) => (
              <tr key={arbitro.IdArbitro}>
                <td>{arbitro.IdArbitro}</td>
                <td>{arbitro.NombreApellido}</td>
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

export { Arbitros };