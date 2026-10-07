import React, { useState, useEffect } from "react";
import styles from "./ProyectCard.module.css";
import imgProy1 from "../../../assets/aritzProyect.png";
import { MdOutlineImageNotSupported } from "react-icons/md";

const ProyectCard = ({ onShowModal, proyect, textButton }) => {
  return (
    <div className={styles.proyectCardContainer}>
      <div className="col-12 d-flex flex-column gap-3 justify-content-between p-2">
        <div className={styles.imageProyectContainer}>
          {proyect.proImg1 ? (
            <img
              src={`http://localhost:5231/images/${proyect.proImg1}`}
              alt="proyect1"
            />
          ) : (
            <div className="h-100 d-flex justify-content-center align-items-center">
              <MdOutlineImageNotSupported size={100} />
            </div>
          )}
        </div>
        <h6 className="text-white text-center">{proyect.proTitle}</h6>
        <div className={styles.descriptionContainer}>
          <p>{proyect.proDescription}</p>
        </div>
        <div className={styles.tagsContainer}>
          {proyect.technologies.map((tecnology, index) => (
            <span
              key={index}
              className="badge bg-transparent border border-secondary text-white-50 px-3 py-2"
              style={{ borderRadius: "0px", fontSize: "0.75rem" }}
            >
              {tecnology.tecName}
            </span>
          ))}
        </div>
        <div className={`${styles.detalleContainer}`}>
          <button onClick={() => onShowModal(proyect)}>{textButton}</button>
        </div>
      </div>
    </div>
  );
};

export default ProyectCard;
