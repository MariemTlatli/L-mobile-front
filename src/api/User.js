import axiosInstance from "./axiosInstance";

// Récupérer la liste des utilisateurs
export const getItems = async () => {
  try {
    const response = await axiosInstance.get("/admin/users");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch items";
  }
};

// Récupérer un utilisateur par son ID
export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/admin/users/${id}`);
    return response.data; // Retourne les données de l'utilisateur
  } catch (error) {
    // Gestion des erreurs
    throw error.response?.data || `Failed to fetch user with ID: ${id}`;
  }
};

// Créer un nouvel utilisateur
export const createUser = async (newUserData) => {
  try {
    const response = await axiosInstance.post(
      "/admin/create-user",
      newUserData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to create user";
  }
};

// Mettre à jour un utilisateur existant
export const UpdateUser = async (updatedData) => {
  try {
    const response = await axiosInstance.put("/admin/update-user", updatedData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to update user";
  }
};

// Supprimer un utilisateur
export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/admin/delete-user/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to delete user";
  }
};

// Modifier le rôle d'un utilisateur
export const changeUserRole = async (email, newRole) => {
  try {
    const response = await axiosInstance.post("/admin/change-role", {
      email,
      newRole,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to change user role";
  }
};
