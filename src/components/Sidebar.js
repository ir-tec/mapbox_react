import {
  Checkbox,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
} from "@material-ui/core";
import { styles } from "../styles/style";
import React from "react";

const Sidebar = ({ state, onchange }) => {
  const style = styles();

  return (
    <Drawer
      variant="permanent"
      open={true}
      style={{ width: 200 }}
      classes={{
        paper: style.sidebar,
      }}
    >
      <Grid
        container
        alignItems="flex-start"
        justifyContent="center"
        style={{}}
      >
        <Grid item style={{ height: 65 }}>
          <Typography variant="h5">LOGO</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            boxShadow: "0 0 5px rgba(0,0,0,0.2)",
            padding: 16,
            height: 200,
          }}
        >
          <FormControl component="fieldset">
            <FormLabel component="legend">Features</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.map}
                    onChange={onchange}
                    name="map"
                  />
                }
                label="Map"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.access}
                    onChange={onchange}
                    name="access"
                  />
                }
                label="Accessbility"
              />
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default Sidebar;
