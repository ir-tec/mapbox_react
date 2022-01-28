import { Fab, Zoom } from "@material-ui/core";
import { Save, TripOrigin } from "@material-ui/icons";
import React from "react";
import { post_project } from "../api/map_api";

const SaveButton = ({
  is_add,
  routes,
  set_routes,
  coordinates,
  set_coordinates,
  set_add_project,
  set_routeCounter,
  set_draw,
}) => {
  return (
    <>
      <Zoom in={is_add.is_add}>
        <Fab
          color="primary"
          onClick={() => {
            post_project({
              project_name: is_add.project_name,
              routes: {
                coordinates,
                mode: is_add.project_mode,
                type: is_add.project_type,
                points: routes,
              },
            }).then((res) => {
              if (!res) return;
              set_draw(false);
              set_routes([[]]);
              set_routeCounter(0);
              set_coordinates([[]]);
              set_add_project({ is_add: false });
            });
          }}
          style={{ position: "absolute", bottom: 50, right: 80, zIndex: 3 }}
        >
          <Save />
        </Fab>
      </Zoom>
      <Zoom in={is_add.is_add && routes[routes.length - 1].length !== 0}>
        <Fab
          onClick={() => {
            set_coordinates((pre) => [...pre, []]);
            set_routes((pre) => [...pre, []]);
            set_routeCounter((pre) => pre + 1);
          }}
          color="secondary"
          variant="extended"
          style={{
            position: "absolute",
            bottom: 50,
            right: 150,
            zIndex: 3,
            textTransform: "capitalize",
          }}
        >
          <TripOrigin style={{ marginRight: 8 }} />
          New Route
        </Fab>
      </Zoom>
    </>
  );
};

export default SaveButton;
