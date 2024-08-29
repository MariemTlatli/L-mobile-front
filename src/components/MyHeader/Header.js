import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Header.css';

const Header = ({ onSearch = () => {} }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <main className="main-content">
            <header>
                <div className="search-bar-container">
                    <button className="search-icon">
                        <i className="fas fa-search"></i>
                    </button>
                    <input
                        type="text"
                        value={query}
                        onChange={handleSearch}
                        placeholder="Search..."
                        className="search-input"
                    />
                </div>
                <div className="admin">
                    <i className="fas fa-user-shield"></i> 
                    <span>Admin</span>
                </div>
            </header>
        </main>
    );
};

export default Header;
