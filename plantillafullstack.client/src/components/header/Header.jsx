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

  const [showLinksResp, setShowLinksResp] = useState(false);

  const toggleMenu = () => {
    setShowLinksResp((prev) => !prev);
  };

  const handleLogout = async () => {
    const result = await alertConfirm("¿Desea cerrar sesion?");
    if (!result.isConfirmed) return;

    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    navigate("/home");
  };

  useEffect(() => {
    setShowLinksResp(false);
  }, [location.pathname]);

  return (
    <div
      className={`${styles.headerContainer} ${showLinksResp ? styles.responsive : ""}`}
    >
      <div className={styles.header}>
        {!isAdminRoute ? (
          <a href="#home">RAMIRO</a>
        ) : (
          <Link to="/home">RAMIRO</Link>
        )}
        <div onClick={toggleMenu}>
          <img
            src={burgerIcon}
            className={styles.iconBurgerCss}
            style={{ width: "30px", height: "30px" }}
          />
        </div>
      </div>
      <div
        className={`${styles.hyperLinksContainer} ${showLinksResp ? styles.responsive : ""}`}
      >
        {!isAdminRoute ? (
          <>
            <a onClick={toggleMenu} href="#aboutMe">About Me</a>
            <a onClick={toggleMenu} href="#studies">Studies</a>
            <a onClick={toggleMenu} href="#proyects">Projects</a>
            <a onClick={toggleMenu} href="#tecs">Technologies</a>
            {isLoggedIn && (
              <div className={styles.hyperLinksAdm}>
                <Link to="admin/dashboard">Panel Adm</Link>
                <a className={styles.closeSession} onClick={handleLogout}>
                  Cerrar Sesión
                </a>
              </div>
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
