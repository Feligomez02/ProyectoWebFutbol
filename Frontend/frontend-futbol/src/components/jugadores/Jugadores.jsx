import React, { useState, useEffect } from "react";
import moment from "moment";
import JugadoresBuscar from "./JugadoresBuscar";
import JugadoresListado from "./JugadoresListado";
import JugadoresRegistro from "./JugadoresRegistro";
import { equiposService } from "../../services/equipos.service";
import { jugadoresService } from "../../services/jugadores.service";
import modalDialogService from "../../services/modalDialog.service";

function Jugadores() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Nombre, setNombre] = useState("");
  const [Activo, setActivo] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  const [Equipos, setEquipos] = useState(null);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    async function BuscarEquipos() {
      let data = await equiposService.Buscar();
      setEquipos(data);
    }
    BuscarEquipos();
  }, []);

  useEffect(() => {
    if (AccionABMC === "L") {
      Buscar(Pagina);
    }
  }, [AccionABMC, Pagina]);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await jugadoresService.Buscar(Nombre, Activo, _pagina);
    console.log("Datos recibidos de jugadoresService.Buscar:", data);
    modalDialogService.BloquearPantalla(false);

    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);


    //generar array de las paginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
    console.log("Paginas:", arrPaginas);
  }


  async function BuscarPorId(item, accionABMC) {
    const data = await jugadoresService.BuscarPorId(item);
    console.log("Datos recibidos de jugadoresService.BuscarPorId:", data);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item, "C"); 
  }
  
  function Modificar(item) {
    if (!item.Activo) {
        modalDialogService.Alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(item, "M"); 
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
      IdJugador: 0,
      Nombre: '', 
      IdEquipo: '',
      Activo: '',
      FechaNacimiento: moment(new Date()).format("YYYY-MM-DD"),
    });
    alert("preparando el Alta...");
  }

  function Imprimir() {
    alert("En desarrollo...");
  }

  async function ActivarDesactivar(item) {
    modalDialogService.Confirm(
        "Esta seguro que quiere " +
          (item.Activo ? "desactivar" : "activar") +
          " el registro?",
        undefined,
        undefined,
        undefined,
        async () => {
          await jugadoresService.ActivarDesactivar(item);
          await Buscar();
        }
      );
  
  }

  async function Grabar(item) {
    // agregar o modificar
    try {
      await jugadoresService.Grabar(item);
    } catch (error) {
      modalDialogService.Alert(error?.response?.data?.message ?? error.toString())
      return;
    }
    await Buscar();
    Volver();

    setTimeout(() => {
      alert(
        "Registro " +
        (AccionABMC === "A" ? "agregado" : "modificado") +
        " correctamente."
      );
    }, 0);
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Jugadores <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <JugadoresBuscar
          Nombre={Nombre}
          setNombre={setNombre}
          Activo={Activo}
          setActivo={setActivo}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items && Items.length > 0 && (
        <JugadoresListado
          {...{
            Items,
            Consultar,
            Modificar,
            ActivarDesactivar,
            Imprimir,
            Pagina,
            RegistrosTotal,
            Paginas,
            Buscar,
          }}
        />
      )}

      {AccionABMC === "L" && Items && Items.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && (
        <JugadoresRegistro
          {...{ AccionABMC, Equipos, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}

export { Jugadores };
