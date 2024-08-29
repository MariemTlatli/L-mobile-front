import { useState, useEffect } from "react";

const useNavigation = (serviceOrders) => {
  const [isTableVisible, setTableVisible] = useState(true);
  const [isFormVisible, setFormVisible] = useState(false);
  const [isDispatcherFormVisible, setDispatcherFormVisible] = useState(false);
  const [selectedDispatcher, setSelectedDispatcher] = useState(null);
  const [dispatchersList, setDispatchersList] = useState([]);
  const [currentService, setCurrentService] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(2); // Number of orders per page

  useEffect(() => {
    setCurrentPage(1); // Reset page number when serviceOrders changes
  }, [serviceOrders]);

  const totalPages = Math.ceil(serviceOrders.length / ordersPerPage);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = serviceOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleViewDispatcherDetails = (dispatcherId) => {
    const dispatcher = serviceOrders
      .flatMap((order) => order.dispatchers)
      .find((d) => d.id === dispatcherId);
    showDispatcherDetails(dispatcher);
  };

  const handleViewAllDispatchers = (orderId) => {
    const order = serviceOrders.find((o) => o.id === orderId);
    showAllDispatchers(order.dispatchers, order.id);
  };

  const showTable = () => {
    setTableVisible(true);
    setFormVisible(false);
    setDispatcherFormVisible(false);
    setSelectedDispatcher(null);
    setDispatchersList([]);
  };

  const showForm = () => {
    setTableVisible(false);
    setFormVisible(true);
    setDispatcherFormVisible(false);
    setSelectedDispatcher(null);
    setDispatchersList([]);
  };

  const showDispatcherForm = (serviceOrder) => {
    setTableVisible(false);
    setFormVisible(false);
    setDispatcherFormVisible(true);
    setCurrentService(serviceOrder);
    setSelectedDispatcher(null);
    setDispatchersList([]);
  };

  const showDispatcherDetails = (dispatcher) => {
    setTableVisible(false);
    setFormVisible(false);
    setDispatcherFormVisible(false);
    setSelectedDispatcher(dispatcher);
    setDispatchersList([]);
  };

  const showAllDispatchers = (dispatchers, id) => {
    setTableVisible(false);
    setFormVisible(false);
    setDispatcherFormVisible(false);
    setSelectedDispatcher(null);
    setCurrentService(id);
    setDispatchersList(dispatchers);
  };

  const backToTable = () => {
    showTable();
  };

  // Determine header title based on current view
  let headerTitle = "Service Orders";
  if (isFormVisible) {
    headerTitle =
      "Service Orders > " +
      (selectedDispatcher ? "Edit Dispatcher" : "Form Service Order");
  } else if (isDispatcherFormVisible) {
    headerTitle = "Service Orders > Add Dispatcher";
  } else if (selectedDispatcher) {
    headerTitle = "Service Orders > Dispatcher Details";
  } else if (dispatchersList.length > 0) {
    headerTitle = "Service Orders > Détails Dispatchers";
  }

  return {
    isTableVisible,
    isFormVisible,
    isDispatcherFormVisible,
    selectedDispatcher,
    dispatchersList,
    currentOrders,
    totalPages,
    currentPage,
    handlePreviousPage,
    handleNextPage,
    handleViewDispatcherDetails,
    handleViewAllDispatchers,
    showTable,
    showForm,
    showDispatcherForm,
    showDispatcherDetails,
    showAllDispatchers,
    backToTable,
    headerTitle,
    currentService,
  };
};

export default useNavigation;
