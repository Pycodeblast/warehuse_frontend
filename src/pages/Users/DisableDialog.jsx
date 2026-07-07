import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

import { disableUser } from "./userService";

function DisableUserDialog({
  open,
  onClose,
  selectedUser,
  fetchUsers,
  showSuccess,
  showError,
}) {
  const [loading, setLoading] = useState(false);

  const handleDisable = async () => {
    if (!selectedUser) return;

    try {
      setLoading(true);

      await disableUser(selectedUser.id);

      await fetchUsers();

      showSuccess("User disabled successfully.");

      onClose();
    } catch (error) {
      console.error(error);

      showError("Unable to disable user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        Disable User
      </DialogTitle>

      <DialogContent>

        <DialogContentText>
          Are you sure you want to disable
          <strong> {selectedUser?.username}</strong>?
        </DialogContentText>

        <DialogContentText sx={{ mt: 2 }}>
          The user will no longer be able to log in to the system.
        </DialogContentText>

      </DialogContent>

      <DialogActions>

        <Button
          color="inherit"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={handleDisable}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress
              size={22}
              color="inherit"
            />
          ) : (
            "Disable User"
          )}
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default DisableUserDialog;