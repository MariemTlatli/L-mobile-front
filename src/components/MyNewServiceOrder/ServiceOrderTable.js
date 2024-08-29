import { Box, Grid, Button, Typography, useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "./theme";
import React, { useState, useEffect } from "react";
import { getUserById } from "../../api/User.js"; // Assurez-vous que getUserById est bien importé
const ServiceOrderTable = ({
  order,
  handleDeleteOrder,
  handleEditOrder,
  handleAddDispatcher,
  handleAddTechnician,
  handleDeleteTechnician,

  company,
  articles,
  handleDelete,
  handleEdit,
  handleCompanyEdit,
  handleCompanyDelete,
  handleViewAllDispatchers,
  handleDeleteDispatcher,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [techniciansMap, setTechniciansMap] = useState({});

  useEffect(() => {
    // Fonction pour récupérer les techniciens pour chaque dispatcher
    const fetchTechniciansForDispatchers = async () => {
      const map = {};

      for (const dispatcher of order.dispatchers) {
        const technicianDetails = await Promise.all(
          dispatcher.techniciansIds.map((techId) => getUserById(techId))
        );
        map[dispatcher.id] = technicianDetails;
      }

      setTechniciansMap(map);
    };

    fetchTechniciansForDispatchers();
  }, [order.dispatchers]);

  console.log("hanii houniii ", articles);
  return (
    <Box m="20px">
      {/* Service Order Details Accordion */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Service Order Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Order ID:</strong> {order.id}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Status:</strong> {order.status}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Progress:</strong> {order.progress}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Created At:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Dispatchers:</strong> {order.dispatchers.length}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} textAlign="right">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleEdit(order)}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(order.id)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Company Details Accordion */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Company
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {company ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Company ID:</strong> {company.id}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Company Name:</strong> {company.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Address:</strong> {company.address}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Phone:</strong> {company.phone}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} textAlign="right">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleCompanyEdit(company)}
                  sx={{ mr: 1 }}
                >
                  Edit Company
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleCompanyDelete(company.id)}
                >
                  Delete Company
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Typography variant="body2">
              No company details available.
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Dispatch
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box mb={2} textAlign="right">
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddDispatcher(order.id)}
            >
              Add Dispatcher
            </Button>
          </Box>
          {order.dispatchers.length > 0 ? (
            order.dispatchers.map((dispatcher) => (
              <Box key={dispatcher.id} mb={2}>
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                      <strong>Dispatch ID:</strong> {dispatcher.id}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                          <strong>Message:</strong> {dispatcher.message}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                          <strong>Date:</strong>{" "}
                          {new Date(dispatcher.dispatchDate).toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Accordion defaultExpanded>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography
                              color={colors.greenAccent[500]}
                              variant="h6"
                            >
                              Technicians
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Box mb={2} textAlign="right">
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  handleAddTechnician(order.id, dispatcher.id)
                                }
                              >
                                Add Technician
                              </Button>
                            </Box>
                            {techniciansMap[dispatcher.id]?.length > 0 ? (
                              techniciansMap[dispatcher.id].map(
                                (technician, index) => (
                                  <Grid
                                    container
                                    spacing={2}
                                    alignItems="center"
                                    key={index}
                                  >
                                    <Grid item xs={10}>
                                      <Typography variant="body2">
                                        <div>
                                          Technician id : {technician.id}
                                        </div>
                                        <div>
                                          Technician email : {technician.email}
                                        </div>
                                        <div>
                                          Technician role : {technician.role}
                                        </div>
                                        <div>
                                          Technician phoneNumber:
                                          {technician.phoneNumber}
                                        </div>
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={2} textAlign="right">
                                      <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() =>
                                          handleDeleteTechnician(
                                            order.id,
                                            dispatcher.id,
                                            technician.id
                                          )
                                        }
                                      >
                                        Delete
                                      </Button>
                                    </Grid>
                                  </Grid>
                                )
                              )
                            ) : (
                              <Typography variant="body2">
                                No technicians assigned.
                              </Typography>
                            )}
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Box>
            ))
          ) : (
            <Typography variant="body2">No dispatchers available.</Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Articles Details Accordion */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Articles
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box mb={2} textAlign="right">
            <Button
              variant="contained"
              color="primary"
              // onClick={handleAddArticle} // Function to handle adding articles
            >
              Add Article
            </Button>
          </Box>
          {articles.length > 0 ? (
            articles.map((article) => (
              <Box key={article.id} mb={2}>
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                      <strong>Article ID:</strong> {article.id}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                          <strong>Name:</strong> {article.categorie}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                          <strong>Description:</strong> {article.createdById}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                          <strong>Quantity:</strong> {article.quantite}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                          <strong>Price:</strong> ${article.price}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Box textAlign="right">
                          <Button
                            variant="contained"
                            color="error"
                            // onClick={() => handleDeleteArticle(article.id)} // Function to handle deleting articles
                          >
                            Delete Article
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            // onClick={() => handleEditArticle(article.id)} // Function to handle editing articles
                          >
                            Edit Article
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Box>
            ))
          ) : (
            <Typography variant="body2">
              No articles available for this service order.
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ServiceOrderTable;
