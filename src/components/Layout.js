import { CssBaseline, Grid, Toolbar } from "@material-ui/core";
import React from "react";
import Map from "./Map";

import { get_direction } from "../api/map_api";

import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import CheckRoutes from "./CheckRoutes";
import Drawer from "./Drawer";
import ShowPoints from "./ShowPoints";
import ClearPoints from "./ClearPoints";
// import ClearPoints from "./ClearPoints";

const Layout = () => {
  const [coordinates, set_coordinates] = React.useState([]);
  const [mode, set_mode] = React.useState("driving");
  const [type, set_type] = React.useState("directions/v5");
  const [routes, set_routes] = React.useState([]);
  const [draw, set_draw] = React.useState(false);
  const [erase, set_erase] = React.useState(false);

  React.useEffect(() => {
    if (coordinates.length > 1) {
      let COR = "";
      coordinates.map(
        (item, i) =>
          (COR += `${item.lng},${item.lat}${
            i !== coordinates.length - 1 ? ";" : ""
          }`)
      );

      get_direction(type, COR, mode).then((res) => {
        if (res) {
          set_routes(res);
        }
      });
    }
    // eslint-disable-next-line
  }, [coordinates]);

  return (
    <>
      <CssBaseline />
      <div style={{ minHeight: "100vh", width: "100%", display: "flex" }}>
        <Sidebar
          mode={mode}
          onchange={set_mode}
          type={type}
          set_routes={set_routes}
          onTypeChange={set_type}
        />

        <NavBar />
        <Grid
          item
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Toolbar />
          <CheckRoutes routes={routes} type={type} />
          <Drawer set_draw={set_draw} routes={routes} />
          <ShowPoints routes={routes} type={type} />
          <ClearPoints
            routes={routes}
            set_routes={set_routes}
            set_coordinates={set_coordinates}
            set_erase={set_erase}
          />
          <Map
            erase={erase}
            set_draw={set_draw}
            draw={draw}
            coordinates={coordinates}
            type={type}
            set_coordinates={set_coordinates}
            routes={routes}
          />
        </Grid>
      </div>
    </>
  );
};

export default Layout;
