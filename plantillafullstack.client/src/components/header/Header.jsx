import React from 'react';
import styles from './header.module.css';
import { Link } from 'react-router-dom';
import burgerIcon from '../../assets/burger-bar.png'

function Header() {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.header}>
                <a href="#home">RAMIRO</a>
            </div>
            <div>
                <img src={burgerIcon} 
                    className={styles.iconBurgerCss}
                    style={{ width: '30px', height: '30px' }}
                />
            </div>
            <div className={`${styles.hyperLinksContainer}`}>
                <a href="#aboutMe">About Me</a>
                <a href="#studies">Studies</a>
                <a href="#proyects">Projects</a>
            </div>
        </div>
    );
}

export default Header;