import {
  Fab,
  Fade,
  Grid,
  IconButton,
  Paper,
  Popper,
  Typography,
  Zoom,
} from "@material-ui/core";
import { Edit, FiberManualRecord } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import { get_current_project } from "../api/map_api";

const EditRoute = ({
  editRoute,
  add_project,
  counter,
  set_editing,
  set_edit_open,
  edit_open,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [routes, set_routes] = React.useState([]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    set_edit_open((prev) => !prev);
  };

  return (
    <>
      <Zoom in={editRoute !== ""}>
        <Fab
          onClick={(e) => {
            handleClick(e);
            !edit_open &&
              get_current_project(editRoute).then((res) => {
                if (!res) return;

                set_routes(res.routes[0].points);
              });
          }}
          color="primary"
          style={{
            position: "absolute",
            left: 16,
            bottom: 50,
            zIndex: 10,
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          <Edit style={{}} />
        </Fab>
      </Zoom>
      <Popper
        open={edit_open && Boolean(editRoute)}
        anchorEl={anchorEl}
        placement={"top-end"}
        transition
      >
        {() => (
          <Fade in={edit_open} timeout={350}>
            <Paper
              elevation={0}
              style={{
                padding: 16,
                width: 300,
                borderRadius: 16,
                marginBottom: 16,
                maxHeight: 600,
                overflow: "auto",
              }}
            >
              <Grid container>
                {routes.map((item, i) => {
                  return (
                    <Grid key={i} item container alignItems="center">
                      <Grid item xs={9} container alignItems="center">
                        <IconButton>
                          <FiberManualRecord style={{ color: item[0].color }} />
                        </IconButton>
                        <Typography variant="body2">{item[0].name}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <IconButton
                          size="small"
                          onClick={() => {
                            set_editing(true);
                            counter(i);
                            add_project((pre) => {
                              return { ...pre, is_add: true };
                            });
                          }}
                        >
                          <Edit color="primary" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

const mapStateToProps = (props) => {
  const { editRoute } = props;

  return { editRoute };
};

export default connect(mapStateToProps)(EditRoute);
