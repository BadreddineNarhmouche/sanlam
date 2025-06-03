import React, { memo } from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarComponent = (props: any) => {
  const { open, severity, message, anchorOrigin } = props;
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={anchorOrigin ?? { vertical: "top", horizontal: "right" }}
    >
      <Alert
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
export default memo(SnackbarComponent);
