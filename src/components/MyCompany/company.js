import React, { useState, useEffect } from "react";
import {
  getCompanies,
  updateCompany,
  deleteCompany,
  createCompany,
} from "../../api/company";
import CompanyTable from "./CompanyTable";
import CompanyForm from "./CompanyForm";
import "./company.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "../MyHeader/Header";

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTableVisible, setTableVisible] = useState(true);
  const [formErrorMessage, setFormErrorMessage] = useState(""); // State to store the form error message
  const itemsPerPage = 2;
  const totalPages = Math.ceil(companies.length / itemsPerPage);

  const [editingCompany, setEditingCompany] = useState(null);
  const [formState, setFormState] = useState({
    id: "",
    name: "",
    address: "",
    phone: "",
    userId: "",
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesData = await getCompanies();
        setCompanies(companiesData);
      } catch (error) {
        console.error("Error fetching companies:", error);
        alert("Failed to fetch companies");
      }
    };

    fetchCompanies();
  }, []);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const indexOfLastCompany = currentPage * itemsPerPage;
  const indexOfFirstCompany = indexOfLastCompany - itemsPerPage;
  const currentCompanies = companies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        await deleteCompany(id);
        const companiesData = await getCompanies();
        setCompanies(companiesData);
        alert("Company deleted successfully");
      } catch (error) {
        console.error("Error deleting company:", error);
        alert("Failed to delete company");
      }
    }
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setFormState(company);
    setTableVisible(false);
  };

  const handleUpdateCompany = async (updatedCompany) => {
    try {
      const updatedData = await updateCompany(updatedCompany);
      const updatedCompanies = companies.map((company) =>
        company.id === updatedCompany.id ? updatedData : company
      );
      setCompanies(updatedCompanies);
    } catch (error) {
      console.error("Error updating company:", error);
      setFormErrorMessage("Failed to update company");
    }
  };

  const handleSave = async () => {
    setFormErrorMessage(""); // Clear any previous error messages

    try {
      if (editingCompany) {
        const updatedCompany = {
          ...editingCompany,
          ...formState,
        };
        await handleUpdateCompany(updatedCompany);
        const companiesData = await getCompanies();
        setCompanies(companiesData);
      } else {
        const newCompany = {
          ...formState,
        };
        await createCompany(newCompany);
        const companiesData = await getCompanies();
        setCompanies(companiesData);
      }
      setEditingCompany(null);
      setTableVisible(true);
    } catch (error) {
      console.error("Error adding or updating company:", error);
      setFormErrorMessage("Failed to add company"); // Set error message for adding
    }
  };

  const handleCancel = () => {
    setEditingCompany(null);
    setTableVisible(true);
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCompany = () => {
    setEditingCompany(null);
    setFormState({
      id: "",
      name: "",
      address: "",
      phone: "",
      userId: "",
    });
    setTableVisible(false);
  };

  return (
    <div className="page-content">
      <Header />
      <h1>Companies</h1>
      {isTableVisible ? (
        <CompanyTable
          companies={companies}
          currentCompanies={currentCompanies}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          currentPage={currentPage}
          totalPages={totalPages}
          handleAddCompany={handleAddCompany}
        />
      ) : (
        <CompanyForm
          formState={formState}
          handleChange={handleChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
          editingCompany={editingCompany}
          formErrorMessage={formErrorMessage} // Pass the general form error message to the form
        />
      )}
    </div>
  );
};

export default Company;
