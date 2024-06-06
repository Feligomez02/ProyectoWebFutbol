import axios from "axios";
const urlResource = "https://localhost:3000/api/jugadores";
async function Buscar() {
  const resp = await axios.get(urlResource);
  return resp.data;
}
export const jugadoresService = {
  Buscar
};
