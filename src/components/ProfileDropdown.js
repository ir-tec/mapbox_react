import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import React from "react";

import { set_auth, set_route_to_edit } from "../redux/actions";
import Store from "../redux/Store";
import ProjectManagement from "./ProjectManagement";
import Profile from "../Pages/profile/profile";

const ProfileDropdown = ({
  set_routes,
  set_coordinates,
  set_add_project,
  set_edit_open,
  set_editing,
  set_draw,
  set_routeCounter,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton onClick={handleClick}>
        <KeyboardArrowDown style={{ color: "white" }} />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={(e) => {
            handleClose();
          }}
        >
          <Profile />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            return;
          }}
        >
          <ProjectManagement
            set_routeCounter={set_routeCounter}
            set_draw={set_draw}
            set_editing={set_editing}
            set_add_project={set_add_project}
            set_routes={set_routes}
            set_coordinates={set_coordinates}
            set_edit_open={set_edit_open}
          />
        </MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.clear();
            Store.dispatch(set_auth(2));
            Store.dispatch(set_route_to_edit(""));
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileDropdown;
