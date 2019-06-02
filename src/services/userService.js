import http from "./httpSevice";
import { apiEndPoint } from "../configs/default.json";
import authService from "../services/authService";
import { supportsErrorEvent } from "@sentry/utils";

const usersApiEndPoint = apiEndPoint + "users";

export function register(user) {
  return http.post(usersApiEndPoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}

export function isAdmin(user) {
  return user && user.isAdmin === true;
}
