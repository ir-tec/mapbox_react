import { AppBar, Grid, Toolbar, Typography, useTheme } from "@material-ui/core";
import React from "react";

import ProfileDropdown from "./ProfileDropdown";

const NavBar = ({
  set_coordinates,
  set_routes,
  set_add_project,
  set_edit_open,
}) => {
  const theme = useTheme();
  return (
    <AppBar style={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item></Grid>
          <Grid item>
            <Typography variant="body1">userName</Typography>
          </Grid>
          <Grid item>
            <ProfileDropdown
              set_edit_open={set_edit_open}
              set_add_project={set_add_project}
              set_coordinates={set_coordinates}
              set_routes={set_routes}
            />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
