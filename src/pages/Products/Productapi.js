import api from "../../api/axios";

/**
 * Get all products
 */
export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Get Products Error:", error);
    throw error;
  }
};

/**
 * Get single product by ID
 */
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get Product Error:", error);
    throw error;
  }
};

/**
 * Create Product
 */
export const createProduct = async (productData) => {
  try {
    const response = await api.post("/products", productData);
    return response.data;
  } catch (error) {
    console.error("Create Product Error:", error);
    throw error;
  }
};

/**
 * Update Product
 */
export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error("Update Product Error:", error);
    throw error;
  }
};

/**
 * Delete Product
 */
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete Product Error:", error);
    throw error;
  }
};