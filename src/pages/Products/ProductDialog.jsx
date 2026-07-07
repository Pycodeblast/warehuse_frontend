import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { createProduct, updateProduct } from "./Productapi";

function ProductDialog({
  open,
  onClose,
  fetchProducts,
  selectedProduct,
  showSuccess,
  showError,
}){
  const isEdit = Boolean(selectedProduct);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name || "",
        sku: selectedProduct.sku || "",
        price: selectedProduct.price || "",
        quantity: selectedProduct.quantity || "",
      });
    } else {
      setFormData({
        name: "",
        sku: "",
        price: "",
        quantity: "",
      });
    }
  }, [selectedProduct, open]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 const handleSubmit = async () => {
  if (
    !formData.name ||
    !formData.sku ||
    !formData.price ||
    !formData.quantity
  ) {
    showError("Please fill all fields.");
    return;
  }

  try {
    setSaving(true);

    if (isEdit) {
      await updateProduct(selectedProduct.id, formData);
    } else {
      await createProduct(formData);
    }

    await fetchProducts();

    showSuccess(
      isEdit
        ? "Product updated successfully."
        : "Product created successfully."
    );

    onClose();
  } catch (error) {
    console.error(error);

    showError("Unable to save product.");
  } finally {
    setSaving(false);
  }
};

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {isEdit ? "Edit Product" : "Add Product"}
      </DialogTitle>

      <DialogContent>

        <Grid container spacing={2} sx={{ mt: 1 }}>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="SKU"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

   <Button
    variant="contained"
    onClick={handleSubmit}
    disabled={saving}
>

    {saving ? (
        <CircularProgress
            size={22}
            color="inherit"
        />
    ) : isEdit ? (
        "Update Product"
    ) : (
        "Create Product"
    )}

</Button>

      </DialogActions>

    </Dialog>
  );
}

export default ProductDialog;