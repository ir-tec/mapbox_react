import { AppBar, Grid, Toolbar, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { set_auth } from "../redux/actions";
import Store from "../redux/Store";
import ProfileDropdown from "./ProfileDropdown";

const NavBar = ({
  set_coordinates,
  set_routes,
  set_add_project,
  set_edit_open,
  set_editing,
  set_draw,
  set_routeCounter,
  auth,
}) => {
  const theme = useTheme();
  let username;
  const history = useHistory();
  try {
    username = JSON.parse(localStorage.user_info).username;
  } catch (error) {
    localStorage.clear();
    history.push("/");
    Store.dispatch(set_auth(6));
  }

  return (
    <AppBar style={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item></Grid>
          <Grid item>
            <Typography variant="body1">{username}</Typography>
          </Grid>
          <Grid item>
            <ProfileDropdown
              set_routeCounter={set_routeCounter}
              set_draw={set_draw}
              set_editing={set_editing}
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
const mapSteteToProps = (props) => {
  const { auth } = props;

  return { auth };
};
export default connect(mapSteteToProps)(NavBar);
