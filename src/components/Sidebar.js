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

const Sidebar = ({ mode, onchange, onTypeChange, type, set_routes }) => {
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
            <FormLabel component="legend">Commands</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox name="Points" />}
                label="Points"
              />
              <FormControlLabel
                control={<Checkbox name="Waypoints" />}
                label="Waypoints"
              />
              <FormControlLabel
                control={<Checkbox name="Trips" />}
                label="Trips"
              />
              <FormControlLabel
                control={<Checkbox name="Settings" />}
                label="Settings"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        {/* ---------------------------------------------------------------------------- cycles */}
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
            <FormLabel component="legend">Mode</FormLabel>
            <FormGroup>
              {modes.map((item, i) => {
                return (
                  <FormControlLabel
                    key={i}
                    control={
                      <Checkbox
                        checked={mode === item.value}
                        onChange={() => {
                          onchange(item.value);
                        }}
                      />
                    }
                    label={item.title}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
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
            <FormLabel component="legend">Type</FormLabel>
            <FormGroup>
              {types.map((item, i) => {
                return (
                  <FormControlLabel
                    key={i}
                    control={
                      <Checkbox
                        checked={type === item.value}
                        onChange={() => {
                          set_routes([]);
                          onTypeChange(item.value);
                        }}
                      />
                    }
                    label={item.title}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </Grid>
        {/* <Grid
          item
          xs={12}
          style={{
            boxShadow: "0 0 5px rgba(0,0,0,0.2)",
            padding: 16,
            height: 120,
          }}
        >
          <FormControl component="fieldset">
            <FormLabel component="legend">Oprations</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.map}
                    onChange={onchange}
                    name="Optimization"
                  />
                }
                label="Optimization"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.access}
                    onChange={onchange}
                    name="Direction"
                  />
                }
                label="Direction"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            boxShadow: "0 0 5px rgba(0,0,0,0.2)",
            padding: 16,
            height: 120,
          }}
        >
          <FormControl component="fieldset">
            <FormLabel component="legend">Projects</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.map}
                    onChange={onchange}
                    name="Optimization"
                  />
                }
                label="Optimization"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.access}
                    onChange={onchange}
                    name="Direction"
                  />
                }
                label="Direction"
              />
            </FormGroup>
          </FormControl>
        </Grid> */}
      </Grid>
    </Drawer>
  );
};

export default Sidebar;
const modes = [
  { title: "Walk", value: "walking" },
  { title: "bicycle", value: "cycling" },
  { title: "Drive", value: "driving" },
  { title: "driving-traffic", value: "driving-traffic" },
];

const types = [
  { title: "Directions", value: "directions/v5" },
  { title: "Optimized", value: "optimized-trips/v1" },
];
