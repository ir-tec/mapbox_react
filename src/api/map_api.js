import { set_message } from "../redux/actions";
import Store from "../redux/Store";
import { base_url, auth_apis } from "./base_api";

export const get_direction = async (type, coordinates, mode) => {
  try {
    const { data } = await base_url.get(
      `/${type}/mapbox/${mode}/${coordinates}`,
      {
        params: {
          access_token: process.env.REACT_APP_MAPBOX_KEY,
          geometries: "geojson",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(`${error}`);
  }
};

export const get_projects = async () => {
  try {
    const { data } = await auth_apis.get("/projects");

    return data;
  } catch (error) {}
};
export const post_project = async (values) => {
  try {
    const { data } = await auth_apis.post("/projects", values);

    Store.dispatch(
      set_message({
        mode: true,
        message: data.message,
        color: "success",
      })
    );

    return data;
  } catch (error) {}
};
