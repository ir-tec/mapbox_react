import * as yup from "yup";

export const validationSchema = yup.object().shape({
  project_name: yup.string().required("Type the project name..."),
  project_mode: yup.string().required("Type the project mode..."),
  project_type: yup.string().required("Type the project type..."),
  first_route: yup.string().required("Type the project route name..."),
  initial_color: yup.string().required("Pick the initial color..."),
  country: yup.string().required("Choise the country..."),
  city: yup.string().required("Choise the city..."),
  lat: yup
    .number()
    .required("Type the Latitude...")
    .max(90, "Between 90 to -90")
    .min(-90, "Between 90 to -90"),
  lng: yup
    .number()
    .required("Type the longitude...")
    .max(90, "Between 90 to -90")
    .min(-90, "Between 90 to -90"),
});

export const initialValues = {
  project_name: "",
  project_mode: "",
  project_type: "",
  first_route: "",
  initial_color: "",
  country: "",
  city: "",
  lat: "",
  lng: "",
};
