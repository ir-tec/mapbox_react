import { Button, Fade, Grid, Typography } from "@material-ui/core";
import { Done } from "@material-ui/icons";
import { Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { try_forget } from "../../api/auth_api_call";
import { TextFieldWrapper } from "../../components/TextField";
import { Try_forget_validation } from "../../validation/AuthValidation";

const TryForget = () => {
  const history = useHistory();
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={Try_forget_validation}
      validateOnMount
      onSubmit={(value, props) => {
        try_forget(value).then((res) => {
          if (!res) return;
          props.resetForm();
          history.push("/");
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
                  {/* ---------------------------------------------------------user login section */}

                  <Grid item xs={11} container justifyContent="center">
                    <Typography variant="h4">Wellcome Back</Typography>
                  </Grid>
                  <Grid item xs={11} container alignItems="flex-end">
                    <Done fontSize="medium" />
                    <Typography variant="subtitle2">
                      A link will send to your Email For changing your Password
                    </Typography>
                  </Grid>
                  <Grid item xs={11} container justifyContent="center">
                    <Grid item xs={12} container justifyContent="flex-start">
                      <Typography variant="subtitle1">Email Address</Typography>
                      <TextFieldWrapper name="email" />
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
                      Send Link
                    </Button>
                  </Grid>
                  <Grid item xs={11} container justifyContent="flex-start">
                    <Button
                      fullWidth
                      onClick={() => {
                        history.push("/register");
                      }}
                      variant="text"
                      color="primary"
                    >
                      Register
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

export default TryForget;
