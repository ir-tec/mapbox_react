import { Fab, Zoom } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { set_route_to_edit } from "../redux/actions";
import Store from "../redux/Store";

const ClearPoints = ({
  set_coordinates,
  routes,
  set_routes,
  set_counter,
  set_edit_open,
  set_editing,
}) => {
  return (
    <Zoom in={routes[0].length !== 0}>
      <Fab
        variant="extended"
        onClick={() => {
          set_counter(0);
          set_coordinates([[]]);
          set_routes([[]]);
          set_edit_open(false);
          set_editing(false);
          Store.dispatch(set_route_to_edit(""));
        }}
        style={{
          position: "absolute",
          right: 4,
          top: 129,
          zIndex: 10,
          width: 160,
          fontWeight: "bold",
          textTransform: "capitalize",
          backgroundColor: "beige",
        }}
      >
        <Delete style={{ marginRight: 16 }} />
        Clear
      </Fab>
    </Zoom>
  );
};

export default ClearPoints;
