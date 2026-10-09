import React, { useState, useEffect } from "react";
import styles from "./StudiesAdm.module.css";
import axiosInstance from "../../../services/api";
import StudyEditModal from "./studyEditModal/StudyEditModal";
import { alertDelete, alertSuccess, alertError } from "../../../utils/alerts";
import StudyAddModal from "./studyAddModal/StudyAddModal";

// Ajustá estos IDs según los valores reales de tu tabla STUDY_TYPES
const STY_ACADEMICO = 1;
const STY_CURSO = 2;

const StudiesAdm = () => {
  const [activeTab, setActiveTab] = useState(STY_ACADEMICO);
  const [studies, setStudies] = useState([]);
  const [editingStudy, setEditingStudy] = useState(null); // null = cerrado, {} = alta, objeto = edición
  const [addStudy, setAddStudy] = useState(null);

  const fetchStudies = async () => {
    try {
      const response = await axiosInstance.get(
        `studies/studiesAdm/${activeTab}`,
      );
      setStudies(response.data);
    } catch (err) {
      console.error("Error al obtener los estudios", err);
    }
  };

  useEffect(() => {
    fetchStudies();
  }, [activeTab]);

  const handleDelete = async (id) => {
    const result = await alertDelete("¿Eliminar este estudio?");
    if (!result.isConfirmed) return;

    try {
      await axiosInstance.delete(`studies/studiesAdm/delStudy/${id}`);
      fetchStudies();
      alertSuccess("Eliminado correctamente");
    } catch (err) {
      console.error("Error al eliminar el estudio", err);
      alertError("No se pudo eliminar el estudio");
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editingStudy?.stD_ID) {
        await axiosInstance.put(`studies/${editingStudy.stD_ID}`, formData);
      } else {
        await axiosInstance.post("studies", formData);
      }
      setEditingStudy(null);
      fetchStudies();
      alertSuccess("Guardado correctamente");
    } catch (err) {
      console.error("Error al guardar", err);
      alertError("No se pudo guardar");
    }
  };

  return (
    <div className="container h-100 p-5">
      <ul className={styles.tabs}>
        <li
          className={activeTab === STY_ACADEMICO ? styles.active : ""}
          onClick={() => setActiveTab(STY_ACADEMICO)}
        >
          Formación académica
        </li>
        <li
          className={activeTab === STY_CURSO ? styles.active : ""}
          onClick={() => setActiveTab(STY_CURSO)}
        >
          Cursos y certificaciones
        </li>
      </ul>

      <div className="d-flex justify-content-end mb-3">
        <button className={styles.addButton} onClick={() => setAddStudy(true)}>
          + Agregar
        </button>
      </div>

      <div className="row g-3">
        {studies.map((study) => (
          <div className="col-12" key={study.stD_ID}>
            <div className={styles.studyItem}>
              <div>
                <h6>{study.stD_TITLE}</h6>
                <span>{study.stD_INSTITUTION}</span>
              </div>
              <div className="d-flex gap-2">
                <button
                  className={`${styles.addButton} ${styles.updBtn}`}
                  onClick={() => setEditingStudy(study)}
                >
                  Editar
                </button>
                <button
                  className={`${styles.addButton} ${styles.delBtn}`}
                  onClick={() => handleDelete(study.stD_ID)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingStudy && (
        <StudyEditModal
          study={editingStudy} // Paso el estudio dependiendo si es curso o facultad
          showSubjects={activeTab === STY_ACADEMICO} //Si ambos son 1
          onClose={() => setEditingStudy(null)}
          onSave={async (formData) => {
            try {
              const response = await axiosInstance.put(
                `studies/studiesAdm/updStudy`,
                formData,
              );
              fetchStudies();
              alertSuccess("Se actualizo el proyecto exitosamente");
            } catch (err) {
              console.error(
                "Error al actualizar el proyecto",
                err.response?.data,
              );
            }
          }}
        />
      )}

      {addStudy && (
        <StudyAddModal
          onClose={() => setAddStudy(null)}
          onSave={async (formData) => {
            try {
              const response = await axiosInstance.post(
                `studies/studiesAdm/addStudy`,
                formData,
              );
              fetchStudies();
              alertSuccess("Se agrego el estudio exitosamente");
              setAddStudy(false);
            } catch (err) {
              console.error(
                "Error al agregar el estudio",
                err.response?.data,
              );
            }
          }}
        />
      )}
    </div>
  );
};

export default StudiesAdm;
