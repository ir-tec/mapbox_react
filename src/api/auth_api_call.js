import Store from "../redux/Store";
import { auth_apis } from "./base_api";
import { set_auth } from "../redux/actions";

export const login_api = async (value) => {
  try {
    const { data } = await auth_apis.post("/auth", value);
    localStorage.token = data;
    Store.dispatch(set_auth(1));
    auth_apis.defaults.headers["token"] = localStorage.token;
    return data;
  } catch (error) {}
};
export const register_api = async (value, then) => {
  try {
    const { data } = await auth_apis.post("/register", value);

    return data;
  } catch (error) {}
};
