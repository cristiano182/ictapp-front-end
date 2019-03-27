import { api } from "./api";
const TOKEN_KEY = "session";

const isAuthenticated = e => {
  if (localStorage.getItem(TOKEN_KEY) !== null) return true;
};

const verifyToken = async e => {
  let res = await api.get("/users/verifytoken");

  return res.data;
};

const getToken = e => {
  let token = localStorage.getItem(TOKEN_KEY);
  return token;
};

const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export { logout, login, isAuthenticated, getToken, TOKEN_KEY, verifyToken };
