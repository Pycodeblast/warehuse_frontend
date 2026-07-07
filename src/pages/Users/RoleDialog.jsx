import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { updateUserRole } from "./userService";


function RoleDialog({
  open,
  onClose,
  selectedUser,
  fetchUsers,
  showSuccess,
  showError,
}) {
  const [role, setRole] = useState("viewer");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      setRole(selectedUser.role);
    }
  }, [selectedUser]);

  const handleSubmit = async () => {
    if (!selectedUser) return;

    try {
      setLoading(true);

      await updateUserRole(selectedUser.id, role);

      await fetchUsers();

      showSuccess("User role updated successfully.");

      onClose();
    } catch (error) {
      console.error(error);

      showError("Unable to update role.");
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
      <DialogTitle>Change User Role</DialogTitle>

      <DialogContent>

        <TextField
          fullWidth
          select
          margin="normal"
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
          <MenuItem value="viewer">Viewer</MenuItem>
        </TextField>

      </DialogContent>

      <DialogActions>

        <Button
          color="inherit"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress
              size={22}
              color="inherit"
            />
          ) : (
            "Update Role"
          )}
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default RoleDialog;