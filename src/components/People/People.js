import React, { useState, useEffect } from "react";
import {
  getPeople,
  updatePeople,
  deletePeople,
  createPeople,
} from "../../api/people";
import { getCompanies } from "../../api/company";
import "./people.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "../MyHeader/Header";

const People = () => {
  const [items, setItems] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const [editingItem, setEditingItem] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [formState, setFormState] = useState({
    id: "",
    name: "",
    companyId: "",
    companyName: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const people = await getPeople();
        setItems(people);
      } catch (error) {
        console.error("Error fetching people:", error);
        alert("Failed to fetch people");
      }
    };

    const fetchCompanies = async () => {
      try {
        const companiesData = await getCompanies();
        setCompanies(companiesData);
      } catch (error) {
        console.error("Error fetching companies:", error);
        alert("Failed to fetch companies");
      }
    };

    fetchItems();
    fetchCompanies();
  }, []);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      try {
        await deletePeople(id);
        setItems(items.filter((item) => item.id !== id));
        alert("Person deleted successfully");
      } catch (error) {
        console.error("Error deleting person:", error);
        alert("Failed to delete person");
      }
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormState({
      id: item.id,
      name: item.name,
      companyId: item.companyId,
      companyName: item.companyName || "",
    });
    setFormVisible(true);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formState.name) newErrors.name = "Please fill out this field.";
    if (!formState.companyId) newErrors.companyId = "Please select a company.";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      if (formState.id) {
        // Update existing person
        try {
          await updatePeople(formState);
          setItems(await getPeople());
          setFormVisible(false);
          setFormState({
            id: "",
            name: "",
            companyId: "",
            companyName: "",
          });
        } catch (error) {
          console.error("Error updating person:", error);
        }
      } else {
        // Create a new person
        try {
          await createPeople(formState);
          setItems(await getPeople());
          setFormVisible(false);
          setFormState({
            id: "",
            name: "",
            companyId: "",
            companyName: "",
          });
        } catch (error) {
          console.error("Error creating person:", error);
        }
      }
    }
  };

  const handleCancel = () => {
    setFormVisible(false);
    setFormState({
      id: "",
      name: "",
      companyId: "",
      companyName: "",
    });
    setErrors({});
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleCompanyChange = (e) => {
    const selectedCompanyId = e.target.value;
    const selectedCompany = companies.find(
      (company) => company.id === selectedCompanyId
    );
    setFormState({
      ...formState,
      companyId: selectedCompanyId,
      companyName: selectedCompany ? selectedCompany.name : "",
    });
  };

  const handleAddPerson = () => {
    setEditingItem(null);
    setFormState({
      id: "",
      name: "",
      companyId: "",
      companyName: "",
    });
    setFormVisible(true);
  };

  return (
    <div className="page-content">
      <Header />
      <h1>People</h1>
      {!isFormVisible && (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>ID</th>
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>Company ID</th>
                <th style={{ textAlign: "center" }}>Company Name</th>
                <th style={{ textAlign: "center" }}>Operate</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>{item.id}</td>
                  <td style={{ textAlign: "center" }}>{item.name}</td>
                  <td style={{ textAlign: "center" }}>{item.companyId}</td>
                  <td style={{ textAlign: "center" }}>{item.companyName}</td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      className="button-delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                    <button
                      className="button-edit"
                      onClick={() => handleEdit(item)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5" className="pagination-footer">
                  <div className="pagination_rounded">
                    <ul>
                      <li>
                        <button
                          className="prev"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <i
                            className="fa fa-angle-left"
                            aria-hidden="true"
                          ></i>{" "}
                          Prev
                        </button>
                      </li>
                      {[...Array(totalPages).keys()].map((page) => (
                        <li key={page} className="hidden-xs">
                          <button
                            onClick={() => handlePageChange(page + 1)}
                            className={currentPage === page + 1 ? "active" : ""}
                          >
                            {page + 1}
                          </button>
                        </li>
                      ))}
                      <li>
                        <button
                          className="next"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next{" "}
                          <i
                            className="fa fa-angle-right"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>

          <div className="add-item-button-container">
            <button className="add-button" onClick={handleAddPerson}>
              +Add
            </button>
          </div>
        </div>
      )}

      {isFormVisible && (
        <div className="form-container">
          <h3>{formState.id ? "Edit Person" : "Add Person"}</h3>
          {/* Message d'alerte pour les erreurs */}
          {Object.keys(errors).length > 0 && (
            <div className="alert alert-danger" role="alert">
              Please correct the errors below and try again!
            </div>
          )}
          <form className="mb-3" onSubmit={(e) => e.preventDefault()}>
            {formState.id && (
              <div className="mb-3">
                <label htmlFor="id" className="form-label">
                  ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  name="id"
                  value={formState.id}
                  readOnly
                />
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name <font color="red">*</font>
              </label>
              <input
                type="text"
                className={`my-input ${errors.name ? "is-invalid" : ""}`}
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Enter name"
                required
              />
              {errors.name && (
                <div className="error-message">{errors.name}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="companyId" className="form-label">
                Company <font color="red">*</font>
              </label>
              <select
                id="companyId"
                name="companyId"
                className={`my-input ${errors.companyId ? "is-invalid" : ""}`}
                value={formState.companyId}
                onChange={handleCompanyChange}
                required
              >
                <option value="">Select a company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
              {errors.companyId && (
                <div className="error-message">{errors.companyId}</div>
              )}
            </div>

            <input
              type="hidden"
              name="companyName"
              value={formState.companyName}
            />

            <div className="my-buttons">
              <button
                type="button"
                className="my-add-button"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="my-add-button my-cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
            <br />
            <br />
            <font color="red">*: Required field</font>
          </form>
        </div>
      )}
    </div>
  );
};

export default People;
