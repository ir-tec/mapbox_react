import { CssBaseline, Grid, Toolbar } from "@material-ui/core";
import React from "react";
import Map from "./Map";
// eslint-disable-next-line
import MapComponent from "./MapComponent";
import { get_direction } from "../api/map_api";

import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import CheckRoutes from "./CheckRoutes";

const Layout = ({ children }) => {
  const [coordinates, set_coordinates] = React.useState([]);
  const [mode, set_mode] = React.useState("driving");
  const [routes, set_routes] = React.useState([]);
  React.useEffect(() => {
    if (coordinates.length > 1) {
      let COR = "";
      coordinates.map(
        (item, i) =>
          (COR += `${item.lng},${item.lat}${
            i !== coordinates.length - 1 ? ";" : ""
          }`)
      );

      get_direction(COR, mode).then((res) => {
        if (res) {
          set_routes(res);
          // localStorage.routes = JSON.stringify(res);
        }
      });
    }
    // eslint-disable-next-line
  }, [coordinates]);

  return (
    <>
      <CssBaseline />
      <div style={{ minHeight: "100vh", width: "100%", display: "flex" }}>
        <Sidebar mode={mode} onchange={set_mode} />

        <NavBar />
        <Grid
          item
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Toolbar />
          <CheckRoutes routes={routes} />
          <Map coordinates={coordinates} set_coordinates={set_coordinates} />
        </Grid>
      </div>
    </>
  );
};

export default Layout;
