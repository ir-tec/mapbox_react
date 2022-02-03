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
import EditRoute from "./EditRoute";
import PutProject from "./PutProject";

const Layout = () => {
  const [coordinates, set_coordinates] = React.useState([[]]);
  const [routeCounter, set_routeCounter] = React.useState(0);
  const [editing, set_editing] = React.useState(false);
  const [edit_open, set_edit_open] = React.useState(false);
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
                return [{ name: item[0].name, color: item[0].color, ...res }];
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
          set_edit_open={set_edit_open}
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
            editing={editing}
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
            set_edit_open={set_edit_open}
            edit_open={edit_open}
            set_editing={set_editing}
            set_routeCounter={set_routeCounter}
            editing={editing}
            set_coordinates={set_coordinates}
            set_routes={set_routes}
            add_project={add_project}
            set_add_project={set_add_project}
          />

          <Drawer set_draw={set_draw} routes={routes} />

          <ClearPoints
            set_edit_open={set_edit_open}
            set_editing={set_editing}
            set_counter={set_routeCounter}
            set_coordinates={set_coordinates}
            routes={routes}
            set_routes={set_routes}
          />
          <PutProject
            editing={editing}
            set_editing={set_editing}
            add_project={add_project}
            routes={routes}
            coordinates={coordinates}
          />
          <EditRoute
            set_edit_open={set_edit_open}
            edit_open={edit_open}
            set_editing={set_editing}
            add_project={set_add_project}
            counter={set_routeCounter}
          />
          <Map
            editing={editing}
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
