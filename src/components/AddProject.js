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
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Formik, Form } from "formik";

const AddProject = ({
  set_add_project,
  add_project,
  set_routes,
  set_coordinates,
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
      <Fab
        onClick={handleOpen}
        disabled={add_project.is_add}
        color="secondary"
        style={{ position: "absolute", bottom: 50, right: 12, zIndex: 2 }}
      >
        <Add />
      </Fab>
      <Formik
        initialValues={{
          project_name: "",
          project_mode: add_project.project_mode,
          project_type: add_project.project_type,
        }}
        onSubmit={(values, props) => {
          set_routes([[]]);
          set_coordinates([[]]);
          set_add_project({
            is_add: true,
            project_type: values.project_type,
            project_mode: values.project_mode,
            project_name: values.project_name,
          });
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
                      disabled={formik.values.project_name === ""}
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
