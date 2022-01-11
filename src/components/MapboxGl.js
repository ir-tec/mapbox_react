import { Typography } from "@material-ui/core";
import React from "react";
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MY_TOKEN,
});

const MapboxGl = ({ coordinates, set_coordinates, routes, draw, type }) => {
  const [popup, set_popup] = React.useState({});

  return (
    <Map
      // eslint-disable-next-line
      style={"mapbox://styles/mapbox/streets-v9"}
      onClick={(map, e) => {
        set_coordinates((pre) => [...pre, e.lngLat]);
      }}
      className="map"
    >
      <Layer type="line" layout={lineLayout} paint={linePaint}>
        <Feature
          coordinates={
            routes.length !== 0 && draw
              ? routes[type === "directions/v5" ? "routes" : "trips"][0]
                  .geometry.coordinates
              : []
          }
        />
      </Layer>

      <Layer type="circle" id="position-marker" paint={POSITION_CIRCLE_PAINT}>
        {coordinates.map((item, i) => {
          return (
            <Feature
              key={i}
              draggable
              coordinates={[item.lng, item.lat]}
              onMouseEnter={() => set_popup(item)}
              onMouseLeave={() => set_popup({})}
              onDragStart={() => set_popup({})}
              onDragEnd={(e) => {
                set_popup(e.lngLat);
                set_coordinates((pre) =>
                  pre.map((p, index) => {
                    if (i === index) {
                      return e.lngLat;
                    } else {
                      return p;
                    }
                  })
                );
              }}
            />
          );
        })}
      </Layer>
      {Object.keys(popup).length !== 0 && (
        <Popup
          coordinates={[popup.lng, popup.lat]}
          anchor="bottom"
          offset={[0, -25]}
        >
          <Typography variant="subtitle2">lng : {popup.lng}</Typography>
          <Typography variant="subtitle2">lng : {popup.lat}</Typography>
        </Popup>
      )}
    </Map>
  );
};

export default MapboxGl;
const lineLayout = {
  "line-cap": "round",
  "line-join": "round",
};

const linePaint = {
  "line-color": "#4790E5",
  "line-width": 5,
};
const POSITION_CIRCLE_PAINT = {
  "circle-stroke-width": 2,
  "circle-radius": 10,
  "circle-blur": 0.15,
  "circle-color": "#f50057",
  "circle-stroke-color": "white",
};
