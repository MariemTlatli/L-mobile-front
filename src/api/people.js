import axiosInstance from "./axiosInstance";

// Récupérer la liste des personnes
export const getPeople = async () => {
  try {
    const response = await axiosInstance.get("/People");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch people";
  }
};

// Créer une nouvelle personne
export const createPeople = async (newPersonData) => {
  try {
    console.log(newPersonData);
    const response = await axiosInstance.post("/People", newPersonData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to create person";
  }
};

// Mettre à jour une personne existante
export const updatePeople = async (updatedData) => {
  try {
    const response = await axiosInstance.put(`/People/${updatedData.id}`, updatedData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to update person";
  }
};

// Supprimer une personne
export const deletePeople = async (id) => {
  try {
    const response = await axiosInstance.delete(`/People/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to delete person";
  }
};

// Modifier les détails d'une personne
export const changePeopleDetails = async (id, updatedDetails) => {
  try {
    const response = await axiosInstance.post("/People", {
      id,
      ...updatedDetails,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to change person details";
  }
};
