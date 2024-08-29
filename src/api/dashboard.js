import axiosInstance from "./axiosInstance";
export const getnumberCompanies = async () => {
    try {
      const response = await axiosInstance.get("/Company/count");
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to fetch companies";
    }
  };



  export const getNumberOfUser = async () => {
    try {
      const response = await axiosInstance.get("/users/count");
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to fetch items";
    }
  };
  