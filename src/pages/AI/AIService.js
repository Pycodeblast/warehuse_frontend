import api from "../../api/axios";

export const askAI = async (question) => {
  const response = await api.post("/ai/ask", {
    question,
  });

  return response.data;
};

export const getChatHistory = async () => {
  const response = await api.get("/ai/history");
  return response.data;
};