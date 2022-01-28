import { TextField } from "@material-ui/core";
import { useField } from "formik";

export const TextFieldWrapper = ({ name, ...otherProps }) => {
  const [field, mata, form] = useField(name);
  const { setValue } = form;

  const config = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
    size: "small",
  };

  if (mata && mata.error && mata.touched) {
    config.error = true;
    config.helperText = mata.error;
  }

  return (
    <TextField
      {...config}
      // className={classes.TextField}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onKeyPress={(e) => {
        if (field.name === "maxUsers") {
          if (e.which > 57 || e.which < 47) {
            e.preventDefault();
          }
        }
      }}
      classes={{}}
      inputProps={{ style: { fontSize: 14 } }}
    />
  );
};
