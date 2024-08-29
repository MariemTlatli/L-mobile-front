import axiosInstance from "./axiosInstance";

// Get all dispatchers for a specific service order
const getDispatchersByServiceOrder = async (serviceOrderId) => {
  const response = await axiosInstance.get("/Dispatcher");
  return response.data;
};

// Add a new dispatcher
const addDispatcher = async (dispatcherData) => {
  const response = await axiosInstance.post("/Dispatcher", dispatcherData);
  return response.data;
};

// Edit an existing dispatcher
const editDispatcher = async (dispatcherId, updatedDispatcherData) => {
  const response = await axiosInstance.put(
    `/Dispatcher/${dispatcherId}`, dispatcherId,
    updatedDispatcherData
  );
  return response.data;
};

// Delete a dispatcher
const deleteDispatcher = async (dispatcherId) => {
  const response = await axiosInstance.delete(`/Dispatcher/${dispatcherId}`);
  return response.data;
};

export default {
  getDispatchersByServiceOrder,
  addDispatcher,
  editDispatcher,
  deleteDispatcher,
};
