
import httpService from "./http.service";
const urlResource = "http://localhost:3000/api/jugadores";
// mas adelante podemos usar un archivo de configuracion para el urlResource
// const urlResource = config.urlResourceArticulos;


async function Buscar(Nombre, Activo, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre , Activo, Pagina },
  });
  resp.data.Items.forEach((item) => {
    item.FechaNacimiento = item.FechaNacimiento.substring(0, 10);
  });
  return resp.data;
}


async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdJugador);
  resp.data.FechaNacimiento = resp.data.FechaNacimiento.substring(0, 10);
  return resp.data;
}


async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdJugador);
}


async function Grabar(item) {
  try {
    const response = await httpService.get(urlResource + "/" + item.IdJugador);
    if (response.data) {
      // Si existe, actualizar el registro
      await httpService.put(urlResource + "/" + item.IdJugador, item);
    } else {
      // Si no existe, crear uno nuevo
      await httpService.post(urlResource, item);
    }

  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error(`HTTP error occurred: ${error.response.status} ${error.response.statusText}`);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      // No response received
      console.error("No response received:", error.request);
    } else {
      // Other errors
      console.error("Error occurred while processing the item:", error.message);
    }
  }
}


export const jugadoresService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
