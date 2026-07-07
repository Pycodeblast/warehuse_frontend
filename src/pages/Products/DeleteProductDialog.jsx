import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { deleteProduct } from "./Productapi";

 function DeleteProductDialog({
  open,
  onClose,
  selectedProduct,
  fetchProducts,
  showSuccess,
  showError,
}){

    const [deleting, setDeleting] = useState(false);

const handleDelete = async () => {
  if (!selectedProduct) return;

  try {
    setDeleting(true);

    await deleteProduct(selectedProduct.id);

    await fetchProducts();

    showSuccess("Product deleted successfully.");

    onClose();
  } catch (error) {
    console.error(error);

    showError("Unable to delete product.");
  } finally {
    setDeleting(false);
  }
};

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Delete Product
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete
          <strong> {selectedProduct?.name}</strong>?
        </DialogContentText>

        <DialogContentText sx={{ mt: 2 }}>
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
          color="inherit"
        >
          Cancel
        </Button>

       <Button
    color="error"
    variant="contained"
    onClick={handleDelete}
    disabled={deleting}
>

    {deleting ? (
        <CircularProgress
            size={22}
            color="inherit"
        />
    ) : (
        "Delete"
    )}

</Button>

      </DialogActions>
    </Dialog>
  );
}

export default DeleteProductDialog;