import { Button, Fade, Grid, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import Countdown from "react-countdown";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { resend_token, verify_email } from "../../api/auth_api_call";
import { TextFieldWrapper } from "../../components/TextField";
import { set_verification_id } from "../../redux/actions";
import Store from "../../redux/Store";

const EmailVerification = ({ verification_id }) => {
  const history = useHistory();
  const [resend, set_resend] = React.useState(false);

  const Renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return (
        <Completed handler={set_resend} verification_id={verification_id} />
      );
    } else {
      return (
        <Typography variant="body2" color="secondary">
          {minutes}:{seconds}
        </Typography>
      );
    }
  };
  let time = Date.now() + 600 * 1000;
  React.useEffect(() => {
    if (!verification_id) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <Formik
      initialValues={{ token: "" }}
      validateOnMount
      onSubmit={(value, props) => {
        verify_email(verification_id, value.token).then((res) => {
          if (!res) return;
          Store.dispatch(set_verification_id(null));
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
                    <Typography variant="h4">Verify Your Email</Typography>
                  </Grid>

                  <Grid item xs={11} container justifyContent="flex-start">
                    <Typography variant="body2">
                      Check your email for verified code
                    </Typography>
                  </Grid>
                  <Grid item xs={11} container justifyContent="center">
                    <Countdown key={resend} date={time} renderer={Renderer} />
                  </Grid>
                  <Grid item xs={11} container justifyContent="center">
                    <Grid item xs={12} container justifyContent="flex-start">
                      <Typography variant="subtitle1">Code</Typography>
                      <TextFieldWrapper name="token" />
                    </Grid>
                  </Grid>

                  {/* ---------------------------------------------------------user register section */}

                  <Grid item xs={11} container justifyContent="flex-start">
                    <Button
                      fullWidth
                      type="submit"
                      // disabled={formik.values.token === ""}
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

export default connect(mapSteteToProps)(EmailVerification);
const Completed = ({ handler, verification_id }) => {
  return (
    <Button
      onClick={() => {
        resend_token({ id: verification_id }).then((res) => {
          if (!res) return;
          handler((pre) => !pre);
        });
      }}
      color="primary"
    >
      Resend
    </Button>
  );
};
