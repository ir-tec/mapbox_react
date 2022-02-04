import {
  Button,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Slide,
  Typography,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { Form, Formik } from "formik";
import { TextFieldWrapper, Selectwrapper } from "../components/TextField";
import React from "react";
import { put_project_doc } from "../api/map_api";

const EditProjectName = ({ set_data, data, id }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton onClick={handleOpen}>
        <Edit />
      </IconButton>
      <Formik
        initialValues={{
          project_name: data.project_name,
          city: data.city,
          country: data.country,
        }}
        onSubmit={(values, props) => {
          put_project_doc(id, values).then((res) => {
            if (!res) return;
            set_data((pre) =>
              pre.map((item) => {
                if (item._id === id) {
                  return { ...item, ...values };
                } else {
                  return item;
                }
              })
            );

            setOpen(false);
          });
        }}
      >
        {(formik) => {
          let cities = city1.filter((item, i) => {
            return item.country === formik.values.country;
          });

          return (
            <Form>
              <Dialog
                maxWidth="sm"
                fullWidth={true}
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted={false}
                onClick={(e) => e.stopPropagation()}
              >
                <Grid container style={{ padding: 16 }}>
                  <Typography variant="h5">Edit Project documents</Typography>
                  <Grid item xs={12} style={{ margin: "16px 0" }}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12} style={{ margin: "16px 0" }}>
                    <Typography variant="body2">Project name</Typography>
                    <TextFieldWrapper name="project_name" />
                  </Grid>
                  <Grid item xs={12} style={{ margin: "16px 0" }}>
                    <Typography variant="body2">Project Country</Typography>
                    <Selectwrapper
                      name="country"
                      options={countries}
                      onChange={(e) => {
                        formik.setFieldValue("country", e.target.value);
                        formik.setFieldValue("city", "");
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ margin: "16px 0" }}>
                    <Typography variant="body2">Project City</Typography>
                    <Selectwrapper name="city" options={cities} />
                  </Grid>
                  <Grid item xs={12} style={{ margin: "16px 0" }}>
                    <Divider />
                  </Grid>
                  <Grid container justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      style={{ marginRight: 16 }}
                      color="secondary"
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                    <Button
                      type="submit"
                      onClick={() => formik.submitForm()}
                      disabled={
                        formik.values.country === "" ||
                        formik.values.city === "" ||
                        formik.values.project_name === ""
                      }
                      variant="contained"
                      color="primary"
                    >
                      Submit
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

export default EditProjectName;
const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide direction="down" timeout={500} ref={ref} {...props} mountOnEnter />
  );
});
const countries = [
  { title: "England", value: "en" },
  { title: "United State", value: "us" },
];

const city1 = [
  { title: "California", value: "california", country: "us" },
  { title: "New York", value: "newyork", country: "us" },
  { title: "London", value: "london", country: "en" },
  { title: "Birmingham", value: "birmingham", country: "en" },
];
