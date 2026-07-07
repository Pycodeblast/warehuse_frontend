import api from "../../api/axios";



export const getRecentActivity = async () => {
  const response = await api.get("/dashboard/activity");
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats");
  return response.data;
};