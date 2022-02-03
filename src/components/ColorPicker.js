import { Button } from "@material-ui/core";
import React from "react";
import { ChromePicker } from "react-color";

const ColorPicker = () => {
  const [displayColorPicker, set_displayColorPicker] = React.useState(false);

  const handleClick = () => {
    set_displayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    set_displayColorPicker(false);
  };

  const popover = {
    position: "absolute",
    zIndex: "2",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClick}>
        Initial Color
      </Button>
      {displayColorPicker ? (
        <div style={popover}>
          <div style={cover} onClick={handleClose} />
          <ChromePicker />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
