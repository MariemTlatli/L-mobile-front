import React from "react";
import Articles from "../MyArticles/MyAricles";
import Appn from "../dashboard/Appn";
import People from "../People/People";
import User from "../MyUser/user.js";
import Company from "../MyCompany/company";
import ServiceOrder from "../MyNewServiceOrder/Tabs.js";

const MainContainer = ({ content, onChangePage }) => {
  const renderContent = () => {
    switch (content) {
      case "Dashboard":
        return <Appn onChangePage={onChangePage} />;
      case "Articles":
        return <Articles />;
      case "People":
        return <People />;
      case "Companies":
        return <Company />;
      case "Users":
        return <User />;
      case "Service Orders":
        return <ServiceOrder />;
      default:
        return <Appn onChangePage={onChangePage} />;
    }
  };

  return (
    <div className="main-container my-main-container">{renderContent()}</div>
  );
};

export default MainContainer;
