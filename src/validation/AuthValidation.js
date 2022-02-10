import * as yup from "yup";

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Type your email...")
    .email("Email is incorrect"),
  password: yup.string().required("Type the password..."),
});
export const RegisterValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Type your email...")
    .email("Email is incorrect"),
  password: yup.string().required("Type the password..."),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Wrong password")
    .required("Type your password again"),
});

export const initialValues = {
  email: "",
  password: "",
};
export const regsterInitialValues = {
  email: "",
  password: "",
  confirm_password: "",
};
export const Try_forget_validation = yup.object({
  email: yup
    .string()
    .required("Field is required")
    .email("Format is incorrect"),
});
