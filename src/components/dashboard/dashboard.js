import React, { useState, useEffect } from "react";
import { getnumberCompanies, getNumberOfUser } from "../../api/dashboard"; // Assurez-vous que le chemin est correct
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./dashboard.css";

function Dashboard() {
  const [numberOfCompanies, setNumberOfCompanies] = useState(null);
  const [numberOfUsers, setNumberOfUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companiesData = await getnumberCompanies();
        setNumberOfCompanies(companiesData);

        const usersData = await getNumberOfUser();
        setNumberOfUsers(usersData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="dashboard">
      <h2>Welcome to your dashboard</h2>
      <div className="stats">
        <div className="stat-box">
          <p>
            <b>12,361</b>
          </p>
          <span>
            Service <br /> complited 
          </span>
          <span className="stat-change">+14%</span>
        </div>
        <div className="stat-box">
          <p>
            <b>431,225</b>
          </p>
          <span>Service in progress</span>
          <span className="stat-change">+27%</span>
        </div>
        <div className="stat-box">
          <p>
            <b>{numberOfCompanies !== null ? numberOfCompanies : "Loading..."}</b>
          </p>
          <span>Number of companies</span>
          <span className="stat-change">+5%</span>
        </div>
        <div className="stat-box">
          <p>
            <b>{numberOfUsers !== null ? numberOfUsers : "Loading..."}</b>
          </p>
          <span>Number of Technicians </span>
          <span className="stat-change">+43%</span>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
