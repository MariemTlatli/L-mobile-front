import React, { useState } from "react";
import "./table.css";

const ServiceOrderForm = ({
  formState,
  handleChange,
  handleArticleIdsChange,
  handleSave,
  handleCancel,
}) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formState.companyId)
      newErrors.companyId = "Please fill out this field.";
    if (!formState.userId) newErrors.userId = "Please fill out this field.";
    if (!formState.status) newErrors.status = "Please select a status.";
    if (!formState.progress) newErrors.progress = "Please fill out this field.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSave();
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="mb-3">
        <h3>
          {formState.editingOrder ? "Edit Service Order" : "Add Service Order"}
        </h3>

        <div className="form-group">
          <label htmlFor="companyId" className="form-label">
            Company ID
          </label>
          <input
            type="text"
            id="companyId"
            name="companyId"
            value={formState.companyId}
            onChange={handleChange}
            className={`my-input ${errors.companyId ? "is-invalid" : ""}`}
            placeholder="Enter company ID"
          />
          {errors.companyId && <div className="error">{errors.companyId}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="userId" className="form-label">
            User ID
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formState.userId}
            onChange={handleChange}
            className={`my-input ${errors.userId ? "is-invalid" : ""}`}
            placeholder="Enter user ID"
          />
          {errors.userId && <div className="error">{errors.userId}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formState.status}
            onChange={handleChange}
            className={`my-input ${errors.status ? "is-invalid" : ""}`}
          >
            <option value="">Select status</option>
            <option value="New">New</option>
            <option value="ReadyForScheduling">Ready For Scheduling</option>
            <option value="Scheduled">Scheduled</option>
            <option value="InProgress">In Progress</option>
            <option value="TechnicallyCompleted">Technically Completed</option>
            <option value="ReadyForInvoice">Ready For Invoice</option>
            <option value="Invoiced">Invoiced</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.status && <div className="error">{errors.status}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="progress" className="form-label">
            Progress
          </label>
          <input
            type="number"
            id="progress"
            name="progress"
            value={formState.progress}
            onChange={handleChange}
            className={`my-input ${errors.progress ? "is-invalid" : ""}`}
            placeholder="Enter progress percentage"
          />
          {errors.progress && <div className="error">{errors.progress}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="articleIds" className="form-label">
            Article IDs
          </label>
          <input
            type="text"
            id="articleIds"
            name="articleIds"
            value={formState.articleIds.join(",")}
            onChange={(e) =>
              handleArticleIdsChange(
                e.target.value.split(",").map((id) => id.trim())
              )
            }
            className="my-input"
            placeholder="Enter article IDs"
          />
        </div>

        <div className="form-group">
          <button type="submit" className="button-save">
            <i className="fas fa-save"></i> Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="button-cancel"
          >
            <i className="fas fa-times"></i> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceOrderForm;
