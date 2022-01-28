import axios from "axios";

export const base_url = axios.create({
  baseURL: "https://api.mapbox.com",
});
export const auth_apis = axios.create({
  baseURL: "http://localhost:5000",
});

auth_apis.interceptors.request.use((config) => {
  config.headers["token"] = localStorage.token;
  return config;
});
