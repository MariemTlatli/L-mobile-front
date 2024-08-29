import React, { useState, useEffect, useRef } from "react";
import { getItems } from "../../api/User"; // Assuming you have an API function to get the admin data
import './ArticleForm.css';

const ArticleForm = ({
  formState,
  handleChange,
  handleSave,
  handleCancel,
  editingArticle,
}) => {
  const [errors, setErrors] = useState({});
  const [admins, setAdmins] = useState([]);
  const inputRefs = useRef({});

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const adminsData = await getItems();
        setAdmins(adminsData); // Store the entire array of admins
      } catch (error) {
        console.error("Erreur lors de la récupération des administrateurs :", error);
        alert("Failed to fetch administrators");
      }
    };

    fetchAdmins();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Vérification du champ "Category"
    if (!formState.categorie) {
      newErrors.categorie = "Please fill out this field.";
    }

    // Vérification du champ "Price"
    const Price = parseInt(formState.price, 20);
    if (!formState.price) {
      newErrors.price = "Please fill out this field.";
    } else if (isNaN(Price) || formState.price <= 0) {
      newErrors.price = "Price must be greater than 0.";
    }

    // Vérification du champ "Quantity"
    const quantity = parseInt(formState.quantity, 10);
    if (!formState.quantity) {
      newErrors.quantity = "Please fill out this field.";
    } else if (isNaN(quantity) || quantity <= 0) {
      newErrors.quantity = "Quantity must be a positive number.";
    }

    // Vérification du champ "Created By"
    if (!formState.createdById) {
      newErrors.createdById = "Please fill out this field.";
    }

    setErrors(newErrors);

    // Focus on the first invalid input
    const firstErrorKey = Object.keys(newErrors)[0];
    if (firstErrorKey && inputRefs.current[firstErrorKey]) {
      inputRefs.current[firstErrorKey].focus();
    }

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
        <h3>{editingArticle ? "Edit Article" : "Add Article"}</h3>

        {Object.keys(errors).length > 0 && (
          <div className="alert alert-danger" role="alert">
            Please correct the errors below and try again.
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="categorie" className="form-label">
            Category <font color="red">*</font>
          </label>
          <input
            type="text"
            className={`form-control ${errors.categorie ? "is-invalid" : ""}`}
            id="categorie"
            name="categorie"
            value={formState.categorie}
            onChange={handleChange}
            placeholder="Enter category"
            required
            ref={(el) => inputRefs.current.categorie = el}
          />
          {errors.categorie && (
            <div className="error-message">{errors.categorie}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price <font color="red">*</font>
          </label>
          <input
            type="number"
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
            id="price"
            name="price"
            value={formState.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
            ref={(el) => inputRefs.current.price = el}
          />
          {errors.price && (
            <div className="error-message">{errors.price}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity <font color="red">*</font>
          </label>
          <input
            type="number"
            className={`form-control ${errors.quantity ? "is-invalid" : ""}`}
            id="quantity"
            name="quantity"
            value={formState.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
            required
            ref={(el) => inputRefs.current.quantity = el}
          />
          {errors.quantity && (
            <div className="error-message">{errors.quantity}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="createdBy" className="form-label">
            Created By <font color="red">*</font>
          </label>
          <select
            className={`my-input ${errors.createdById ? "is-invalid" : ""}`}
            id="createdBy"
            name="createdById"
            value={formState.createdById}
            onChange={handleChange}
            required
            ref={(el) => inputRefs.current.createdById = el}
          >
            <option value="">Select an admin</option>
            {admins.map((admin) => (
              <option key={admin.id} value={admin.id}>
                {admin.userName}
              </option>
            ))}
          </select>

          {errors.createdById && (
            <div className="error-message">{errors.createdById}</div>
          )}
        </div>

        <div className="my-buttons">
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
            <i className="fas fa-save"></i> Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            <i className="fas fa-times"></i> Cancel
          </button>
          <br />
          <br />
        </div>
        <font color="red">*: Required field</font>
      </form>
    </div>
  );
};

export default ArticleForm;
