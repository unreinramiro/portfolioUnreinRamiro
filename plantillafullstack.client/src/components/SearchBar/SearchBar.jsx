// SearchBar.jsx
import React, { useState } from 'react'
import styles from './SearchBar.module.css'

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className={styles.searchContainer}>
            <input
                type="text"
                placeholder="Buscar..."
                value={query}
                onChange={handleChange}
                className={styles.searchInput}
            />
            <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
        </div>
    );
}

export default SearchBar;