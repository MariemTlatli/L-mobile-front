import React, { useState } from "react";
import "./table.css";

const UserForm = ({
  formState,
  handleChange,
  handleSave,
  handleCancel,
  editingItem,
}) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Phone number validation
    if (formState.phoneNumber.length === 8) {
      newErrors.phoneNumber = "Phone number must contain +216.";
    }

    // Email validation
    if (!formState.email.includes("@") || !formState.email.includes(".")) {
      newErrors.email = "Email is not valid.";
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(formState.password)) {
      newErrors.password =
        "Password must contain an uppercase letter, a symbol, and a number.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSaveClick = () => {
    if (validateForm()) {
      handleSave();
    }
  };

  return (
    <div className="form-container">
      <form className="mb-3" onSubmit={(e) => e.preventDefault()}>
        <h3>{editingItem ? "Edit User" : "Add User"}</h3>

        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className={`my-input ${errors.userName ? "is-invalid" : ""}`}
            id="userName"
            name="userName"
            value={formState.userName}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
          {errors.userName && (
            <div className="error-message">{errors.userName}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className={`my-input ${errors.phoneNumber ? "is-invalid" : ""}`}
            id="phoneNumber"
            name="phoneNumber"
            value={formState.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
          {errors.phoneNumber && (
            <div className="error-message">{errors.phoneNumber}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`my-input ${errors.email ? "is-invalid" : ""}`}
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`my-input ${errors.password ? "is-invalid" : ""}`}
            id="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            className={`my-input ${errors.role ? "is-invalid" : ""}`}
            id="role"
            name="role"
            value={formState.role}
            onChange={handleChange}
            required
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          {errors.role && <div className="error-message">{errors.role}</div>}
        </div>

        <div className="my-buttons">
          <button
            type="button"
            className="my-add-button"
            onClick={handleSaveClick}
          >
            <i className="fas fa-save"></i> Save
          </button>
          <button
            type="button"
            className="my-add-button my-cancel-button"
            onClick={handleCancel}
          >
            <i className="fas fa-times"></i> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
