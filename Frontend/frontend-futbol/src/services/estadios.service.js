
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
  return resp.data;
}


async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdEstadio);
}


async function Grabar(item) {
  try {
    const response = await httpService.get(urlResource);
    let itemExists = false;
    
    for (let i = 0; i < response.data.Items.length; i++) {
      if (response.data.Items[i].IdEstadio === item.IdEstadio) {
        console.log("Existing IdEstadio found: ", response.data.Items[i].IdEstadio);
        await httpService.put(urlResource + "/" + item.IdEstadio, item);
        itemExists = true;
        break; // Exit the loop since we found the item and updated it
      }
    }
    
    if (!itemExists) {
      console.log("New IdEstadio, creating: ", item.IdEstadio);
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


export const estadiosService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
