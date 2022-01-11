import { Fab, Zoom } from "@material-ui/core";
import { Gesture } from "@material-ui/icons";
import React from "react";

const Drawer = ({ set_draw, routes }) => {
  return (
    <Zoom in={routes.length !== 0}>
      <Fab
        variant="extended"
        color="primary"
        onClick={() => set_draw((pre) => !pre)}
        style={{
          position: "absolute",
          right: 4,
          top: 70,
          zIndex: 10,
          fontWeight: "bold",
          textTransform: "capitalize",
          width: 160,
        }}
      >
        <Gesture style={{ marginRight: 16 }} /> String Line
      </Fab>
    </Zoom>
  );
};

export default Drawer;
