import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import styles from "./TechAdm.module.css";
import axiosInstance from "../../../services/api";
import TechAddModal from "./technologieAddModal/TechAddModal";
import { alertDelete, alertSuccess, alertError } from "../../../utils/alerts";

const TECH_FRONT = 1;
const TECH_BACK = 2;
const TECH_BD = 3;
const TECH_TOOL = 4;

const TechAdm = () => {
  const [activeTabTech, setActiveTabTech] = useState(TECH_FRONT);
  const [technologies, setTechnologies] = useState([]);
  const [showTechAddModal, setShowTechAddModal] = useState(false);

  const fetchTechs = async () => {
    try {
      const response = await axiosInstance.get(
        `technologies/techAdm/${activeTabTech}`,
      );
      setTechnologies(response.data);
    } catch (err) {
      console.error("Error al obtener las tecnologias", err);
    }
  };

  useEffect(() => {
    fetchTechs();
  }, [activeTabTech]);

  const handleDelete = async (id) => {
    const result = await alertDelete("¿Eliminar esta tecnologia?");
    if (!result.isConfirmed) return;
    try {
      const response = await axiosInstance.delete(`technologies/techAdm/deleteTech/${id}`);
      fetchTechs();
      alertSuccess("Se elimino la tecnologia correctamente!");
    } catch (error) {
      alertError("No se pudo eliminar la tecnologia");
      console.log("Error al eliminar el estudio", err.response?.data);
    }
  };

  return (
    <div className="container h-100 p-5">
      <ul className={styles.tabs}>
        <li
          className={activeTabTech === TECH_FRONT ? styles.active : ""}
          onClick={() => setActiveTabTech(TECH_FRONT)}
        >
          Frontend
        </li>
        <li
          className={activeTabTech === TECH_BACK ? styles.active : ""}
          onClick={() => setActiveTabTech(TECH_BACK)}
        >
          Backend
        </li>
        <li
          className={activeTabTech === TECH_BD ? styles.active : ""}
          onClick={() => setActiveTabTech(TECH_BD)}
        >
          Bases de datos
        </li>
        <li
          className={activeTabTech === TECH_TOOL ? styles.active : ""}
          onClick={() => setActiveTabTech(TECH_TOOL)}
        >
          Herramientas
        </li>
      </ul>
      <div className="row d-flex justify-content-end">
        <div className="d-flex justify-content-end mb-2">
          <button
            className={styles.addButton}
            onClick={() => setShowTechAddModal(true)}
          >
            <FaPlus />
            Agregar
          </button>
        </div>
      </div>
      <div className="row g-3">
        {technologies.map((tech) => (
          <div className="col-12" key={tech.teC_ID}>
            <div className={styles.techItem}>
              <div>
                <h6>{tech.teC_NAME}</h6>
              </div>
              <div className="d-flex gap-2">
                <button className={`${styles.addButton} ${styles.delBtn}`} onClick={() => handleDelete(tech.teC_ID)}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showTechAddModal && (
        <TechAddModal
          onClose={() => setShowTechAddModal(false)}
          onSave={async (formTech) => {
            try {
              const response = await axiosInstance.post(
                `technologies/techAdm/addTech`,
                formTech,
              );
              fetchTechs();
              alertSuccess("Se agrego la tecnologia correctamente!");
              setShowTechAddModal(false);
            } catch (error) {
              alertError("No se pudo agregar la tecnologia");
              console.log("Error al agregar el estudio", err.response?.data);
            }
          }}
        />
      )}
    </div>
  );
};

export default TechAdm;
