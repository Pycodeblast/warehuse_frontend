import { useEffect, useMemo, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  CircularProgress,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import MainLayout from "../../layouts/MainLayout";
import { usePermissions } from "../../hooks/usePermissions";

import "./Products.css";
import { getProducts } from "./Productapi";
import DeleteProductDialog from "./DeleteProductDialog";
import ProductDialog from "./ProductDialog";
import ProductTable from "./Producttable";

function Products() {
  const permission = usePermissions();
  
  const [products, setProducts] = useState([]);

const [loading, setLoading] = useState(false);

const [search, setSearch] = useState("");
const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

const [selectedProduct, setSelectedProduct] = useState(null);

const [error, setError] = useState("");
  // Product List

  // Search Text


  // Dialog States
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // Selected Product
  const [snackbar, setSnackbar] = useState({
  open: false,
  severity: "success",
  message: "",
});
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

const handleCloseSnackbar = () => {
  setSnackbar((prev) => ({
    ...prev,
    open: false,
  }));
};
  const fetchProducts = async () => {
  try {
    setLoading(true);

    const data = await getProducts();

    setProducts(data);

    setError("");
  } catch (err) {
    console.error(err);

    setError("Failed to load products.");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchProducts();
}, []);


const filteredProducts = useMemo(() => {
  return products.filter((product) => {
    const keyword = search.toLowerCase();

    return (
      product.name?.toLowerCase().includes(keyword) ||
      product.sku?.toLowerCase().includes(keyword)
    );
  });
}, [products, search]);

  return (
    <MainLayout>
      <Box className="products-page">

        {/* Header */}
        <Box className="products-header">

          <Box>
            <Typography variant="h4">
              Products
            </Typography>

            <Typography className="products-subtitle">
              Manage all warehouse products
            </Typography>
          </Box>

          {permission?.createProduct && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenAddDialog(true)}
            >
              Add Product
            </Button>
          )}

        </Box>

        {/* Search Bar */}

     <Paper className="search-section">

  <TextField
    fullWidth
    placeholder="Search by Product Name or SKU"

    value={search}

    onChange={(e) => setSearch(e.target.value)}

    InputProps={{
      startAdornment: <SearchIcon color="action" />,
    }}
  />

</Paper>

        {/* Product Table */}

    <Paper className="table-section">

  {loading ? (
    <Box className="loader">

      <CircularProgress />

    </Box>
  ) : error ? (
    <Typography color="error">

      {error}

    </Typography>
  ) : (
    <Typography>

      Total Products : {filteredProducts?.length}

    </Typography>
  )}
  <ProductTable
    products={filteredProducts}
    onEdit={(product) => {
        setSelectedProduct(product);
        setOpenEditDialog(true);
    }}
    onDelete={(product) => {
        setSelectedProduct(product);
        setOpenDeleteDialog(true);
    }}
/>

</Paper>

        {/* Dialogs */}
<ProductDialog
  open={openAddDialog || openEditDialog}
  onClose={() => {
    setOpenAddDialog(false);
    setOpenEditDialog(false);
    setSelectedProduct(null);
  }}
  fetchProducts={fetchProducts}
  selectedProduct={selectedProduct}
   showSuccess={showSuccess}
  showError={showError}
/>


        <DeleteProductDialog
  open={openDeleteDialog}
  onClose={() => {
    setOpenDeleteDialog(false);
    setSelectedProduct(null);
  }}
  selectedProduct={selectedProduct}
  fetchProducts={fetchProducts}
    showSuccess={showSuccess}
  showError={showError}
/>

      </Box>
      <Snackbar
  open={snackbar.open}
  autoHideDuration={3000}
  onClose={handleCloseSnackbar}
  anchorOrigin={{
    vertical: "top",
    horizontal: "right",
  }}
>
  <Alert
    severity={snackbar.severity}
    onClose={handleCloseSnackbar}
    variant="filled"
    sx={{ width: "100%" }}
  >
    {snackbar.message}
  </Alert>
</Snackbar>
    </MainLayout>
  );
}

export default Products;