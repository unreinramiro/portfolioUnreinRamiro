import React from 'react';
import styles from './header.module.css';
import { Link } from 'react-router-dom';
function Header() {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.header}>
                <a href="#home">RAMIRO</a>
            </div>
            <div className={`${styles.hyperLinksContainer} d-flex gap-1`}>
                <a href="#aboutMe">About Me</a>
                <a href="#studies">Studies</a>
            </div>
        </div>
    );
}

export default Header;