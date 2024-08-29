import React, { useState, useEffect } from "react";
import { getItems } from "../../api/User";
import "./table.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ArticleTable = ({
  articles,
  currentArticles,
  handleDelete,
  handleEdit,
  handlePreviousPage,
  handleNextPage,
  currentPage,
  totalPages,
  handleAddArticle,
  handlePageChange,
}) => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const adminsData = await getItems();
        setAdmins(adminsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des administrateurs :", error);
        alert("Failed to fetch administrators");
      }
    };

    fetchAdmins();
  }, []);

  const userMap = new Map(admins.map(user => [user.id, user.userName]));

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Category</th>
            <th style={{ textAlign: "center" }}>Price</th>
            <th style={{ textAlign: "center" }}>Quantity</th>
            <th style={{ textAlign: "center" }}>Created By</th>
            <th style={{ textAlign: "center" }}>Operate</th>
          </tr>
        </thead>
        <tbody>
          {currentArticles.map((article) => (
            <tr key={article.id}>
              <td style={{ textAlign: "center" }}>{article.id}</td>
              <td style={{ textAlign: "center" }}>{article.categorie}</td>
              <td style={{ textAlign: "center" }}>{article.price}</td>
              <td style={{ textAlign: "center" }}>{article.quantite}</td>
              <td style={{ textAlign: "center" }}>
                {userMap.get(article.createdById) || 'Unknown'}
              </td>
              <td style={{ textAlign: "center" }}>
                <button
                  className="button-delete"
                  onClick={() => handleDelete(article.id)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
                <button
                  className="button-edit"
                  onClick={() => handleEdit(article)}
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
        <button className="add-button" onClick={handleAddArticle}>
          +Add
        </button>
      </div>
    </div>
  );
};

export default ArticleTable;
