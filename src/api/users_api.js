import { set_message } from "../redux/actions";
import Store from "../redux/Store";
import { auth_apis } from "./base_api";

export const get_users = async () => {
  try {
    const { data } = await auth_apis.get("/users");

    return data;
  } catch (error) {}
};
export const delete_user = async (id) => {
  try {
    const { data } = await auth_apis.delete(`/users/${id}`);
    Store.dispatch(
      set_message({
        mode: true,
        message: data.message,
        color: "info",
      })
    );
    return data;
  } catch (error) {}
};
