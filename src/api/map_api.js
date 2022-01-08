import { base_url } from "./base_api";

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
