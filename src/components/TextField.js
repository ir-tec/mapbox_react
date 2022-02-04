import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
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
export const Selectwrapper = ({ name, label, options, ...otherProps }) => {
  const [field, mata] = useField(name);

  const config = {
    ...field,
    ...otherProps,
  };

  if (mata && mata.error && mata.touched) {
    config.error = true;
    config.helpertext = mata.error;
  }

  return (
    <FormControl fullWidth size="small" variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select {...config} label={label} defaultValue="">
        {options !== undefined ? (
          options.map((item, index) => {
            return (
              <MenuItem key={index} value={item.value}>
                {item.title}
              </MenuItem>
            );
          })
        ) : (
          <MenuItem value={field.value}>{field.value}</MenuItem>
        )}
      </Select>
      {mata && mata.error && mata.touched ? (
        <Typography variant="button" color="secondary">
          {mata.error}
        </Typography>
      ) : null}
    </FormControl>
  );
};
