import React, { memo } from "react";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

const SnackbarComponent = (props: any) => {
  const {
    open,
    severity,
    message,
    anchorOrigin,
    handleClose = () => {},
  } = props;
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={anchorOrigin ?? { vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
        onClose={handleClose}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
export default memo(SnackbarComponent);
