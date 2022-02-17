import {
  Button,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Close, CloudUpload } from "@material-ui/icons";
import { Slide } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { update_profile } from "../../api/auth_api_call";
import { TextFieldWrapper } from "../../components/TextField";
import { set_auth } from "../../redux/actions";
import Store from "../../redux/Store";
import logo from "../../asset/img/no_image.jpg";
import { profileValidation } from "../../validation/AuthValidation";

const Profile = () => {
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  let userinfo;
  const [img, set_img] = React.useState(null);
  const clear = () => {
    history.push("/");
    localStorage.clear();
    Store.dispatch(set_auth(3));
  };
  try {
    userinfo = JSON.parse(localStorage.user_info);
  } catch (error) {
    clear();
  }

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Typography variant="body1" onClick={handleOpen}>
        Profile
      </Typography>
      <Formik
        validationSchema={profileValidation}
        validateOnMount
        onSubmit={(values, props) => {
          let data = new FormData();

          data.append("username", values.username);
          data.append("password", values.password);
          data.append("email", values.email);
          data.append("address", values.address);
          data.append("phone", values.phone);
          data.append("photo", values.photo);

          update_profile(userinfo._id, data).then((res) => {
            if (!res) return;
            props.resetForm();
            localStorage.user_info = JSON.stringify(res);
            set_img(null);
            Store.dispatch(set_auth(Math.random()));
            setOpen(false);
          });
        }}
        initialValues={{
          username: "",
          password: "",
          email: "",
          phone: "",
          address: "",
          confirm_password: "",
          photo: "",
        }}
      >
        {(formik) => {
          if (userinfo.username) {
            formik.initialValues.username = userinfo.username;
          }
          if (userinfo.address) {
            formik.initialValues.address = userinfo.address;
          }
          if (userinfo.phone) {
            formik.initialValues.phone = userinfo.phone;
          }

          formik.values.email = userinfo.email;

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
                <Grid xs={12} style={{ padding: 16 }} item>
                  <Grid
                    container
                    item
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h4">Profile</Typography>
                    <IconButton onClick={handleClose}>
                      <Close />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  {/* --------------------------------------------------------------------profile items */}
                  <Grid container justifyContent="space-between">
                    <Grid item xs={8} style={{ alignSelf: "flex-end" }}>
                      <Typography variant="body2">Email</Typography>
                      <TextFieldWrapper name="email" />
                    </Grid>
                    <Grid
                      style={{
                        borderRadius: 8,
                        border: "1px solid #999",
                        position: "relative",
                        top: 16,
                        height: 150,
                      }}
                      item
                      container
                      justifyContent="center"
                      xs={3}
                    >
                      <img
                        src={
                          img
                            ? img
                            : userinfo.avatar
                            ? `${process.env.REACT_APP_BASE_URL}${userinfo.avatar}`
                            : logo
                        }
                        alt=""
                        width={"100%"}
                        height={"100%"}
                      />
                      <IconButton component="label">
                        <CloudUpload />
                        <input
                          type="file"
                          hidden
                          style={{}}
                          onChange={(e) => {
                            formik.setFieldValue("photo", e.target.files[0]);
                            set_img(URL.createObjectURL(e.target.files[0]));
                          }}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid item xs={8} style={{ margin: "16px 0" }}>
                    <Typography variant="body2">User name</Typography>
                    <TextFieldWrapper name="username" />
                  </Grid>
                  <Grid item xs={8} style={{ margin: "16px 0" }}>
                    <Typography variant="body2">Phone number</Typography>
                    <TextFieldWrapper name={"phone"} />
                  </Grid>
                  <Grid item xs={8} style={{ margin: "16px 0" }}>
                    <Typography variant="body2">Address</Typography>
                    <TextFieldWrapper name={"address"} multiline minRows={3} />
                  </Grid>
                  <Grid item xs={8} style={{ margin: "16px 0" }}>
                    <Typography variant="body2">Password</Typography>
                    <TextFieldWrapper name={"password"} type="password" />
                  </Grid>
                  <Grid item xs={8} style={{ margin: "16px 0" }}>
                    <Typography variant="body2">Confirm Password</Typography>
                    <TextFieldWrapper
                      name={"confirm_password"}
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12} style={{ margin: "16px 0" }}>
                    <Divider />
                  </Grid>
                  <Grid container justifyContent="flex-end">
                    <Button
                      style={{ marginRight: 16 }}
                      variant="outlined"
                      color="secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!formik.isValid}
                      type="submit"
                      onClick={() => formik.submitForm()}
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

export default Profile;
const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide direction="up" timeout={500} ref={ref} {...props} mountOnEnter />
  );
});
