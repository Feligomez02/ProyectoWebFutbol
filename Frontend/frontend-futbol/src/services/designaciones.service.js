
import httpService from "./http.service";
const urlResource = "http://localhost:3000/api/designaciones";
// mas adelante podemos usar un archivo de configuracion para el urlResource
// const urlResource = config.urlResourceArticulos;


async function Buscar(Descripcion, Confirmada, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Descripcion , Confirmada, Pagina },
  });
  resp.data.Items.forEach((item) => {
    item.FechaDesig = item.FechaDesig.substring(0, 10);
  });
  return resp.data;
}


async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdDesignacion);
  resp.data.FechaDesig = resp.data.FechaDesig.substring(0, 10);
  return resp.data;
}


async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdDesignacion);
}


async function Grabar(item) {
  try {
    const response = await httpService.get(urlResource);
    let itemExists = false;
    
    for (let i = 0; i < response.data.Items.length; i++) {
      if (response.data.Items[i].IdDesignacion === item.IdDesignacion) {
        console.log("Existing IdDesignacion found: ", response.data.Items[i].IdDesignacion);
        await httpService.put(urlResource + "/" + item.IdDesignacion, item);
        itemExists = true;
        break; // Exit the loop since we found the item and updated it
      }
    }
    
    if (!itemExists) {
      console.log("New IdDesignacion, creating: ", item.IdDesignacion);
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


export const designacionesService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
