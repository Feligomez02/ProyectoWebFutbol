import React, { useState, useEffect } from "react";
import moment from "moment";
import JugadoresBuscar from "./JugadoresBuscar";
import JugadoresListado from "./JugadoresListado";
import JugadoresRegistro from "./JugadoresRegistro";
import { equiposService } from "../../services/equipos.service";
import { jugadoresService } from "../../services/jugadores.service";
import modalDialogService from "../../services/modalDialog.service";
import { v4 as uuidv4 } from "uuid";
import { set } from "react-hook-form";


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

  const [Items, setItems] = useState([]);  // Inicializar como array vacío
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

 
  

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    } else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await jugadoresService.Buscar(Nombre, Activo, _pagina);
    modalDialogService.BloquearPantalla(false);
    console.log("jugadoresService devolvio: ", data);
    
    // Check if data is null or undefined
    if (data) {
      if (Array.isArray(data)) {
        // Assuming data itself is an array of items
        setItems(data);
        setRegistrosTotal(data.length);
        
        // Generate array of pages to show in the paginator
        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(data.length / 10); i++) {
          arrPaginas.push(i);
        }
        setPaginas(arrPaginas);
      }
    else {
      console.error("No data returned from jugadoresService.Buscar");
    }
  }
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await jugadoresService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }
  

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    if (!item.Activo) {
      //alert("No puede modificarse un registro Inactivo.");
      modalDialogService.Alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  function generateRandomId() {
    return Math.floor(Math.random() * (1000 - 11 + 1)) + 11;
  }

  function generateRandomDate() {
    const start = new Date(1970, 0, 1); // 1st Jan 1970
    const end = new Date(); // Current date
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return moment.utc(randomDate).format("YYYY-MM-DD");
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
        IdJugador: generateRandomId(),
        Nombre: '',
        IdEquipo: '',
        Activo: true,
        FechaNacimiento: generateRandomDate(),
      });
    //modalDialogService.Alert("preparando el Alta...");
  }

  function Imprimir() {
    modalDialogService.Alert("En desarrollo...");
  }

  async function ActivarDesactivar(item) {
    try {
      // Llamar a la función ActivarDesactivar del servicio de jugadores
      await jugadoresService.ActivarDesactivar(item);
      
      // Actualizar el estado local si es necesario
      // Por ejemplo, si deseas eliminar el jugador desactivado del estado local
      //setItems(items.filter(jugador => jugador.IdJugador !== item.IdJugador));
      
      // Mostrar un mensaje de éxito y esperar la respuesta del usuario
      await new Promise((resolve) => {
        modalDialogService.Alert("Jugador activado/desactivado correctamente.", resolve);
    });

    // Actualizar la lista de jugadores después de que el usuario haya aceptado el mensaje
    Buscar();
    } catch (error) {
      // Manejar errores si la solicitud falla
      console.error("Error al activar/desactivar jugador:", error);
      // Mostrar un mensaje de error
      modalDialogService.Alert("Error al activar/desactivar jugador. Por favor, inténtalo de nuevo más tarde.");
    }
  }
  
  

  async function Grabar(item) {
    // agregar o modificar
    try
    {
      await jugadoresService.Grabar(item);
    }
    catch (error)
    {
      modalDialogService.Alert(error?.response?.data?.message ?? error.toString())
      return;
    }
    console.log("Grabar item: ", item);
    await Buscar();
    Volver();
  
    //setTimeout(() => {
      modalDialogService.Alert(
        "Registro " +
          (AccionABMC === "A" ? "agregado" : "modificado") +
          " correctamente."
      );
    //}, 0);
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
      {AccionABMC === "L" && Items.length > 0 && (
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

      {AccionABMC === "L" && Items.length === 0 && (
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
