import { Snackbar, Slide } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";

import { set_message } from "../redux/actions";
import Store from "../redux/Store";
function MessageHandler({ message }) {
  const handleClose = (event, reason) => {
    Store.dispatch(set_message({ mode: false, message: "", color: "info" }));
  };
  return (
    <Snackbar
      open={message.mode}
      onClose={handleClose}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      TransitionComponent={(props) => {
        return <Slide {...props} direction="right" />;
      }}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={message.color}
        style={{ color: "white" }}
      >
        {message.message}
      </Alert>
    </Snackbar>
  );
}

const mapStateToProps = (props) => {
  const { message } = props;

  return { message };
};
export default connect(mapStateToProps)(MessageHandler);
