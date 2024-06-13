
import httpService from "./http.service";
const urlResource = "http://localhost:3000/api/jugadores";
// mas adelante podemos usar un archivo de configuracion para el urlResource
// const urlResource = config.urlResourceArticulos;


async function Buscar(Nombre, Activo, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre , Activo, Pagina },
  });
  return resp.data;
}


async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdJugador);
  return resp.data;
}


async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdJugador);
}


async function Grabar(item) {
  try {
    const response = await httpService.get(urlResource + "/" + item.IdJugador);
    let itemExists = false;
    
    for (let i = 0; i < response.data.Items.length; i++) {
      if (response.data.Items[i].IdJugador === item.IdJugador) {
        console.log("Existing IdJugador found: ", response.data.Items[i].IdJugador);
        await httpService.put(urlResource + "/" + item.IdJugador, item);
        itemExists = true;
        break; // Exit the loop since we found the item and updated it
      }
    }
    
    if (!itemExists) {
      console.log("New IdJugador, creating: ", item.IdJugador);
      await httpService.post(urlResource, item);
    }
  } catch (error) {
    console.error("Error occurred while processing the item:", error);
  }
}


export const jugadoresService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
