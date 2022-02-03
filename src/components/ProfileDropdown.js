import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import React from "react";

import { set_auth } from "../redux/actions";
import Store from "../redux/Store";
import ProjectManagement from "./ProjectManagement";

const ProfileDropdown = ({
  set_routes,
  set_coordinates,
  set_add_project,
  set_edit_open,
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
          }}
        >
          <ProjectManagement
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
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileDropdown;
