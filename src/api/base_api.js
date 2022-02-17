import axios from "axios";
import { set_loading, set_message } from "../redux/actions";
import Store from "../redux/Store";

export const base_url = axios.create({
  baseURL: "https://api.mapbox.com",
});
export const auth_apis = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

auth_apis.interceptors.request.use((config) => {
  config.headers["token"] = localStorage.token;
  Store.dispatch(set_loading(true));
  return config;
});

auth_apis.interceptors.response.use(
  (config) => {
    Store.dispatch(set_loading(false));
    return config;
  },
  (err) => {
    Store.dispatch(set_loading(false));
    Store.dispatch(
      set_message({
        mode: true,
        message: err.response.data.message,
        color: "error",
      })
    );
    return Promise.reject(err);
  }
);
