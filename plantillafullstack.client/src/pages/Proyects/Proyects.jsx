import React, { useState, useEffect, useRef } from "react";
import styles from "./Proyects.module.css";
import ProyectCard from "./ProyectCards/ProyectCard";
import ProyectDetail from "./ProyectDetail/ProyectDetail";
import axiosInstance from "../../services/api";

const Proyects = () => {
  const [isVisibleProy, setIsVisibleProy] = useState(false);
  const sectionProyectsRef = useRef(null);
  const [proyects, setProyects] = useState([]);
  const [isLoading, setLoading] = useState(true);

  //Parte modal proyect
  const [showModalProy, setShowModalProy] = useState(false);
  const [selectedProy, setSelectedProy] = useState([]);

  const handleShowModal = (proyect) => {
    setShowModalProy(true);
    setSelectedProy(proyect);
  };

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get("projects");
      console.log(response.data);
      setProyects(response.data);
      setLoading(false);
    } catch (err) {
      console.error(
        "Error al traer los projectos:",
        err.response?.data || err.message,
      );
    }
  };

  useEffect(() => {
    fetchProjects();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisibleProy(true);
          observer.disconnect(); // Solo anima una vez
        }
      },
      { threshold: 0.2 },
    );

    if (sectionProyectsRef.current)
      observer.observe(sectionProyectsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`${styles.sectionProyects} d-flex flex-column min-vh-100`}
      id="proyects"
    >
      {showModalProy && (
        <ProyectDetail
          onClose={() => setShowModalProy(false)}
          selectedProy={selectedProy}
        />
      )}
      <div
        ref={sectionProyectsRef}
        className={`${styles.contentProyects} ${isVisibleProy ? styles.visibleProyects : ""} container px-3 text-light text-center d-flex flex-column`}
      >
        <div className="row justify-content-center">
          <div className="col-12 d-flex flex-column">
            <h2>PROYECTOS</h2>
          </div>
        </div>
        <div
          className={`${styles.proyectsContainer} row justify-content-center g-3`}
        >
          {isLoading ? (
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            proyects.map((proyect, index) => (
              <div
                className={`${styles.proyectCard} col-12 col-sm-6 col-lg-4`}
                key={index}
              >
                <ProyectCard
                  onShowModal={handleShowModal}
                  proyect={proyect}
                  textButton={"Ver detalle"}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Proyects;
