import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Dashboard,
  Inventory2,
  People,
  Category,
  Folder,
  SmartToy,
  Menu,
  ChevronLeft,
  Logout,
} from "@mui/icons-material";

import { usePermissions } from "../../hooks/usePermissions";
import { useAuth } from "../../context/AuthContext";

import "./Sidebar.css";

function Sidebar() {
  const { user, logout } = useAuth();
  const permission = usePermissions();

  const [collapsed, setCollapsed] = useState(false);

  if (!user || !permission) return null;

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Header */}
      <div className="sidebar-header">
        {!collapsed && (
          <div>
            <h2>Warehouse AI</h2>
            <p>ERP System</p>
          </div>
        )}

        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu /> : <ChevronLeft />}
        </button>
      </div>

      {/* User */}
      <div className="sidebar-user">
        {!collapsed && (
          <>
            <h4>{user.username}</h4>
            <span>{user.role.toUpperCase()}</span>
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className="sidebar-menu">

        <NavLink to="/dashboard">
          <Dashboard />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

       

        <NavLink to="/products">
          <Inventory2 />
          {!collapsed && <span>Inventory</span>}
        </NavLink>

        {/* Users */}
        {permission.users && (
          <NavLink to="/users">
            <People />
            {!collapsed && <span>Users</span>}
          </NavLink>
        )}

        {/* Files */}
        {permission.uploadFile && (
          <NavLink to="/files">
            <Folder />
            {!collapsed && <span>Files</span>}
          </NavLink>
        )}

        {/* AI */}
        {permission.ai && (
          <NavLink to="/ai">
            <SmartToy />
            {!collapsed && <span>AI Assistant</span>}
          </NavLink>
        )}

      </nav>

      {/* Logout */}
      {/* <button className="logout-btn" onClick={logout}>
        <Logout />

        {!collapsed && <span>Logout</span>}
      </button> */}
    </aside>
  );
}

export default Sidebar;