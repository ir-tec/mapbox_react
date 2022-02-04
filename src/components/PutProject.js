import { Fab, useTheme, Zoom } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import { put_current_project } from "../api/map_api";

const PutProject = ({
  editing,
  editRoute,
  routes,
  coordinates,
  set_editing,
  set_edit_open,
}) => {
  const theme = useTheme();
  return (
    <Zoom in={editing}>
      <Fab
        onClick={() =>
          put_current_project(editRoute, { routes, coordinates }).then(
            (res) => {
              if (!res) return;
              //   set_editing(false);
              set_edit_open(false);
            }
          )
        }
        style={{
          position: "absolute",
          left: 80,
          backgroundColor: theme.palette.success.main,
          bottom: 50,
          zIndex: 10,
        }}
      >
        <CheckCircle style={{ color: "white" }} />
      </Fab>
    </Zoom>
  );
};

const mapStateToProps = ({ editRoute }) => {
  return { editRoute };
};

export default connect(mapStateToProps)(PutProject);
