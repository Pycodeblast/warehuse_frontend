import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const pageTitle = location.pathname
    .replace("/", "")
    .replace("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <AppBar
      position="sticky"
      elevation={1}
      className="navbar"
    >
      <Toolbar className="navbar-toolbar">
        <Box>
          <Typography variant="h6" className="navbar-title">
            {pageTitle || "Dashboard"}
          </Typography>

          <Typography variant="body2" className="navbar-subtitle">
            Warehouse AI Management System
          </Typography>
        </Box>

        <Box className="navbar-right">
          <Box className="user-info">
            <Typography className="user-name">
              {user?.username}
            </Typography>

            <Typography className="user-role">
              {user?.role?.toUpperCase()}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="error"
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;