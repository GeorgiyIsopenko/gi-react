import http from "./httpSevice";
import jwtDecode from "jwt-decode";
import { apiEndPoint } from "../configs/default.json";

const authApiEndPoint = apiEndPoint + "auth";
const tokenKey = "token";

http.setJwt(getJwt());

async function login(email, password) {
  const { data: jwt } = await http.post(authApiEndPoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

function loginwithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  loginwithJwt,
  logout,
  getCurrentUser,
  getJwt
};
