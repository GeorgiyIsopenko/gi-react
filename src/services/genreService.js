import http from "./httpSevice";
import { apiEndPoint } from "../configs/default.json";

export async function getGenres() {
  const { data: genres } = await http.get(apiEndPoint + "genres");
  return genres;
}
