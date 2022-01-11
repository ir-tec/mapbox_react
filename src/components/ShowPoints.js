import {
  Chip,
  Dialog,
  Divider,
  Fab,
  Grid,
  Slide,
  Typography,
  Zoom,
} from "@material-ui/core";
import { Done } from "@material-ui/icons";
import React from "react";

const ShowPoints = ({ routes, type }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Zoom in={routes.length !== 0}>
        <Fab
          onClick={handleOpen}
          variant="extended"
          style={{
            position: "absolute",
            right: 4,
            top: 180,
            zIndex: 10,
            fontWeight: "bold",
            width: 160,
            textTransform: "capitalize",
            backgroundColor: "white",
          }}
        >
          <Done style={{ marginRight: 8 }} />
          Points
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
            <Typography variant="body1">Check Points</Typography>
          </Grid>
          <Grid item xs={12} style={{ margin: "16px 0" }}>
            <Divider />
          </Grid>
          <Grid container>
            {routes.length !== 0 &&
              routes[
                type === "directions/v5" ? "routes" : "trips"
              ][0].geometry.coordinates.map((item, i) => {
                return (
                  <Grid
                    item
                    xs={3}
                    container
                    alignItems="center"
                    key={i}
                    style={{ borderBottom: "1px solid lightGray" }}
                  >
                    <Chip
                      color="primary"
                      style={{ marginRight: 8 }}
                      variant="outlined"
                      label={i + 1}
                    />
                    <Grid item>
                      <Typography variant="subtitle2">
                        Longitude : {item[0]}
                      </Typography>
                      <Typography variant="subtitle2">
                        Latitude : {item[1]}
                      </Typography>
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default ShowPoints;
const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide direction="down" timeout={500} ref={ref} {...props} mountOnEnter />
  );
});
