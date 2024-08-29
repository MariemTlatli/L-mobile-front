import React, { useState } from "react";
import "./Sidebar.css";
import LogoutButton from "./logout";
import Myheaders from "./Myheaders";

const Sidebar = ({ onSelect, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsExpanded(true);
    onToggle(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
    onToggle(false);
  };

  return (
    <aside
      className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Myheaders />
      <ul>
        <li onClick={() => onSelect("Dashboard")}>
          <i className="fas fa-home"></i> <span className="text">Dashboard</span>
        </li>
        <li onClick={() => onSelect("Articles")}>
          <i className="fas fa-tasks"></i> <span className="text">Articles</span>
        </li>
        <li onClick={() => onSelect("People")}>
          <i className="fas fa-users"></i> <span className="text">People</span>
        </li>
        <li onClick={() => onSelect("Companies")}>
          <i className="fas fa-building"></i> <span className="text">Companies</span>
        </li>
        <li onClick={() => onSelect("Users")}>
          <i className="fas fa-newspaper"></i> <span className="text">Technicians</span>
        </li>  
        <li onClick={() => onSelect("Service Orders")}>
          <i className="fas fa-tasks"></i> <span className="text">Service Orders</span>
        </li> 
      </ul>
      <LogoutButton className="signout-btn"/>
    </aside>
  );
};

export default Sidebar;
