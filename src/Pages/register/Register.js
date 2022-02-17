import { Grid, Typography, Button, Fade } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import Store from "../../redux/Store";
import { set_verification_id } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { register_api } from "../../api/auth_api_call";
import { TextFieldWrapper } from "../../components/TextField";

import {
  RegisterValidationSchema,
  regsterInitialValues,
} from "../../validation/AuthValidation";
const Register = () => {
  const history = useHistory();
  return (
    <Formik
      initialValues={regsterInitialValues}
      validationSchema={RegisterValidationSchema}
      validateOnMount
      onSubmit={(value, props) => {
        register_api(value).then((res) => {
          if (!res) return;
          Store.dispatch(set_verification_id(res.id));
          history.push("/verification");
        });
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
                  <Grid item xs={11} container justifyContent="center">
                    <Typography variant="h4">Wellcome Here</Typography>
                  </Grid>
                  {/* ---------------------------------------------------------user login section */}
                  <Grid item xs={11} container justifyContent="center">
                    <Grid
                      item
                      xs={12}
                      container
                      justifyContent="flex-start"
                      style={{ marginBottom: 16 }}
                    >
                      <Typography variant="subtitle1">Name</Typography>
                      <TextFieldWrapper name="username" />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      container
                      style={{ marginBottom: 16 }}
                      justifyContent="flex-start"
                    >
                      <Typography variant="subtitle1">Email Address</Typography>
                      <TextFieldWrapper name="email" />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      container
                      justifyContent="flex-start"
                      style={{ marginBottom: 16 }}
                    >
                      <Typography variant="subtitle1">Password</Typography>
                      <TextFieldWrapper name="password" type="password" />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      container
                      justifyContent="flex-start"
                      style={{ marginBottom: 16 }}
                    >
                      <Typography variant="subtitle1">
                        Confirm Password
                      </Typography>

                      <TextFieldWrapper
                        name="confirm_password"
                        type="password"
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={11} container justifyContent="flex-start">
                    <Button
                      fullWidth
                      type="submit"
                      disabled={!formik.isValid}
                      variant="contained"
                      color="secondary"
                    >
                      Register
                    </Button>
                  </Grid>
                  <Grid item xs={11} container justifyContent="flex-start">
                    <Button
                      onClick={() => history.push("/")}
                      fullWidth
                      variant="text"
                      color="secondary"
                    >
                      Login
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

export default Register;
