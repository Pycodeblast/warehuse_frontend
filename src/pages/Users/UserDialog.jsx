import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import { createUser } from "./userService";

function UserDialog({
  open,
  onClose,
  fetchUsers,
  showSuccess,
  showError,
}) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "viewer",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClose = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      role: "viewer",
    });

    onClose();
  };

  const handleSubmit = async () => {
    if (
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      showError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await createUser(formData);

      await fetchUsers();

      showSuccess("User created successfully.");

      handleClose();
    } catch (error) {
      console.error(error);

      showError("Unable to create user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Create User</DialogTitle>

      <DialogContent>

        <TextField
          fullWidth
          margin="normal"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          select
          margin="normal"
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
          <MenuItem value="viewer">Viewer</MenuItem>
        </TextField>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={handleClose}
          color="inherit"
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
            "Create User"
          )}
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default UserDialog;