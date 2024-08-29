import axiosInstance from "./axiosInstance";

export const getServiceOrders = async () => {
  try {
    const response = await axiosInstance.get("/ServiceOrder");
    return response.data;
  } catch (error) {
    console.error("Error fetching Service Orders:", error);
    throw error;
  }
};

export const addServiceOrder = async (ServiceOrder) => {
  try {
    const response = await axiosInstance.post("/ServiceOrder", ServiceOrder);
    return response.data;
  } catch (error) {
    console.error("Error adding Service Order:", error);
    throw error;
  }
};

export const updateServiceOrder = async (ServiceOrder) => {
  try {
    const response = await axiosInstance.put(
      `/ServiceOrder/${ServiceOrder.id}`,
      ServiceOrder
    );
    return response.data;
  } catch (error) {
    console.error("Error updating Service Order:", error);
    throw error;
  }
};

export const deleteServiceOrder = async (id) => {
  try {
    const response = await axiosInstance.delete(`/ServiceOrder/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Service Order:", error);
    throw error;
  }
};
