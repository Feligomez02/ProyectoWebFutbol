
import httpService from "./http.service";
const urlResource = "http://localhost:3000/api/estadios";
// mas adelante podemos usar un archivo de configuracion para el urlResource
// const urlResource = config.urlResourceArticulos;


async function Buscar(NombreEstadio, ActivoEstadio, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { NombreEstadio , ActivoEstadio, Pagina },
  });
  resp.data.Items.forEach((item) => {
    item.FechaEstadio = item.FechaEstadio.substring(0, 10);
  });
  return resp.data;
}


async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdEstadio);
  resp.data.FechaEstadio = resp.data.FechaEstadio.substring(0, 10);
  return resp.data;
}


async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdEstadio);
}


async function Grabar(item) {
  try {
    const response = await httpService.get(urlResource + "/" + item.IdEstadio);
    if (response.data) {
      // Si existe, actualizar el registro
      await httpService.put(urlResource + "/" + item.IdEstadio, item);
    } else {
      // Si no existe, crear uno nuevo
      await httpService.post(urlResource, item);
    }
  } catch (error) {
    if (error.response) {
      console.error(`HTTP error occurred: ${error.response.status} ${error.response.statusText}`);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error occurred while processing the item:", error.message);
    }
  }
}


export const estadiosService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
