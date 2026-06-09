import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { hideSnackbar } from "../../redux/slices/snackbarSlice";

// ─────────────────────────────────────────────────────────────────────────────
// GlobalSnackbar — mount this ONCE in App.tsx / root layout.
// It auto-shows whenever any Redux action calls showSnackbar().
// ─────────────────────────────────────────────────────────────────────────────

const GlobalSnackbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { open, message, type } = useAppSelector((state) => state.snackbar);

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return; // don't close on click-away
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{ zIndex: 99999 }}
    >
      {/* Alert is always rendered so MUI transition works correctly */}
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{
          minWidth: "280px",
          fontSize: "0.875rem",
          fontWeight: 500,
          borderRadius: "10px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
