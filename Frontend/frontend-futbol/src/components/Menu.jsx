import React from "react";
import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <NavLink className="navbar-brand" to="/inicio">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/8/85/Logo_lpf_afa.png" 
          alt="Logo LPF AFA" 
          style={{ width: '20px', margin: '5px' }} 
        />
        <i className="fa fa-soccer"></i>
        &nbsp;<i>LPF</i>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {/*
          <li className="nav-item">
            <NavLink className="nav-link" to="/inicio">
              Inicio
            </NavLink>
          </li>*/}
          <li className="nav-item">
            <NavLink className="nav-link" to="/equipos">
              Equipos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/jugadores">
              Jugadores
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/arbitros">
              Arbitros
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/designaciones">
              Designaciones
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/partidos">
              Partidos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/estadios">
              Estadios
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export { Menu };
