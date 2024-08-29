import React, { useState, useEffect } from "react";
import {
  getItems,
  UpdateUser,
  deleteUser,
  createUser,
  changeUserRole,
} from "../../api/User";
import "./table.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "../MyHeader/Header";
import UserTable from "./UserTable";
import UserForm from "./UserForm";

const User = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set itemsPerPage to 5
  
  const [editingItem, setEditingItem] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [formState, setFormState] = useState({
    id: "",
    userName: "",
    email: "",
    password: "",
    role: "User",
    phoneNumber: "",
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const users = await getItems();
        setItems(users);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        alert("Failed to fetch users");
      }
    };

    fetchItems();
  }, []);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handlePreviousPage = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    handlePageChange(currentPage + 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        const filteredItems = items.filter((item) => item.id !== id);
        setItems(filteredItems);
        alert("User deleted successfully");
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
        alert("Failed to delete user");
      }
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormState(item);
    setFormVisible(true);
  };

  const handleUpdateUser = async (updatedItem) => {
    try {
      const updatedUser = await UpdateUser(updatedItem);
      console.log("Utilisateur mis à jour avec succès :", updatedUser);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    }
  };

  const handleSave = async () => {
    if (editingItem) {
      const updatedItem = {
        ...editingItem,
        ...formState,
        role: editingItem.role,
      };
      try {
        const updatedUser = await UpdateUser(updatedItem);
        console.log("Utilisateur mis à jour avec succès :", updatedUser);
        const users = await getItems();
        setItems(users);
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      }
    } else {
      const newItem = {
        ...formState,
        password: formState.password,
      };
      try {
        const newUser = await createUser(newItem);
        console.log("Nouvel utilisateur créé avec succès :", newUser);
        const users = await getItems();
        setItems(users);
      } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
      }
    }

    setFormState({
      id: "",
      userName: "",
      email: "",
      password: "",
      role: "User",
      phoneNumber: "",
    });
    setEditingItem(null);
    setFormVisible(false);
  };

  const handleCancel = () => {
    setFormVisible(false);
  };

  const handleAddUser = () => {
    setFormState({
      id: "",
      userName: "",
      email: "",
      password: "",
      role: "User",
      phoneNumber: "",
    });
    setEditingItem(null);
    setFormVisible(true);
  };

  const handleChangeRole = async (email, role) => {
    try {
      await changeUserRole(email, role);
      const updatedUsers = await getItems();
      setItems(updatedUsers);
    } catch (error) {
      console.error("Erreur lors du changement de rôle de l'utilisateur :", error);
      alert("Failed to change user role");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="table-container">
      <Header />
      {isFormVisible ? (
        <UserForm
          formState={formState}
          handleChange={handleChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
          editingItem={editingItem}
        />
      ) : (
        <UserTable
          currentItems={currentItems}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleChangeRole={handleChangeRole}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
          handleAddUser={handleAddUser}
        />
      )}
    </div>
  );
};

export default User;