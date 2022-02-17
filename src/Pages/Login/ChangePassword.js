import { Button, Fade, Grid, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import Countdown from "react-countdown";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { change_password_api, resend_token } from "../../api/auth_api_call";
import { TextFieldWrapper } from "../../components/TextField";
import {
  change_password_values,
  change_password_verification,
} from "../../validation/AuthValidation";

const ChangePassword = ({ verification_id }) => {
  const history = useHistory();
  React.useEffect(() => {
    if (!verification_id) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, []);
  let time = Date.now() + 600 * 1000;
  const [resend, set_resend] = React.useState(false);
  const Renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return (
        <Button
          onClick={() => {
            resend_token({ id: verification_id }).then((res) => {
              if (!res) return;
              set_resend((pre) => !pre);
            });
          }}
          color="primary"
        >
          Resend
        </Button>
      );
    } else {
      return (
        <Typography variant="body2" color="secondary">
          {minutes}:{seconds}
        </Typography>
      );
    }
  };
  return (
    <Formik
      initialValues={change_password_values}
      validationSchema={change_password_verification}
      validateOnMount
      onSubmit={(value, props) => {
        change_password_api({ ...value, id: verification_id }).then((res) => {
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
                    <Typography variant="h4">Change Your Password</Typography>
                  </Grid>

                  <Grid
                    item
                    xs={11}
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="body2">
                      Check your email for sended token
                    </Typography>

                    <Countdown key={resend} date={time} renderer={Renderer} />
                  </Grid>

                  <Grid item xs={11} container justifyContent="center">
                    <Grid item xs={12} container justifyContent="flex-start">
                      <Typography variant="subtitle1">Token</Typography>
                      <TextFieldWrapper name="token" />
                    </Grid>
                    <Grid item xs={12} container justifyContent="flex-start">
                      <Typography variant="subtitle1">Password</Typography>
                      <TextFieldWrapper name="password" type="password" />
                    </Grid>
                    <Grid item xs={12} container justifyContent="flex-start">
                      <Typography variant="subtitle1">
                        Confirm Password
                      </Typography>
                      <TextFieldWrapper
                        name="confirm_password"
                        type="password"
                      />
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
const mapSteteToProps = (props) => {
  const { verification_id } = props;

  return { verification_id };
};

export default connect(mapSteteToProps)(ChangePassword);
