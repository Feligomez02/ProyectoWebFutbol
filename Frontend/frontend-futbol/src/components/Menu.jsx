import React from "react";
import { NavLink } from "react-router-dom";
function Menu() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <a className="navbar-brand">
        <i className="fa fa-soccer"></i>
        &nbsp;<i>Web Futbol</i>
      </a>
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
          <li className="nav-item">
            <NavLink className="nav-link" to="/inicio">
              Inicio
            </NavLink>
          </li>
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
        </ul>
      </div>
    </nav>
  );
}
export {Menu};
