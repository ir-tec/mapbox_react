import { Fab, Zoom } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";

const ClearPoints = ({ set_erase, routes }) => {
  return (
    <Zoom in={routes.length !== 0}>
      <Fab
        onClick={() => {
          set_erase(true);
        }}
        style={{
          position: "absolute",

          right: 4,
          top: 235,
          zIndex: 10,
          fontWeight: "bold",
          textTransform: "capitalize",
          backgroundColor: "beige",
        }}
      >
        <Delete />
      </Fab>
    </Zoom>
  );
};

export default ClearPoints;
