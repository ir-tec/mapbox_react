import { Grid } from "@material-ui/core";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useRef } from "react";
import mapboxGl, { Marker } from "mapbox-gl";

// import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

mapboxGl.accessToken = process.env.REACT_APP_MY_TOKEN;

const Map = ({ set_coordinates, coordinates }) => {
  const map = useRef();
  const mapContainer = useRef();
  // const mapDirection = useRef();

  // ------------------------------------------------------------------------------------------ map initiated
  React.useEffect(() => {
    if (map.current) return;
    map.current = new mapboxGl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v9",
      zoom: 9,
      center: [-79, 40],
    });
  }, []);

  // ------------------------------------------------------------------------------------------ map direction initiated
  // React.useEffect(() => {
  //   if (mapDirection.current) return;
  //   mapDirection.current = new MapboxDirections({
  //     accessToken: process.env.REACT_APP_MY_TOKEN,
  //     unit: "metric",
  //     profile: "mapbox/driving",
  //     steps: false,
  //     state: true,
  //     alternatives: true,
  //     overview: "simplified",
  //     continue_straight: false,
  //   });
  //   map.current.addControl(mapDirection.current, "top-right");

  // }, [mapDirection]);

  React.useEffect(() => {
    coordinates.map((item, i) => {
      const el = document.createElement("div");
      el.className = "marker";
      el.innerHTML = String.fromCharCode(i + 65);

      return new Marker(el).setLngLat([item.lng, item.lat]).addTo(map.current);
    });
  }, [coordinates]);

  // ------------------------------------------------------------------------------------------ Click Event add Coordinate
  React.useEffect(() => {
    if (!map.current) return;
    map.current.on("click", (ev) => {
      set_coordinates((pre) => [...pre, ev.lngLat]);
    });
  }, [set_coordinates]);
  return (
    <Grid
      container
      ref={mapContainer}
      style={{ height: "calc(100vh - 64px)", width: "100%" }}
    ></Grid>
  );
};

export default Map;
