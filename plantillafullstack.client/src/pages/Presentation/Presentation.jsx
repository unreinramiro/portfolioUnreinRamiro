import React, { useState, useEffect } from "react";
import styles from "./Presentation.module.css";

const Presentation = ({ profile }) => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5231";

  return (
    <section id="home" className={styles.presentationSection}>
      <div className={`container ${styles.presentationContainer}`}>
        <div className="row h-100 align-items-center">
          <div className="col-lg-12 text-center">
            <div className={styles.imageAndName}>
              <div className={styles.fotoCv}>
                <img src={`${API_URL}/images/${profile.prO_IMG}`} />
              </div>
              <h1 className="text-white">
                {profile.prO_NAME} {profile.prO_SURNAME}
              </h1>
              <div>
                <p className="text-white text-opacity-50 fs-5">
                  Desarrollador Full Stack
                </p>
                <b className="text-white text-opacity-50 fs-5">
                  React JS / .NET Core / SQL Server
                </b>
              </div>
              <div className={styles.containerBtns}>
                <a
                  href="#proyects"
                  className={`${styles.btnProyContact} ${styles.btnProy}`}
                >
                  Ver proyectos
                </a>
                <a
                  href="#contact"
                  className={`${styles.btnProyContact} ${styles.btnContact}`}
                >
                  Contactar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Presentation;
