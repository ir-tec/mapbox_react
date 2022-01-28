import {
  Grid,
  Typography,
  Checkbox,
  Button,
  Fade,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { TextFieldWrapper } from "../../components/TextField";

import { styles } from "../../styles/MainStyles";
import { useHistory } from "react-router-dom";
import {
  initialValues,
  validationSchema,
} from "../../validation/AuthValidation";
import { login_api } from "../../api/auth_api_call";
const Login = () => {
  const [checked, setChecked] = React.useState(false);

  const classes = styles();
  const history = useHistory();
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={(value, props) => {
        login_api(value);
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
                  <Grid item xs={11} container justifyContent="center">
                    <Grid item xs={12} container justifyContent="flex-start">
                      <Typography variant="subtitle1">Email Address</Typography>
                      <TextFieldWrapper name="email" />
                    </Grid>
                    <Grid item xs={12} container justifyContent="flex-start">
                      <Typography variant="subtitle1">Password</Typography>
                      <TextFieldWrapper name="password" type="password" />
                    </Grid>
                  </Grid>

                  {/* ---------------------------------------------------------user register section */}

                  <Grid item xs={11} container justifyContent="flex-start">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox checked={checked} onChange={handleChange} />
                        }
                        label="Remember me"
                        classes={{ label: classes.checkLabel }}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={11} container justifyContent="flex-start">
                    <Button
                      fullWidth
                      type="submit"
                      disabled={!formik.isValid}
                      variant="contained"
                      color="secondary"
                    >
                      Login
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

export default Login;
