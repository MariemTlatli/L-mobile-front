import React, { useState } from "react";
import "./Myheaders.css";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";

const Myheaders = () => {
  const [logo, setLogo] = useState("L-mobile-logo-transparent.png");
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="logo-container">
      <button onClick={goToDashboard} style={{ background: 'none', border: 'none', padding: 0 }}>
        <img className="logo-image" src={logo} style={{ width: '150px', height: 'auto' }} alt="Logo" />
      </button>
      <input
        type="file"
        accept="image/*"
        onChange={handleLogoChange}
        className="modify-logo-input"
      />
      <button className="modify-button" onClick={() => document.querySelector('.modify-logo-input').click()}>
        <FaPencilAlt />
      </button>
    </div>
  );
};

export default Myheaders;
