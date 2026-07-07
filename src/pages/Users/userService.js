import api from "../../api/axios";

/**
 * Get all users
 */
export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Get Users Error:", error);
    throw error;
  }
};

/**
 * Create User (Admin Only)
 */
export const createUser = async (userData) => {
  try {
    const response = await api.post("/users/create", userData);
    return response.data;
  } catch (error) {
    console.error("Create User Error:", error);
    throw error;
  }
};

/**
 * Update User Role (Admin Only)
 */
export const updateUserRole = async (userId, role) => {
  try {
    const response = await api.put(`/users/${userId}/role`, null, {
      params: {
        role,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Update User Role Error:", error);
    throw error;
  }
};

/**
 * Disable User (Admin Only)
 */
export const disableUser = async (userId) => {
  try {
    const response = await api.put(`/users/${userId}/disable`);
    return response.data;
  } catch (error) {
    console.error("Disable User Error:", error);
    throw error;
  }
};

/**
 * Get User By ID (Optional)
 */
export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Get User Error:", error);
    throw error;
  }
};

export const enableUser = async (userId) => {
  const response = await api.put(`/users/${userId}/enable`);
  return response.data;
};