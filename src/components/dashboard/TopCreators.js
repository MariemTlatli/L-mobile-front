import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TopCreators.css";
import axiosInstance from "../../api/axiosInstance";

function TopCreators({ onChangePage }) {
  const handleButtonClick = () => {
    onChangePage("Users"); // Change to "ServiceOrders" page
  };

  const [creators, setCreators] = useState([]);
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await axiosInstance.get(
          "/admin-dashboard/users-names"
        );
        setCreators(response.data);
      } catch (error) {
        console.error("There was an error fetching the creators data!", error);
      }
    };

    fetchCreators();
  }, []);

  return (
    <section className="top-creators card p-4 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Top Technicians </h2>

        <a
          href="#"
          className="see-all text-primary"
          onClick={handleButtonClick}
        >
          See all
        </a>
      </div>
      <div className="creators-list list-group">
        {creators.map((creator, index) => (
          <div
            key={index}
            className="creator list-group-item d-flex align-items-center"
          >
            <div className="flex-grow-1">
              <span className="name fw-bold d-block">{creator.userName}</span>
              <small className="text-muted">{creator.role}</small>
            </div>
            <div className="rating-bar ms-auto">
              <progress value={creator.rating} max="100"></progress>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopCreators;
