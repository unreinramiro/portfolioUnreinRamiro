import React, { useState, useRef, useEffect } from "react";
import AssignaturesModal from "../Assignatures/AssignaturesModal";
import styles from "../Academic/Academic.module.css";
import axiosInstance from "../../../services/api";
import { formatDateForInput } from "../../../utils/date";

const Academic = () => {
  const [showModal, setShowModal] = useState(false);
  const sectionStudiesRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [academicStudies, setAcademicStudies] = useState([]);

  const fetchAcademic = async () => {
    try {
      const response = await axiosInstance.get("studies/academic");
      setAcademicStudies(response.data);
    } catch (err) {
      console.error("Error al obtener los estudios academicos", err);
    }
  };

  useEffect(() => {
    fetchAcademic();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionStudiesRef.current) observer.observe(sectionStudiesRef.current);

    return () => observer.disconnect();
  }, []);

  const isStudyInCourse = (endDateString) => {
    if (!endDateString) return true;
    const endDate = new Date(endDateString);
    const now = new Date();
    return endDate > now;
  };

  return (
    <div className={styles.heroSection}>
      <div
        ref={sectionStudiesRef}
        className={`${styles.content} ${isVisible ? styles.visible : ""} container px-3 text-light text-center d-flex flex-column`}
      >
        <div className="row justify-content-center">
          <div className="col-12 d-flex flex-column gap-3">
            <h2>ESTUDIOS</h2>
          </div>
        </div>
        {academicStudies.map((academic, index) => {
          const inCourse = isStudyInCourse(academic.stD_END_DATE);
          return (
            <div className="row justify-content-center" key={index}>
              <div
                className={`col-12 col-md-10 gap-3 ${styles.academicFormContainer}`}
              >
                <h3 style={{ height: "10px", margin: "0" }}>UNIVERSITARIO</h3>
                <hr></hr>
                <div className="d-flex justify-content-between align-items-center gap-2">
                  <h2>{academic.stD_TITLE}</h2>
                  <b
                    className={`px-2 py-1 rounded ${inCourse ? "bg-light text-dark" : "bg-secondary text-white"}`}
                  >
                    {inCourse ? "En curso" : "Finalizado"}
                  </b>
                </div>
                <div className="d-flex">
                  <p>{academic.stD_INSTITUTION}</p>
                </div>
                <div className="d-flex">
                  <p>
                    {formatDateForInput(academic.stD_START_DATE)} - Actualidad
                  </p>
                </div>
                <div className="d-flex mt-2">
                  <p className="text-start">{academic.stD_DESCRIPTION}</p>
                </div>
                <hr style={{ height: "10px", margin: "0" }}></hr>
                <a onClick={() => setShowModal(true)}>Ver Materias</a>
              </div>
            </div>
          );
        })}
      </div>
      {showModal && <AssignaturesModal onClose={() => setShowModal(false)} />}
    </div>
  );
};
export default Academic;
