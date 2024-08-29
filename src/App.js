import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard"; // Un composant représentant la page principale après login
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        {/* Route par défaut (redirection vers Register) */}
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
