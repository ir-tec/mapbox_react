import { Typography } from "@material-ui/core";
import React from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

const ReactMap = ({ set_coordinates, coordinates, routes, draw }) => {
  const [viewport, setViewport] = React.useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const [popup, set_popup] = React.useState({});

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxApiAccessToken={process.env.REACT_APP_MY_TOKEN}
      {...viewport}
      width="100%"
      height="calc(100vh - 64px)"
      onViewportChange={(viewport) => setViewport(viewport)}
      onClick={(e) => {
        set_coordinates((pre) => [
          ...pre,
          { lng: e.lngLat[0], lat: e.lngLat[1] },
        ]);
      }}
    >
      {coordinates.map((item, i) => {
        return (
          <React.Fragment key={i}>
            {popup === item && (
              <Popup
                latitude={item.lat}
                longitude={item.lng}
                closeButton={false}
                offsetTop={-15}
              >
                <Typography variant="subtitle2">Lat : {item.lat}</Typography>
                <Typography variant="subtitle2">Lng : {item.lng}</Typography>
              </Popup>
            )}
            <Marker
              latitude={item.lat}
              longitude={item.lng}
              offsetTop={-14}
              offsetLeft={-10}
            >
              <div
                onMouseEnter={() => {
                  set_popup(item);
                }}
                onMouseLeave={() => {
                  set_popup({});
                }}
                className="marker"
              >
                {String.fromCharCode(i + 65)}
              </div>
            </Marker>
          </React.Fragment>
        );
      })}
    </ReactMapGL>
  );
};

export default ReactMap;
