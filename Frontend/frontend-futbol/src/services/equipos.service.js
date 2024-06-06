import axios from "axios";
const urlResource = "https://localhost:3000/api/equipos";
async function Buscar(Nombre, Activo, Pagina) {
  const resp = await axios.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}
async function BuscarPorId(equipo) {
  const resp = await axios.get(urlResource + "/" + equipo.IdEquipo);
  return resp.data;
}
async function ActivarDesactivar(equipo) {
  await axios.delete(urlResource + "/" + equipo.IdEquipo);
}
async function Grabar(equipo) {
  if (equipo.IdEquipo === 0) {
    await axios.post(urlResource, equipo);
  } else {
    await axios.put(urlResource + "/" + equipo.IdEquipo, equipo);
  }
}
export const articulosService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
