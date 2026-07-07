import { useEffect, useMemo, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import MainLayout from "../../layouts/MainLayout";
import { usePermissions } from "../../hooks/usePermissions";


import UserTable from "./UserTable";
import UserDialog from "./UserDialog";

import "./Users.css";
import { getUsers } from "./userService";
import RoleDialog from "./RoleDialog";
import DisableUserDialog from "./DisableDialog";
import EnableUserDialog from "./EnableUserDialog";

function Users() {

  const permission = usePermissions();

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  const [openUserDialog, setOpenUserDialog] = useState(false);

  const [openRoleDialog, setOpenRoleDialog] = useState(false);

  const [openDisableDialog, setOpenDisableDialog] = useState(false);
  
  const [openEnableDialog, setOpenEnableDialog] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const fetchUsers = async () => {
    try {

      setLoading(true);

      const data = await getUsers();

      setUsers(data);

    } catch (error) {

      console.error(error);

      showError("Unable to fetch users.");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchUsers();

  }, []);

  const filteredUsers = useMemo(() => {

    return users.filter((user) => {

      const keyword = search.toLowerCase();

      return (

        user.username?.toLowerCase().includes(keyword) ||

        user.email?.toLowerCase().includes(keyword) ||

        user.role?.toLowerCase().includes(keyword)

      );

    });

  }, [users, search]);

  const showSuccess = (message) => {

    setSnackbar({
      open: true,
      severity: "success",
      message,
    });

  };

  const showError = (message) => {

    setSnackbar({
      open: true,
      severity: "error",
      message,
    });

  };

  return (

    <MainLayout>

      <Box className="users-page">

        {/* Header */}

        <Box className="users-header">

          <Box>

            <Typography variant="h4">

              Users

            </Typography>

            <Typography className="users-subtitle">

              Manage application users

            </Typography>

          </Box>

          {permission?.createUser && (

            <Button

              variant="contained"

              startIcon={<PersonAddIcon />}

              onClick={() => setOpenUserDialog(true)}

            >

              Create User

            </Button>

          )}

        </Box>

        {/* Search */}

        <Paper className="search-section">
         

          <TextField

            fullWidth

            placeholder="Search user by name, email or role"

            value={search}

            onChange={(e) => setSearch(e.target.value)}

            InputProps={{
              startAdornment: <SearchIcon color="action" />,
            }}

          />

        </Paper>

        {/* Table */}

        <Paper className="table-section">

          {loading ? (

            <Box className="loader">

              <CircularProgress />

            </Box>

          ) : (

           <UserTable
  users={filteredUsers}
  onEditRole={(user) => {
    setSelectedUser(user);
    setOpenRoleDialog(true);
  }}
  onDisable={(user) => {
    setSelectedUser(user);
    setOpenDisableDialog(true);
  }}
  onEnable={(user) => {
    setSelectedUser(user);
    setOpenEnableDialog(true);
  }}
/>

          )}

        </Paper>

        {/* Dialogs */}

        <UserDialog
          open={openUserDialog}
          onClose={() => setOpenUserDialog(false)}
          fetchUsers={fetchUsers}
          showSuccess={showSuccess}
          showError={showError}
        />

        <RoleDialog
          open={openRoleDialog}
          onClose={() => {
            setOpenRoleDialog(false);
            setSelectedUser(null);
          }}
          selectedUser={selectedUser}
          fetchUsers={fetchUsers}
          showSuccess={showSuccess}
          showError={showError}
        />

        <DisableUserDialog
          open={openDisableDialog}
          onClose={() => {
            setOpenDisableDialog(false);
            setSelectedUser(null);
          }}
          selectedUser={selectedUser}
          fetchUsers={fetchUsers}
          showSuccess={showSuccess}
          showError={showError}
        />
        <EnableUserDialog
  open={openEnableDialog}
  onClose={() => {
    setOpenEnableDialog(false);
    setSelectedUser(null);
  }}
  selectedUser={selectedUser}
  fetchUsers={fetchUsers}
  showSuccess={showSuccess}
  showError={showError}
/>

      </Box>

      <Snackbar

        open={snackbar.open}

        autoHideDuration={3000}

        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }

        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}

      >

        <Alert

          severity={snackbar.severity}

          variant="filled"

        >

          {snackbar.message}

        </Alert>

      </Snackbar>

    </MainLayout>

  );
}

export default Users;