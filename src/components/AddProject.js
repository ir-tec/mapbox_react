import React from "react";
import {
  Fab,
  Dialog,
  Slide,
  Grid,
  Typography,
  TextField,
  Divider,
  MenuItem,
  Button,
  Zoom,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Formik, Form } from "formik";
import { GithubPicker } from "react-color";
import { set_route_to_edit } from "../redux/actions";
import Store from "../redux/Store";

const AddProject = ({
  set_add_project,
  add_project,
  set_routes,
  set_coordinates,
  editing,
  set_editing,
  set_routeCounter,
  set_edit_open,
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
      <Zoom in={!add_project.is_add || editing}>
        <Fab
          onClick={handleOpen}
          // disabled={add_project.is_add}
          color="secondary"
          style={{ position: "absolute", bottom: 50, right: 12, zIndex: 2 }}
        >
          <Add />
        </Fab>
      </Zoom>
      <Formik
        initialValues={{
          project_name: "",
          project_mode: add_project.project_mode,
          project_type: add_project.project_type,
          first_route: "",
          initial_color: "",
        }}
        onSubmit={(values, props) => {
          set_edit_open(false);

          set_routeCounter(0);
          set_coordinates([[]]);
          set_routes([
            [{ name: values.first_route, color: values.initial_color }],
          ]);
          set_add_project({
            is_add: true,
            project_type: values.project_type,
            project_mode: values.project_mode,
            project_name: values.project_name,
          });
          set_editing(false);
          Store.dispatch(set_route_to_edit(""));
          props.resetForm();
          handleClose();
        }}
      >
        {(formik) => {
          return (
            <Form>
              <Dialog
                maxWidth="sm"
                fullWidth={true}
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                onClick={(e) => e.stopPropagation()}
              >
                <Grid
                  container
                  spacing={3}
                  xs={12}
                  item
                  style={{ margin: "0px auto" }}
                >
                  <Grid item xs={12} style={{}}>
                    <Typography variant="h5">New Project</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={8} container>
                    <Typography variant="body2" style={{ marginBottom: 8 }}>
                      Project Name
                    </Typography>
                    <TextField
                      size="small"
                      variant="outlined"
                      fullWidth
                      onChange={(e) =>
                        formik.setFieldValue("project_name", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={8} container>
                    <Typography variant="body2" style={{ marginBottom: 8 }}>
                      First Route Name
                    </Typography>
                    <TextField
                      size="small"
                      variant="outlined"
                      fullWidth
                      onChange={(e) =>
                        formik.setFieldValue("first_route", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={8} container>
                    <Typography variant="body2" style={{ marginBottom: 8 }}>
                      Project Type
                    </Typography>
                    <TextField
                      size="small"
                      onChange={(e) => {
                        // typeChange(e.target.value);
                        formik.setFieldValue("project_type", e.target.value);
                      }}
                      variant="outlined"
                      fullWidth
                      value={formik.values.project_type}
                      select
                    >
                      {types.map((item, i) => (
                        <MenuItem key={i} value={item.value}>
                          {item.title}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={8} container>
                    <Typography variant="body2" style={{ marginBottom: 8 }}>
                      Project Mode
                    </Typography>
                    <TextField
                      value={formik.values.project_mode}
                      size="small"
                      onChange={(e) => {
                        // modeChange(e.target.value);
                        formik.setFieldValue("project_mode", e.target.value);
                      }}
                      variant="outlined"
                      fullWidth
                      select
                    >
                      {modes.map((item, i) => {
                        return (
                          <MenuItem key={i} value={item.value}>
                            {item.title}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography style={{ marginBottom: 8 }} variant="body2">
                      Pick The Initial Color
                    </Typography>
                    <GithubPicker
                      width="fit-content"
                      color="#b80000"
                      onChangeComplete={(color) => {
                        formik.setFieldValue("initial_color", color.hex);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12} container justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      style={{ marginRight: 24 }}
                      color="secondary"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={
                        formik.values.project_name === "" ||
                        formik.values.initial_color === "" ||
                        formik.values.first_route === ""
                      }
                      onClick={() => {
                        formik.submitForm();
                      }}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Dialog>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AddProject;
const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide direction="down" timeout={500} ref={ref} {...props} mountOnEnter />
  );
});
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