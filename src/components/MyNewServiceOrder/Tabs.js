import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ServiceOrder from "../MyNewServiceOrder/ServiceOrder";
import { getServiceOrders } from "../../api/ServiceOrder";
import { getCompanies } from "../../api/company";
import { getArticles } from "../../api/ArticleService";

import ServiceOrderTable from "./ServiceOrderTable";

function Tabs() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedItem, setSelectedItem] = useState(null);
  const [serviceOrders, setServiceOrders] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [articles, setArticles] = useState([]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setActiveTab("itemDetails");
  };
  const handleFormClick = () => {
    setActiveTab("itemAdd");
  };

  useEffect(() => {
    const fetchServiceOrders = async () => {
      try {
        const ordersData = await getServiceOrders();
        setServiceOrders(ordersData);
      } catch (error) {
        console.error("Error fetching service orders:", error);
        alert("Failed to fetch service orders");
      }
    };

    const fetchCompanies = async () => {
      try {
        const companiesData = await getCompanies();
        setCompanies(companiesData);
      } catch (error) {
        console.error("Error fetching companies:", error);
        alert("Failed to fetch companies");
      }
    };
    const fetchArticles = async () => {
      try {
        const articlesData = await getArticles();
        setArticles(articlesData);
        console.log("Fetched articles:", articlesData);
      } catch (error) {
        console.error("Error fetching articles:", error);
        alert("Failed to fetch articles");
      }
    };

    fetchServiceOrders();
    fetchCompanies();
    fetchArticles();
  }, []);

  const getCompanyForOrder = (orderId) => {
    if (!orderId) return null;
    const order = serviceOrders.find((order) => order.id === orderId);
    return companies.find((company) => company.id === order?.companyId);
  };

  const getArticlesForOrder = (orderId) => {
    if (!orderId) {
      console.error("Order ID is missing or invalid");
      return [];
    }

    // Find the order by orderId
    const order = serviceOrders.find((order) => order.id === orderId);

    if (!order) {
      console.error("Order not found for ID:", orderId);
      return [];
    }

    if (!order.articleIds || order.articleIds.length === 0) {
      console.error("No articles found for order ID:", orderId);
      return [];
    }

    // Log the order details to check articleIds
    console.log("Order found:", order);
    console.log("Order's article IDs:", order.articleIds);

    // Log all articles to verify their IDs
    console.log("All available articles:", articles);

    // Filter the articles based on order's articleIds
    const relatedArticles = articles.filter((article) => {
      const isRelated = order.articleIds.includes(article.id);

      // Log each article's check result
      console.log(
        `Checking article ID ${article.id}: ${
          isRelated ? "Included" : "Not Included"
        }`
      );

      return isRelated;
    });

    // Log the articles related to the order
    console.log("Related Articles for Order ID:", orderId, relatedArticles);

    return relatedArticles;
  };

  return (
    <div>
      <nav className="nav nav-tabs">
        <button
          className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
          onClick={() => setActiveTab("tab1")}
        >
          Tab 1
        </button>

        {activeTab === "itemDetails" && (
          <button
            className={`nav-link ${
              activeTab === "itemDetails" ? "active" : ""
            }`}
            onClick={() => setActiveTab("itemDetails")}
          >
            Service order
            {selectedItem.id}
          </button>
        )}
        {activeTab === "itemAdd" && (
          <button
            className={`nav-link ${activeTab === "itemAdd" ? "active" : ""}`}
            onClick={() => setActiveTab("itemAdd")}
          >
            My Form
          </button>
        )}
      </nav>
      <div className="tab-content mt-3">
        {activeTab === "tab1" && (
          <Content1
            serviceOrders={serviceOrders}
            onItemClick={handleItemClick}
            handleFormClick={handleFormClick}
          />
        )}
        {activeTab === "itemDetails" && selectedItem && (
          <ServiceOrderTable
            order={selectedItem}
            company={getCompanyForOrder(selectedItem.id)}
            articles={getArticlesForOrder(selectedItem.id)}
          />
        )}
        {activeTab === "itemAdd" && <Content2 />}
      </div>
    </div>
  );
}

function Content1({ serviceOrders, onItemClick, handleFormClick }) {
  return (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        onClick={() => handleFormClick()}
      >
        ajouter un service order
      </button>

      <ul className="list-group">
        {serviceOrders.map((order) => (
          <li
            key={order.id}
            className="list-group-item d-flex justify-content-between align-items-center"
            onClick={() => onItemClick(order)}
            style={{ cursor: "pointer" }}
          >
            Order ID: {order.id}
            <span className="badge bg-primary rounded-pill">
              {order.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
function Content2({}) {
  return (
    <div>
      <h1>bonjour</h1>
    </div>
  );
}

export default Tabs;
