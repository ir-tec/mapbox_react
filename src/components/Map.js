import { Grid } from "@material-ui/core";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useRef } from "react";
import mapboxGl, { Marker } from "mapbox-gl";

mapboxGl.accessToken = process.env.REACT_APP_MY_TOKEN;

const Map = ({ set_coordinates, coordinates, routes, draw, type }) => {
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

  React.useEffect(() => {
    coordinates.map((item, i) => {
      console.log(item);
      const el = document.createElement("div");
      el.className = "marker";
      let marker = new Marker(el);
      el.innerHTML = String.fromCharCode(i + 65);
      const popup = new mapboxGl.Popup({
        offset: 10,
      }).setText(`Longitude: ${item.lng},Latitude: ${item.lat}`);
      el.addEventListener("mouseenter", (ev) => {
        popup.addTo(map.current);
      });
      el.addEventListener("mouseleave", (ev) => {
        popup.remove();
      });

      return marker
        .setLngLat([item.lng, item.lat])
        .setPopup(popup)
        .addTo(map.current);
    });
  }, [coordinates]);

  // ------------------------------------------------------------------------------------- drawing line string
  React.useEffect(() => {
    if (routes.length !== 0 && draw) {
      const router = new Date().getTime().toString();
      map.current.addSource(router, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates:
              routes[type === "directions/v5" ? "routes" : "trips"][0].geometry
                .coordinates,
          },
        },
      });
      map.current.addLayer({
        id: router,
        type: "line",
        source: router,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#4FC3F7",
          "line-width": 3,
        },
      });
    }
  }, [routes, draw, type]);

  // ------------------------------------------------------------------------------------- way points markers
  // React.useEffect(() => {
  //   if (Object.keys(routes).length > 0) {
  //     const el2 = document.createElement("div");
  //     el2.className = "wayPointMarker";
  //     routes.waypoints.forEach((item, i) => {
  //       new mapboxGl.Marker(el2)
  //         .setLngLat([item.location[0], item.location[1]])
  //         .addTo(map.current);
  //     });
  //   }
  // }, [routes]);

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
