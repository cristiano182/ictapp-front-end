import axios from "axios";
import { getToken } from "./auth";

export const api = axios.create({
 // baseURL: "https://apidados.herokuapp.com/"
  baseURL: "http://localhost:7000/"
});
export const apiGoogleDrive = axios.create({
  baseURL:
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id"
});

apiGoogleDrive.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


