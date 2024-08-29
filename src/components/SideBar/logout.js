import React from "react";
import "./Sidebar.css";

import axios from 'axios';

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            // Make a POST request to the logout endpoint.
            await axios.post('/api/account/logout');

            // Perform any client-side actions needed after logout.
            // For example, redirect to the login page.
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <button className="signout-btn" onClick={handleLogout}>
            Log out
        </button>
    );
};

export default LogoutButton;