import axiosInstance from "./axiosInstance";

// Récupérer la liste des entreprises
export const getCompanies = async () => {
  try {
    const response = await axiosInstance.get("/Company");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch companies";
  }
};

export const createCompany = async (newCompanyData) => {
  try {
    // Remove the 'id' attribute from newCompanyData
    const { id, ...dataWithoutId } = newCompanyData;

    console.log("Data without ID:", dataWithoutId);
    const response = await axiosInstance.post("/Company", dataWithoutId);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to create company";
  }
};

// Mettre à jour une entreprise existante
export const updateCompany = async (updatedData) => {
  try {
    const response = await axiosInstance.put(`/Company/${updatedData.id}`, updatedData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to update company";
  }
};

// Supprimer une entreprise
export const deleteCompany = async (id) => {
  try {
    const response = await axiosInstance.delete(`/Company/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to delete company";
  }
};

// Modifier les détails d'une entreprise
export const changeCompanyDetails = async (id, updatedDetails) => {
  try {
    const response = await axiosInstance.post("/Company", {
      id,
      ...updatedDetails,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to change company details";
  }
};
