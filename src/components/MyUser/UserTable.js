import React from "react";
import "./table.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const UserTable = ({
  currentItems,
  handleDelete,
  handleEdit,
  handleChangeRole,
  handlePreviousPage,
  handlePageChange,
  currentPage,
  totalPages,
  handleAddUser,
}) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Phone Number</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Access Level</th>
            <th style={{ textAlign: "center" }}>Operate</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td style={{ textAlign: "center" }}>{item.id}</td>
              <td style={{ textAlign: "center" }}>{item.userName}</td>
              <td style={{ textAlign: "center" }}>{item.phoneNumber}</td>
              <td style={{ textAlign: "center" }}>{item.email}</td>
              <td style={{ textAlign: "center" }}>
                <select
                  className="list"
                  value={item.role}
                  onChange={(e) => handleChangeRole(item.email, e.target.value)}
                >
                  <option value="User">Technician</option>
                  <option value="Admin">Admin</option>
                </select>
              </td>
              <td style={{ textAlign: "center" }}>
                <button
                  className="button-delete"
                  onClick={() => handleDelete(item.id)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
                <button
                  className="button-edit"
                  onClick={() => handleEdit(item)}
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
                      <i className="fa fa-angle-left" aria-hidden="true"></i> Prev
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
                      Next <i className="fa fa-angle-right" aria-hidden="true"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="add-item-button-container">
        <button className="add-button" onClick={handleAddUser}>
          +Add
        </button>
      </div>
    </div>
  );
};

export default UserTable;