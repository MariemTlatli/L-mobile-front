import React, { useState, useEffect } from "react";
import ServiceOrderTable from "./ServiceOrderTable";
import Header from "../MyHeader/Header";
import ServiceOrderForm from "./ServiceOrderForm";
import DispatcherList from "./DispatcherList";
import DispatchForm from "./DispatchForm";
import useNavigation from "./NavigationService";
import {
  getServiceOrders,
  addServiceOrder,
  updateServiceOrder,
  deleteServiceOrder,
} from "../../api/ServiceOrder.js";

const ServiceOrder = () => {
  const [serviceOrders, setServiceOrders] = useState([]);
  const [formState, setFormState] = useState({
    id: "",
    companyId: "",
    userId: "",
    articleIds: [],
    status: "",
    progress: "0",
    createdAt: "",
    updatedAt: "",
    dispatchers: [],
  });

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

    fetchServiceOrders();
  }, []);

  const {
    isTableVisible,
    isFormVisible,
    isDispatcherFormVisible,
    dispatchersList,
    currentOrders,
    totalPages,
    currentPage,
    handlePreviousPage,
    handleNextPage,
    handleViewAllDispatchers,
    showTable,
    showForm,
    showDispatcherForm,
    backToTable,
    headerTitle,
    currentService,
  } = useNavigation(serviceOrders);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleArticleIdsChange = (ids) => {
    setFormState((prevState) => ({
      ...prevState,
      articleIds: ids,
    }));
  };

  const handleDeleteDispatcher = async (id) => {
    const updatedServiceOrders = serviceOrders.map((order) => ({
      ...order,
      dispatchers: order.dispatchers.filter(
        (dispatcher) => dispatcher.id !== id
      ),
    }));
    setServiceOrders(updatedServiceOrders);
    alert("Dispatcher deleted successfully");
  };

  const handleDeleteOrder = async (id) => {
    try {
      await deleteServiceOrder(id);
      setServiceOrders(serviceOrders.filter((order) => order.id !== id));
      alert("Service order deleted successfully");
    } catch (error) {
      console.error("Error deleting service order:", error);
      alert("Failed to delete service order");
    }
  };

  const handleAddServiceOrder = () => {
    setFormState({
      id: "",
      companyId: "",
      userId: "",
      articleIds: [],
      status: "",
      progress: "0",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dispatchers: [],
    });
    showForm();
  };

  const handleEditServiceOrder = (order) => {
    if (order) {
      setFormState(order);
      showForm();
    } else {
      alert("Service order not found.");
    }
  };

  const handleFormSave = async () => {
    try {
      if (formState.id) {
        await updateServiceOrder(formState);
        alert("Service order updated successfully");
      } else {
        formState.id = "0";
        await addServiceOrder(formState);
        alert("Service order added successfully");
      }
      // Refresh service orders after save
      const updatedOrders = await getServiceOrders();
      setServiceOrders(updatedOrders);
      showTable();
      setFormState({
        id: "",
        companyId: "",
        userId: "",
        articleIds: [],
        status: "",
        progress: "0",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        dispatchers: [],
      });
    } catch (error) {
      console.error("Error saving service order:", error);
      alert("Failed to save service order");
    }
  };

  const handleCancelForm = () => {
    showTable();
  };

  const handleAddDispatcher = () => {
    // Use showDispatcherForm instead of showForm
    showDispatcherForm(currentService);
  };

  return (
    <div className="page-content">
      <Header />
      <h1>{headerTitle}</h1>
      {isTableVisible && !isFormVisible && !isDispatcherFormVisible && (
        <ServiceOrderTable
          serviceOrders={serviceOrders}
          currentServiceOrders={currentOrders}
          handleDelete={handleDeleteOrder}
          handleEdit={handleEditServiceOrder}
          handleViewAllDispatchers={handleViewAllDispatchers}
          handleAddServiceOrder={handleAddServiceOrder}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      )}
      {isFormVisible && !isDispatcherFormVisible && (
        <ServiceOrderForm
          formState={formState}
          handleChange={handleChange}
          handleArticleIdsChange={handleArticleIdsChange}
          handleSave={handleFormSave}
          handleCancel={handleCancelForm}
        />
      )}
      {isDispatcherFormVisible && (
        <DispatchForm
          formState={formState}
          handleChange={handleChange}
          handleSave={handleFormSave}
          handleCancel={handleCancelForm}
        />
      )}
      {dispatchersList.length > 0 && (
        <DispatcherList
          dispatchers={dispatchersList}
          onBack={backToTable}
          onEditDispatcher={handleEditServiceOrder}
          onAddDispatcher={handleAddDispatcher}
        />
      )}
    </div>
  );
};

export default ServiceOrder;
