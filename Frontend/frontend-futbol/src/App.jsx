import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {Inicio} from "./components/Inicio";
import {Equipos} from "./components/Equipos";
import {Menu} from "./components/Menu";
import {Footer} from "./components/Footer";
import { Jugadores } from "./components/jugadores/Jugadores";
import { ModalDialog } from "./components/ModalDialog";
import { Arbitros } from "./components/Arbitros";
import { Designaciones } from "./components/designaciones/Designaciones";
import { Estadios  } from "./components/estadios/Estadios";
import {Partidos} from "./components/Partidos";

function App() {
  return (
    <>
      <BrowserRouter>
        <ModalDialog />
        <Menu />
        <div className="divBody">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/equipos" element={<Equipos />} />
              <Route path="*" element={<Navigate to="/Inicio" replace />} />
              <Route path="/jugadores" element={<Jugadores />} />
              <Route path="/arbitros" element={<Arbitros />} />
              <Route path="/designaciones" element={<Designaciones />} />
              <Route path="/estadios" element={<Estadios />} />
              <Route path="/partidos" element={<Partidos />} />

            </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
