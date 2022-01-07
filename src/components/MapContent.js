import { Grid, Toolbar } from "@material-ui/core";
import React, { Component } from "react";
import Draggable from "react-draggable";
import mapboxgl from "mapbox-gl";
import PropTypes from "prop-types";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

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
        }}
      >
        Optimization Data
      </Grid>
    </Draggable>
  );
};
export default class CMapSync extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  //

  //pass component properties to full state data
  constructor(props) {
    super(props);
    this.state = {
      CenterLat: props.CenterLat,

      CenterLan: props.CenterLan,
      DefaultZoom: props.DefaultZoom,
      route: null,
    };
  }
  componentWillUnmount() {}
  //manage component
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapWrapper,
      style: "mapbox://styles/mapbox/streets-v10",
      center: [this.state.CenterLat, this.state.CenterLan],
      zoom: this.state.DefaultZoom,
    });
  }
  render() {
    return (
      <Grid
        container
        direction="column"
        alignItems={"flex-start"}
        justifyContent="flex-start"
        item
        xs={12}
        style={{
          backgroundColor: "blanchedalmond",
          padding: 24,

          height: "100vh",
        }}
      >
        <div ref={(el) => (this.mapWrapper = el)} className="mapWrapper" />
        <Toolbar />
        <Row state={this.state.map} />
        <Row state={this.state.access} />
      </Grid>
    );
  }
}
