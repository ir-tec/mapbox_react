import {
  Dialog,
  Divider,
  Grid,
  IconButton,
  Slide,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
import ProjectTable from "./ProjectTable";

const ProjectManagement = ({
  set_coordinates,
  set_routes,
  set_add_project,
  set_edit_open,
  set_editing,
  set_draw,
  set_routeCounter,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Typography variant="body1" onClick={handleOpen}>
        Project Management
      </Typography>

      <Dialog
        fullWidth={true}
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        onClick={(e) => e.stopPropagation()}
      >
        <Grid container style={{}}>
          <Grid container spacing={5} style={{ margin: "0px auto" }}>
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h3">Project Management</Typography>
              <IconButton onClick={handleClose}>
                <Close color="primary" fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} container>
              <Grid item container>
                <Typography variant="h4">Projects</Typography>
              </Grid>
              <ProjectTable
                set_routeCounter={set_routeCounter}
                set_draw={set_draw}
                set_editing={set_editing}
                set_edit_open={set_edit_open}
                set_add_project={set_add_project}
                set_open={setOpen}
                set_coordinates={set_coordinates}
                set_routes={set_routes}
              />
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default ProjectManagement;
const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide direction="up" timeout={500} ref={ref} {...props} mountOnEnter />
  );
});
