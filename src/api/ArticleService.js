import axiosInstance from "./axiosInstance";

export const getArticles = async () => {
  try {
    const response = await axiosInstance.get("/Article");
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

export const addArticle = async (article) => {
  try {
    const response = await axiosInstance.post("/Article", article);
    return response.data;
  } catch (error) {
    console.error("Error adding article:", error);
    throw error;
  }
};

export const updateArticle = async (article) => {
  try {
    const response = await axiosInstance.put(`/Article/${article.id}`, article);
    return response.data;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};

export const deleteArticle = async (id) => {
  try {
    const response = await axiosInstance.delete(`/Article/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
};
