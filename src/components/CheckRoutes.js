import {
  Chip,
  Dialog,
  Divider,
  Fab,
  Grid,
  IconButton,
  Slide,
  Typography,
  Zoom,
} from "@material-ui/core";
import { LocationSearching, Timeline, TrendingUp } from "@material-ui/icons";
import React from "react";

const CheckRoutes = ({ routes, type }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  React.useEffect(() => {
    localStorage.routes = JSON.stringify(routes);
  }, [routes]);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Zoom in={routes.length !== 0}>
        <Fab
          onClick={handleOpen}
          variant="extended"
          color="secondary"
          style={{
            position: "absolute",
            right: 4,
            top: 125,
            zIndex: 10,
            width: 160,
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          <LocationSearching style={{ marginRight: 16 }} />
          Routes
        </Fab>
      </Zoom>

      <Dialog
        maxWidth="lg"
        fullWidth={true}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted={false}
        onClick={(e) => e.stopPropagation()}
      >
        <Grid container item style={{ padding: 16 }}>
          <Grid item xs={12}>
            <Typography variant="body1">Check Routes</Typography>
          </Grid>
          <Grid item xs={12} style={{ margin: "16px 0" }}>
            <Divider />
          </Grid>
          {routes.length !== 0 && (
            <Grid item container>
              <Grid item xs={12} container>
                <Grid container alignItems="center">
                  <IconButton>
                    <TrendingUp />
                  </IconButton>
                  <Typography variant="body1">
                    {type === "directions/v5" ? "Routes" : "Trips"}
                  </Typography>
                </Grid>
                {routes.routes
                  ? routes.routes[0].legs.map((item, i) => {
                      return (
                        <Grid
                          container
                          key={i}
                          alignItems="center"
                          justifyContent="space-between"
                          style={{
                            borderBottom: "1px solid lightGray",
                            marginBottom: 8,
                          }}
                        >
                          <Grid item xs={6} container>
                            <Chip
                              label={String.fromCharCode(i + 65)}
                              variant="outlined"
                              style={{
                                height: 24,

                                width: 22,
                                marginRight: 8,
                                backgroundColor: "#f50057",
                                color: "white",
                                paddingRight: 6,
                                fontWeight: "bold",
                                boxShadow: "0 0 8px rgba(0,0,0,0.5)",
                              }}
                            />
                            <Typography variant="body2">
                              Name :{item.summary}
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography variant="body2">
                              Distance : {item.distance}
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography variant="body2">
                              Duration :{item.duration}
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                    })
                  : routes.trips[0].legs.map((item, i) => {
                      return (
                        <Grid
                          container
                          key={i}
                          alignItems="center"
                          justifyContent="space-between"
                          style={{
                            borderBottom: "1px solid lightGray",
                            marginBottom: 8,
                          }}
                        >
                          <Grid item xs={6} container>
                            <Chip
                              label={String.fromCharCode(i + 65)}
                              variant="outlined"
                              style={{
                                height: 24,

                                width: 22,
                                marginRight: 8,
                                backgroundColor: "#f50057",
                                color: "white",
                                paddingRight: 6,
                                fontWeight: "bold",
                                boxShadow: "0 0 8px rgba(0,0,0,0.5)",
                              }}
                            />
                            <Typography variant="body2">
                              Weight :{item.weight}
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography variant="body2">
                              Distance : {item.distance}
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography variant="body2">
                              Duration :{item.duration}
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                    })}
              </Grid>
            </Grid>
          )}

          {/* ------------------------------------------------------------------------way points */}
          {routes.length !== 0 && (
            <Grid item container>
              <Grid item xs={12} container>
                <Grid container alignItems="center">
                  <IconButton>
                    <Timeline />
                  </IconButton>
                  <Typography variant="body1">Way Points</Typography>
                </Grid>
                {routes.waypoints.map((item, i) => {
                  return (
                    <Grid
                      container
                      key={i}
                      justifyContent="space-between"
                      alignItems="center"
                      style={{ borderBottom: "1px solid lightGray" }}
                    >
                      <Grid item xs={4} style={{}}>
                        <Chip
                          label={String.fromCharCode(i + 65)}
                          variant="outlined"
                          style={{
                            height: 24,

                            width: 22,
                            marginRight: 8,
                            backgroundColor: "#f50057",
                            color: "white",
                            paddingRight: 6,
                            fontWeight: "bold",
                            boxShadow: "0 0 8px rgba(0,0,0,0.5)",
                          }}
                        />
                        <Typography
                          variant="body2"
                          style={{ display: "inline" }}
                        >
                          Name : {item.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="body2">
                          Distance : {item.distance}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="body2">
                          Location :{item.location[0]},{item.location[1]}
                        </Typography>
                      </Grid>
                      {type !== "directions/v5" && (
                        <>
                          <Grid item xs={2} container direction="column">
                            <Typography variant="body2">
                              Way Point index :{item.waypoint_index}
                            </Typography>

                            <Typography variant="body2">
                              Trips index :{item.trips_index}
                            </Typography>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Dialog>
    </>
  );
};

export default CheckRoutes;
const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide direction="down" timeout={500} ref={ref} {...props} mountOnEnter />
  );
});
