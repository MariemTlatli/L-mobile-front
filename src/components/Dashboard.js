import React, { useState } from "react";
import Sidebar from "./SideBar/Sidebar";
import MainContainer from "./MainContainer/MainContainer";

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState("");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleSelect = (page) => {
    setSelectedPage(page);
  };

  const handleSidebarToggle = (expanded) => {
    setIsSidebarExpanded(expanded);
  };

  const handleChangePage = (page) => {
    setSelectedPage(page);
  };

  return (
    <div className="d-flex">
      <Sidebar onSelect={handleSelect} onToggle={handleSidebarToggle} />
      <div className={`my-content-area ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
        <MainContainer content={selectedPage} onChangePage={handleChangePage} />
      </div>
    </div>
  );
};

export default Dashboard;
