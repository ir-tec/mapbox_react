import { Button, Fade, Grid, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { TextFieldWrapper } from "../../components/TextField";
import {
  RegisterValidationSchema,
  regsterInitialValues,
} from "../../validation/AuthValidation";

const ChangePassword = () => {
  return (
    <Formik
      initialValues={regsterInitialValues}
      validationSchema={RegisterValidationSchema}
      validateOnMount
      onSubmit={(value, props) => {
        // try_forget(value).then((res) => {
        //   if (!res) return;
        //   props.resetForm();
        //   history.push("/");
        // });
      }}
    >
      {(formik) => {
        return (
          <Form>
            <Fade in={true} timeout={500}>
              <Grid
                item
                xs={12}
                container
                justifyContent="center"
                alignItems="center"
                className="login"
                style={{
                  height: "100vh",
                  backgroundColor: "#ECF5FF",
                }}
              >
                <Grid
                  item
                  sm={8}
                  md={6}
                  lg={4}
                  xl={3}
                  spacing={2}
                  container
                  justifyContent="center"
                  style={{
                    backgroundColor: "white",
                    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.06)",
                    border: "none",
                    margin: "auto",
                    paddingBottom: "1%",
                    paddingTop: "1%",
                  }}
                >
                  {/* ---------------------------------------------------------user login section */}

                  <Grid item xs={11} container justifyContent="center">
                    <Typography variant="h4">Change Your Password</Typography>
                  </Grid>

                  <Grid item xs={11} container justifyContent="center">
                    <Grid item xs={12} container justifyContent="flex-start">
                      <Typography variant="subtitle1">Password</Typography>
                      <TextFieldWrapper name="password" />
                    </Grid>
                    <Grid item xs={12} container justifyContent="flex-start">
                      <Typography variant="subtitle1">
                        Confirm Password
                      </Typography>
                      <TextFieldWrapper name="confirm_password" />
                    </Grid>
                  </Grid>

                  {/* ---------------------------------------------------------user register section */}

                  <Grid item xs={11} container justifyContent="flex-start">
                    <Button
                      fullWidth
                      type="submit"
                      disabled={!formik.isValid}
                      variant="contained"
                      color="secondary"
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Fade>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ChangePassword;
