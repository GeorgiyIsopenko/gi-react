import http from "./httpSevice";
import { apiEndPoint } from "../configs/default.json";

const moviesEndPoint = apiEndPoint + "movies";

function movieUrl(id) {
  return `${moviesEndPoint}/${id}`;
}

export async function getMovies() {
  const { data: movies } = await http.get(moviesEndPoint);
  return movies;
}

export async function deleteMovie(id) {
  return await http.delete(movieUrl(id));
}

export async function getMovie(id) {
  const { data: movie } = await http.get(movieUrl(id));
  return movie;
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    console.log(body);
    return http.put(movieUrl(movie._id), body);
  }

  return http.post(moviesEndPoint, movie);
}
