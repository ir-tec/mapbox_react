import Store from "../redux/Store";
import { auth_apis } from "./base_api";
import { set_auth, set_message } from "../redux/actions";

export const login_api = async (value) => {
  try {
    const { data } = await auth_apis.post("/auth", value);
    localStorage.token = data.token;
    localStorage.user_info = JSON.stringify(data.user_info);
    auth_apis.defaults.headers["token"] = localStorage.token;

    Store.dispatch(set_auth(1));
    return data;
  } catch (error) {}
};
export const register_api = async (value) => {
  try {
    const { data } = await auth_apis.post("/register", value);

    return data;
  } catch (error) {}
};
export const try_forget = async (value) => {
  try {
    const { data } = await auth_apis.post("/register/try_reset", value);

    Store.dispatch(
      set_message({
        message: data.message,
        mode: true,
        color: "info",
      })
    );
    return data;
  } catch (error) {}
};
export const update_profile = async (id, value) => {
  try {
    const { data } = await auth_apis.put(`/auth/update_profile`, value, {
      params: {
        id,
      },
    });
    Store.dispatch(
      set_message({ mode: true, message: "User updated", color: "success" })
    );

    return data;
  } catch (error) {}
};

export const verify_email = async (id, token) => {
  try {
    const { data } = await auth_apis.post("/register/verify", {
      id,
      token,
    });
    Store.dispatch(
      set_message({ mode: true, message: data.message, color: "success" })
    );

    return data;
  } catch (error) {}
};

export const resend_token = async (id) => {
  try {
    const { data } = await auth_apis.post("/register/get_code", id);

    return data;
  } catch (error) {}
};
export const change_password_api = async (values) => {
  try {
    const { data } = await auth_apis.post("/register/reset_password", values);
    return data;
  } catch (error) {}
};
