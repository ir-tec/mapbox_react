import { Grid } from "@material-ui/core";
import React from "react";
import Draggable from "react-draggable";
// import mapboxgl from "mapbox-gl";

// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
// const Content = ({ state }) => {
//   return (
//     <div
//       ref={(el) => (this.mapWrapper = el)}
//       className="mapWrapper"
//       container
//       direction="column"
//       alignItems={"flex-start"}
//       justifyContent="flex-start"
//       item
//       xs={12}
//       style={{
//         backgroundColor: "blanchedalmond",
//         padding: 24,

//         height: "100vh",
//       }}
//     >
//       <Toolbar />
//       <Row state={state.map} />
//       <Row state={state.access} />
//     </div>
//   );
// };

const Row = ({ state }) => {
  const [start, set_start] = React.useState(false);
  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      // grid={[25, 25]}
      scale={1}
      bounds="body"
      onStart={() => {
        set_start(true);
      }}
      onStop={() => {
        set_start(false);
      }}
    >
      <Grid
        item
        className="handle"
        container
        justifyContent="center"
        alignItems="center"
        style={{
          backgroundColor: "white",
          boxShadow: "0 0 3px #999",
          borderRadius: 12,
          cursor: "move",
          width: "50%",
          height: 50,
          opacity: !state ? 0 : 1,
          margin: 8,
          transition: !start ? "0.2s" : "0s",
          position: "absolute",
          zIndex: 2,
        }}
      >
        asdasd
      </Grid>
    </Draggable>
  );
};

export default Row;
