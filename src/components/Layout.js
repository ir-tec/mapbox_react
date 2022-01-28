import { CssBaseline, Grid, Toolbar } from "@material-ui/core";
import React from "react";
import Map from "./MapboxGl";
import { get_direction } from "../api/map_api";
import NavBar from "./NavBar";
// import CheckRoutes from "./CheckRoutes";
import Drawer from "./Drawer";
// import ShowPoints from "./ShowPoints";
import ClearPoints from "./ClearPoints";
import AddProject from "./AddProject";
import SaveButton from "./SaveButton";

const Layout = () => {
  const [coordinates, set_coordinates] = React.useState([[]]);
  const [routeCounter, set_routeCounter] = React.useState(0);
  const [routes, set_routes] = React.useState([[]]);
  const [draw, set_draw] = React.useState(false);
  const [add_project, set_add_project] = React.useState({
    is_add: false,
    project_type: "directions/v5",
    project_mode: "driving",
  });

  React.useEffect(() => {
    if (coordinates[routeCounter].length > 1 && add_project.is_add) {
      let COR = "";
      coordinates[routeCounter].map(
        (item, i) =>
          (COR += `${item.lng},${item.lat}${
            i !== coordinates[routeCounter].length - 1 ? ";" : ""
          }`)
      );

      get_direction(
        add_project.project_type,
        COR,
        add_project.project_mode
      ).then((res) => {
        if (res) {
          set_routes((pre) =>
            pre.map((item, i) => {
              if (i === routeCounter) {
                return [res];
              } else {
                return item;
              }
            })
          );
        }
      });
    }
    // eslint-disable-next-line
  }, [coordinates, add_project]);

  return (
    <>
      <CssBaseline />
      <div style={{ minHeight: "100vh", width: "100%", display: "flex" }}>
        <NavBar
          set_routes={set_routes}
          set_coordinates={set_coordinates}
          set_add_project={set_add_project}
        />
        <Grid
          item
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Toolbar />
          <SaveButton
            set_routeCounter={set_routeCounter}
            is_add={add_project}
            coordinates={coordinates}
            set_draw={set_draw}
            routes={routes}
            set_routes={set_routes}
            set_coordinates={set_coordinates}
            set_add_project={set_add_project}
          />
          <AddProject
            set_coordinates={set_coordinates}
            set_routes={set_routes}
            add_project={add_project}
            set_add_project={set_add_project}
          />
          {/* <CheckRoutes routes={routes} type={add_project.project_type} /> */}
          <Drawer set_draw={set_draw} routes={routes} />
          {/* <ShowPoints routes={routes} type={add_project.project_type} /> */}
          <ClearPoints
            set_counter={set_routeCounter}
            set_coordinates={set_coordinates}
            routes={routes}
            set_routes={set_routes}
          />

          <Map
            counter={routeCounter}
            set_draw={set_draw}
            draw={draw}
            coordinates={coordinates}
            type={add_project.project_type}
            add_project={add_project}
            set_coordinates={set_coordinates}
            routes={routes}
          />
        </Grid>
      </div>
    </>
  );
};

export default Layout;
