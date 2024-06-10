
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
  if (item.IdJugador !== null && item.IdJugador !== 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdJugador, item);
  }
}


export const jugadoresService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
