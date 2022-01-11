import { Fab, Zoom } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";

const ClearPoints = ({ set_coordinates, routes, set_routes }) => {
  return (
    <Zoom in={routes.length !== 0}>
      <Fab
        variant="extended"
        onClick={() => {
          set_coordinates([]);
          set_routes([]);
        }}
        style={{
          position: "absolute",
          right: 4,
          top: 235,
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
