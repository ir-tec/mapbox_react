import {
  Divider,
  Fab,
  Fade,
  Grid,
  IconButton,
  Paper,
  Popper,
  TextField,
  Typography,
  Zoom,
} from "@material-ui/core";
import { Close, Done, Save, TripOrigin } from "@material-ui/icons";
import React from "react";
import { post_project } from "../api/map_api";
import { SliderPicker } from "react-color";
import { connect } from "react-redux";
const SaveButton = ({
  is_add,
  routes,
  set_routes,
  coordinates,
  set_coordinates,
  set_add_project,
  set_routeCounter,
  set_draw,
  editing,
  editRoute,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [new_route, set_new_route] = React.useState({ name: "", color: "" });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  return (
    <>
      {/* ----------------------------------------------------save button */}
      <Zoom
        in={
          is_add.is_add &&
          !editing &&
          Boolean(is_add.project_name) &&
          !Boolean(editRoute)
        }
      >
        <Fab
          color="primary"
          disabled={!Boolean(routes[routes.length - 1][0]?.code)}
          onClick={() => {
            post_project({
              project_name: is_add.project_name,
              routes: {
                coordinates,
                mode: is_add.project_mode,
                type: is_add.project_type,
                points: routes,
              },
            }).then((res) => {
              if (!res) return;
              set_routeCounter(0);
              set_draw(false);
              set_coordinates([[]]);
              set_routes([[]]);
              set_add_project({ is_add: false });
            });
          }}
          style={{ position: "absolute", bottom: 50, right: 80, zIndex: 3 }}
        >
          <Save />
        </Fab>
      </Zoom>
      <Zoom
        in={
          is_add.is_add &&
          routes[routes.length - 1][0] !== undefined &&
          Object.values(routes[routes.length - 1][0]).length > 2
        }
      >
        <Fab
          onClick={(e) => {
            handleClick(e);
          }}
          color="secondary"
          variant="extended"
          style={{
            position: "absolute",
            bottom: 50,
            right: 150,
            zIndex: 3,
            textTransform: "capitalize",
          }}
        >
          <TripOrigin style={{ marginRight: 8 }} />
          New Route
        </Fab>
      </Zoom>
      <Popper open={open} anchorEl={anchorEl} placement={"top-end"} transition>
        {() => (
          <Fade in={open} timeout={350}>
            <Paper
              elevation={0}
              style={{
                padding: 16,
                width: 300,
                borderRadius: 16,
                marginBottom: 16,
              }}
            >
              <Typography variant="body2">Route Name</Typography>
              <TextField
                fullWidth
                variant="outlined"
                style={{ margin: "4px 0 16px " }}
                size="small"
                onChange={(e) =>
                  set_new_route({ ...new_route, name: e.target.value })
                }
              />
              <Typography variant="body2">Route Color</Typography>
              <SliderPicker
                color={new_route.color}
                onChangeComplete={(color) =>
                  set_new_route({ ...new_route, color: color.hex })
                }
              />
              <Grid item xs={12} style={{ margin: "16px 0" }}>
                <Divider />
              </Grid>
              <Grid container justifyContent="flex-end">
                <IconButton>
                  <Close color="secondary" />
                </IconButton>

                <IconButton
                  onClick={(e) => {
                    set_coordinates((pre) => [...pre, []]);
                    set_routes((pre) => [...pre, [new_route]]);
                    if (!editing) {
                      set_routeCounter((pre) => pre + 1);
                    } else {
                      set_routeCounter(routes.length);
                    }

                    set_new_route({ name: "", color: "" });
                    setOpen(false);
                  }}
                  disabled={new_route.name === "" || new_route.color === ""}
                >
                  <Done color="primary" />
                </IconButton>
              </Grid>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};
const mapStateToProps = ({ editRoute }) => {
  return { editRoute };
};
export default connect(mapStateToProps)(SaveButton);
