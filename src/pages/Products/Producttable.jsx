import { DataGrid } from "@mui/x-data-grid";

import {
  Box,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { usePermissions } from "../../hooks/usePermissions";

import "./ProductTable.css";

function ProductTable({
  products,
  onEdit,
  onDelete,
}) {
  const permission = usePermissions();

  const columns = [
    {
      field: "name",
      headerName: "Product Name",
      flex: 1.5,
      minWidth: 180,
    },
    {
      field: "sku",
      headerName: "SKU",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => `₹${params.value}`,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Chip
          label={
            params.row.quantity > 0
              ? "In Stock"
              : "Out of Stock"
          }
          color={
            params.row.quantity > 0
              ? "success"
              : "error"
          }
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 140,
      sortable: false,
      filterable: false,

      renderCell: (params) => (
        <Box>

          {permission?.editProduct && (
            <Tooltip title="Edit Product">

              <IconButton
                color="primary"
                onClick={() => onEdit(params.row)}
              >
                <EditIcon />
              </IconButton>

            </Tooltip>
          )}

          {permission?.deleteProduct && (
            <Tooltip title="Delete Product">

              <IconButton
                color="error"
                onClick={() => onDelete(params.row)}
              >
                <DeleteIcon />
              </IconButton>

            </Tooltip>
          )}

        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 550, width: "100%" }}>

      <DataGrid
        rows={products || []}
        columns={columns}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        sx={{
          border: "none",

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            fontWeight: "bold",
          },

          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
          },
        }}
      />

    </Box>
  );
}

export default ProductTable;