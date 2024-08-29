import React, { useState, useEffect } from "react";
import { getItems } from "../../api/User"; // Assuming you have an API function to get the user data
import "./company.css";
import './CompanyForm.css';


const CompanyForm = ({
  formState,
  handleChange,
  handleSave,
  handleCancel,
  editingCompany,
}) => {
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getItems();
        setUsers(usersData); // Store the entire array of users
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formState.name) newErrors.name = "Please fill out this field.";
    if (!formState.address) newErrors.address = "Please fill out this field.";
    
    // Validate phone number (example: non-empty and numeric)
    if (!formState.phone || isNaN(formState.phone)) {
      newErrors.phone = "Phone must be a valid number.";
    }

    if (!formState.userId) newErrors.userId = "Please select a user.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleSave();
    }
  };

  return (
    <div className="form-container">
      <form className="mb-3" onSubmit={(e) => e.preventDefault()}>
        <h3>{editingCompany ? "Edit Company" : "Add Company"}</h3>

        {/* Error Alert */}
        {Object.keys(errors).length > 0 && (
          <div className="alert alert-danger" role="alert">
            Please correct the errors below and try again.
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
            placeholder="Enter company name"
            required
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address <font color="red">*</font>
          </label>
          <input
            type="text"
            className={`my-input ${errors.address ? "is-invalid" : ""}`}
            id="address"
            name="address"
            value={formState.address}
            onChange={handleChange}
            placeholder="Enter company address"
            required
          />
          {errors.address && (
            <div className="error-message">{errors.address}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone <font color="red">*</font>
          </label>
          <input
            type="text"
            className={`my-input ${errors.phone ? "is-invalid" : ""}`}
            id="phone"
            name="phone"
            value={formState.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            User <font color="red">*</font>
          </label>
          <select
            className={`my-input ${errors.userId ? "is-invalid" : ""} custom-select`}
            id="userId"
            name="userId"
            value={formState.userId}
            onChange={handleChange}
            required
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.userName}
              </option>
            ))}
          </select>
          {errors.userId && <div className="error-message">{errors.userId}</div>}
        </div>

        <div className="my-buttons">
          <button type="button" className="my-add-button" onClick={handleSubmit}>
            <i className="fas fa-save"></i> Save
          </button>
          <button
            type="button"
            className="my-add-button my-cancel-button"
            onClick={handleCancel}
          >
            <i className="fas fa-times"></i> Cancel
          </button>
          <br /> <br />
        </div>
        <font color="red">*: Required field</font>
      </form>
    </div>
  );
};

export default CompanyForm;
