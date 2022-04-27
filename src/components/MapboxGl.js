import { Typography } from "@material-ui/core";
import React, { useRef } from "react";
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
const MapboxGl = ({
  coordinates,
  set_coordinates,
  routes,
  draw,
  type,
  add_project,
  counter,
  editing,
}) => {
  const [popup, set_popup] = React.useState({});

  function handleClick(map, event) {
    if (add_project.is_add) {
      return set_coordinates((pre) =>
        pre.map((item, i) => {
          if (i === counter) {
            return [...item, event.lngLat];
          } else {
            return item;
          }
        })
      );
    }
    set_popup(event.lngLat);
    setTimeout(() => {
      set_popup({});
    }, 1000);
  }

  const handleClickRef = useRef(handleClick);
  handleClickRef.current = handleClick;
  console.log(routes);
  return (
    <Map
      // eslint-disable-next-line
      style={"mapbox://styles/mapbox/streets-v9"}
      onClick={(map, event) => handleClickRef.current(map, event)}
      className="map"
      center={
        add_project.lat
          ? [add_project.lat, add_project.lng]
          : [
              process.env.REACT_APP_DEFAULT_MAP_LAT,
              process.env.REACT_APP_DEFAULT_MAP_LAN,
            ]
      }
    >
      {routes.map((route, index) => {
        const linePaint = {
          "line-color":
            route[0] &&
            Object.keys(route[0]) &&
            Object.keys(route[0]).length > 2 &&
            draw
              ? route[0].color
              : "#333",
          "line-width": 3,
        };

        return (
          <Layer type="line" key={index} layout={lineLayout} paint={linePaint}>
            <Feature
              coordinates={
                route[0] &&
                Object.keys(route[0]) &&
                Object.keys(route[0]).length > 2 &&
                draw
                  ? route[0][type === "directions/v5" ? "routes" : "trips"][0]
                      .geometry.coordinates
                  : []
              }
            />
          </Layer>
        );
      })}
      {coordinates.map((coordinate, index) => {
        const POSITION_CIRCLE_PAINT = {
          "circle-stroke-width": index === counter && editing ? 5 : 3,
          "circle-radius": 7,
          "circle-color":
            routes[index].length !== 0 ? routes[index][0]?.color : "blue",
          "circle-stroke-color":
            index === counter && editing ? "black" : "white",
        };
        return (
          <Layer
            key={index}
            type="circle"
            id={index.toString()}
            layout={{}}
            paint={POSITION_CIRCLE_PAINT}
          >
            {coordinate.map((item, i) => {
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
                    if ((editing || add_project.is_add) && counter === index) {
                      set_coordinates((pre) =>
                        pre.map((coor, coor_index) => {
                          if (coor_index === counter) {
                            return coor.map((c, ci) => {
                              if (ci === i) {
                                return e.lngLat;
                              } else {
                                return c;
                              }
                            });
                          } else {
                            return coor;
                          }
                        })
                      );
                    } else {
                      return null;
                    }
                  }}
                />
              );
            })}
          </Layer>
        );
      })}
      {Object.keys(popup).length !== 0 && add_project.is_add ? (
        <Popup
          coordinates={[popup.lng, popup.lat]}
          anchor="bottom"
          offset={[0, -25]}
        >
          <Typography variant="subtitle2">lng : {popup.lng}</Typography>
          <Typography variant="subtitle2">lng : {popup.lat}</Typography>
        </Popup>
      ) : (
        Object.keys(popup).length !== 0 && (
          <Popup
            coordinates={[popup?.lng, popup?.lat]}
            anchor="bottom"
            offset={[0, -25]}
          >
            <Typography variant="subtitle2">Make a Project First</Typography>
          </Popup>
        )
      )}
    </Map>
  );
};

export default MapboxGl;
const lineLayout = {
  "line-cap": "round",
  "line-join": "round",
};

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MY_TOKEN,
});
// const colors = [
//   "#B71C1C",
//   "#263238",
//   "#880E4F",
//   "#BF360C",
//   "#4A148C",
//   "#004D40",
//   "#1DE9B6",
//   "#F57F17",
//   "#F50057",
//   "#FFD600",
//   "#651FFF",
//   "#424242",
//   "#D81B60",
//   "#0091EA",
//   "#EC407A",
//   "#455A64",
//   "#006064",
//   "#F06292",
//   "#3E2723",
//   "#283593",
// ];
