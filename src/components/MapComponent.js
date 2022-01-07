// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import Draggable from "react-draggable";
// import mapboxgl from "mapbox-gl";
// import { Grid, Toolbar } from "@material-ui/core";

// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

// export default class MapComponent extends Component {
//   static propTypes = {
//     prop: PropTypes,
//   };
//   constructor(props) {
//     super(props);
//     this.state = {
//       CenterLat: props.CenterLat,
//       CenterLan: props.CenterLan,
//       DefaultZoom: props.DefaultZoom,
//       route: null,
//       map: props.map,
//       access: props.access,
//     };
//   }
//   componentWillUnmount() {}
//   //manage component
//   componentDidMount() {
//     const map = new mapboxgl.Map({
//       container: this.mapWrapper,
//       style: "mapbox://styles/mapbox/streets-v10",
//       center: [
//         process.env.REACT_APP_DEFAULT_MAP_LAT,
//         process.env.REACT_APP_DEFAULT_MAP_LAN,
//       ],
//       zoom: 8,
//     });
//   }
//   render() {
//     return (
//       <div ref={(el) => (this.mapWrapper = el)} className="mapWrapper">
//         <Toolbar />
//         <Row state={this.state.map} />
//         <Row state={this.state.access} />
//       </div>
//     );
//   }
// }
// const Row = ({ state }) => {
//   const [start, set_start] = React.useState(false);
//   return (
//     <Draggable
//       axis="both"
//       handle=".handle"
//       defaultPosition={{ x: 0, y: 0 }}
//       position={null}
//       // grid={[25, 25]}
//       scale={1}
//       bounds="body"
//       onStart={() => {
//         set_start(true);
//       }}
//       onStop={() => {
//         set_start(false);
//       }}
//     >
//       <Grid
//         item
//         className="handle"
//         container
//         justifyContent="center"
//         alignItems="center"
//         style={{
//           backgroundColor: "white",
//           boxShadow: "0 0 3px #999",
//           borderRadius: 12,
//           cursor: "move",
//           width: "50%",
//           height: 50,
//           opacity: !state ? 0 : 1,

//           margin: 8,
//           transition: !start ? "0.2s" : "0s",
//         }}
//       >
//         asdasd
//       </Grid>
//     </Draggable>
//   );
// };
