import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

import { enableUser } from "./userService";

function EnableUserDialog({
  open,
  onClose,
  selectedUser,
  fetchUsers,
  showSuccess,
  showError,
}) {
  const handleEnable = async () => {
    try {
      await enableUser(selectedUser.id);

      showSuccess("User enabled successfully.");

      fetchUsers();

      onClose();
    } catch (error) {
      console.error(error);

      showError("Failed to enable user.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enable User</DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to enable{" "}
          <strong>{selectedUser?.username}</strong>?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={handleEnable}
        >
          Enable
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EnableUserDialog;