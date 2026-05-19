import React from 'react';
import styles from './header.module.css';
import { Link } from 'react-router-dom';
function Header() {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.header}>
                <Link to="/home">RAMIRO</Link>
            </div>
            <div>
                <a href="#aboutMe">About Me</a>
            </div>
        </div>
    );
}

export default Header;