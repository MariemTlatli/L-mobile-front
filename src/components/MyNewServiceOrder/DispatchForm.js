import React, { useState, useEffect } from "react";
import { getItems } from "../../api/User.js"; // Import the getItems function
import "./DispatchForm.css"; // Import the CSS file

const DispatchForm = () => {
  const [formState, setFormState] = useState({
    technician: "",
    dispatchDate: "",
    message: "",
    serviceOrderId: "",
  });

  const [errors, setErrors] = useState({});
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    // Fetch the list of users when the component mounts
    const fetchTechnicians = async () => {
      try {
        const users = await getItems();
        setTechnicians(users); // Assuming users are in the format [{ id, username }]
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to fetch users");
      }
    };

    fetchTechnicians();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formState.technician) {
      formErrors.technician = "Please select a technician.";
    }
    if (!formState.dispatchDate) {
      formErrors.dispatchDate = "Please select a date.";
    }
    if (!formState.message) {
      formErrors.message = "Please enter a message.";
    }
    if (!formState.serviceOrderId) {
      formErrors.serviceOrderId = "Please enter a service order ID.";
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form is valid and ready to submit!");
      // Submit the form
    }
  };

  const handleCancel = () => {
    // Handle form cancel
    alert("Form has been cancelled.");
  };

  return (
    <div className="form-container">
      <h1>Dispatch Form</h1>

      {/* Message d'alerte pour les erreurs */}
      {Object.keys(errors).length > 0 && (
        <div className="alert alert-danger" role="alert">
          Please correct the errors below and try again!
        </div>
      )}

      <form>
        <div className="form-group">
          <label htmlFor="technician">
            Technician<font color="red">*</font>
          </label>
          <select
            id="technician"
            name="technician"
            value={formState.technician}
            onChange={handleChange}
            className={errors.technician ? "error" : ""}
          >
            <option value="">Select</option>
            {technicians.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
          {errors.technician && (
            <span className="error-message">{errors.technician}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="dispatchDate">
            Dispatch Date<font color="red">*</font>
          </label>
          <input
            type="date"
            id="dispatchDate"
            name="dispatchDate"
            value={formState.dispatchDate}
            onChange={handleChange}
            className={errors.dispatchDate ? "error" : ""}
          />
          {errors.dispatchDate && (
            <span className="error-message">{errors.dispatchDate}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="message">
            Message<font color="red">*</font>
          </label>
          <textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            className={errors.message ? "error" : ""}
          />
          {errors.message && (
            <span className="error-message">{errors.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="serviceOrderId">
            Service Order ID<font color="red">*</font>
          </label>
          <input
            type="text"
            id="serviceOrderId"
            name="serviceOrderId"
            value={formState.serviceOrderId}
            onChange={handleChange}
            className={errors.serviceOrderId ? "error" : ""}
          />
          {errors.serviceOrderId && (
            <span className="error-message">{errors.serviceOrderId}</span>
          )}
        </div>
        <div className="button-container">
          <button className="button button-save" onClick={handleSave}>
            Save
          </button>
          <button className="button button-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
        <br />
        <font color="red">*: Required field</font>
      </form>
    </div>
  );
};

export default DispatchForm;
