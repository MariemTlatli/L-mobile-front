import React, { useState, useEffect } from "react";
import { getItems } from "../../api/User"; // Assuming you have an API function to get the user data
import "./company.css"; // Make sure you have the CSS for the styles

const CompanyTable = ({
  companies,
  currentCompanies,
  handleDelete,
  handleEdit,
  handlePreviousPage,
  handleNextPage,
  handlePageChange,
  currentPage,
  totalPages,
  handleAddCompany,
}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getItems();
        setUsers(usersData); // Store the entire array of users
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  const userMap = new Map(users.map((user) => [user.id, user.userName]));

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Address</th>
            <th style={{ textAlign: "center" }}>Phone</th>
            <th style={{ textAlign: "center" }}>Technician</th>
            <th style={{ textAlign: "center" }}>Operate</th>
          </tr>
        </thead>
        <tbody>
          {currentCompanies.map((company) => (
            <tr key={company.id}>
              <td style={{ textAlign: "center" }}>{company.id}</td>
              <td style={{ textAlign: "center" }}>{company.name}</td>
              <td style={{ textAlign: "center" }}>{company.address}</td>
              <td style={{ textAlign: "center" }}>{company.phone}</td>
              <td style={{ textAlign: "center" }}>
                {userMap.get(company.userId) || "Unknown"}
              </td>
              <td style={{ textAlign: "center" }}>
                <button
                  className="button-delete"
                  onClick={() => handleDelete(company.id)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
                <button
                  className="button-edit"
                  onClick={() => handleEdit(company)}
                >
                  <i className="fas fa-edit"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="6" className="pagination-footer">
              <div className="pagination_rounded">
                <ul>
                  <li>
                    <button
                      className="prev"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <i className="fa fa-angle-left" aria-hidden="true"></i>{" "}
                      Prev
                    </button>
                  </li>
                  {[...Array(totalPages).keys()].map((page) => (
                    <li key={page} className="hidden-xs">
                      <button
                        onClick={() => handlePageChange(page + 1)}
                        className={currentPage === page + 1 ? "active" : ""}
                      >
                        {page + 1}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      className="next"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next{" "}
                      <i className="fa fa-angle-right" aria-hidden="true"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="add-item-button-container">
        <button className="add-button" onClick={handleAddCompany}>
          +Add
        </button>
      </div>
    </div>
  );
};

export default CompanyTable;
