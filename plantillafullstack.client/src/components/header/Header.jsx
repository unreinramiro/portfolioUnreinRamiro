import React, { useState, useEffect } from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import burgerIcon from "../../assets/burger-bar.png";
import { useLocation } from "react-router-dom";
import { alertConfirm } from "../../utils/alerts";
import { useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isLoginPage = location.pathname === "/admin/login";
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = async () => {
    const result = await alertConfirm("¿Desea cerrar sesion?");
    if (!result.isConfirmed) return;

    localStorage.removeItem("token");
    navigate("/home");
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        {!isAdminRoute ? (
          <a href="#home">RAMIRO</a>
        ) : (
          <Link to="/home">RAMIRO</Link>
        )}
      </div>
      <div>
        <img
          src={burgerIcon}
          className={styles.iconBurgerCss}
          style={{ width: "30px", height: "30px" }}
        />
      </div>
      <div className={styles.hyperLinksContainer}>
        {!isAdminRoute ? (
          <>
            <a href="#aboutMe">About Me</a>
            <a href="#studies">Studies</a>
            <a href="#proyects">Projects</a>
            {isLoggedIn && (
              <a className={styles.closeSession} onClick={handleLogout}>
                Cerrar Sesión
              </a>
            )}
          </>
        ) : (
          !isLoginPage && (
            <a className={styles.closeSession} onClick={handleLogout}>
              Cerrar Sesión
            </a>
          )
        )}
      </div>
    </div>
  );
}

export default Header;
