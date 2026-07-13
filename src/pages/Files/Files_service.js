import api from "../../api/axios";

/* -----------------------------
   GET ALL PRODUCTS
------------------------------ */

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};
export const getUploadedFiles = async () => {
  const response = await api.get("/files/");
  return response.data;
};
/* -----------------------------
   UPLOAD EXCEL FILE
------------------------------ */

export const uploadFile = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/files/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
/* -----------------------------
   DOWNLOAD UPLOADED FILE
------------------------------ */

export const downloadFile = async (fileId) => {
  const response = await api.get(`/files/download/${fileId}`);

  const link = document.createElement("a");
  link.href = response.data.download_url;
  link.download = "";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
/* -----------------------------
   EXPORT PRODUCTS TO EXCEL
------------------------------ */

export const exportProducts = async (products) => {
  const response = await api.post(
    "/files/export",
    products,
    {
      responseType: "blob",
    }
  );

  // Create download URL
  const url = window.URL.createObjectURL(
    new Blob([response.data])
  );

  // Read filename from response header
  let filename = "Product_List.xlsx";

  const disposition = response.headers["content-disposition"];

  if (disposition) {
    const match = disposition.match(/filename="?([^"]+)"?/);

    if (match) {
      filename = match[1];
    }
  }

  // Download file
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", filename);

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
};