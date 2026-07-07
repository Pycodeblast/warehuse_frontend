import { DataGrid } from "@mui/x-data-grid";

import {
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { usePermissions } from "../../hooks/usePermissions";

function UserTable({
  users,
  onEditRole,
  onDisable,
  onEnable,
}) {

  const permission = usePermissions();

 const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 80,
  },
  {
    field: "username",
    headerName: "Username",
    flex: 1.2,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1.8,
  },
  {
    field: "role",
    headerName: "Role",
    flex: 1,
    renderCell: (params) => {
      const role = params.value;

      let color = "default";

      if (role === "admin") color = "error";
      else if (role === "manager") color = "warning";
      else color = "success";

      return (
        <Chip
          label={role.toUpperCase()}
          color={color}
          size="small"
        />
      );
    },
  },
  {
    field: "is_active",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => (
      <Chip
        label={params.value ? "Active" : "Disabled"}
        color={params.value ? "success" : "error"}
        size="small"
      />
    ),
  },
];
if (
  permission?.updateUserRole ||
  permission?.disableUser
) {
  columns.push({
    field: "actions",
    headerName: "Actions",
    flex: 1.3,
    sortable: false,

    renderCell: (params) => (
      <>
        {permission?.updateUserRole && (
          <Tooltip title="Change Role">
            <IconButton
              color="primary"
              onClick={() => onEditRole(params.row)}
            >
              <AdminPanelSettingsIcon />
            </IconButton>
          </Tooltip>
        )}

       {permission?.disableUser && (
  <>
    {params.row.is_active ? (
      <Tooltip title="Disable User">
        <IconButton
          color="warning"
          onClick={() => onDisable(params.row)}
        >
          <BlockIcon />
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title="Enable User">
        <IconButton
          color="success"
          onClick={() => onEnable(params.row)}
        >
          <CheckCircleIcon />
        </IconButton>
      </Tooltip>
    )}
  </>
)}
      </>
    ),
  });
}

  return (

    <DataGrid

      rows={users}

      columns={columns}

      getRowId={(row) => row.id}

      autoHeight

      pageSizeOptions={[5, 10, 20, 50]}

      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}

      disableRowSelectionOnClick

    />

  );
}

export default UserTable;