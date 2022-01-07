import {
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

const CheckRoutes = ({ routes }) => {
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
            top: 70,
            zIndex: 10,
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          <LocationSearching style={{ marginRight: 16 }} />
          Routes
        </Fab>
      </Zoom>

      <Dialog
        maxWidth="md"
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
                  <Typography variant="body1">Routes</Typography>
                </Grid>
                {routes.routes[0].legs.map((item, i) => {
                  return (
                    <Grid
                      container
                      key={i}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item xs={6}>
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
                    <Grid container key={i} justifyContent="space-between">
                      <Grid item xs={6}>
                        <Typography variant="body2">
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
