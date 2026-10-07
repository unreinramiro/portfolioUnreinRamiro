import React, { useEffect, useState, useRef } from "react";
import styles from "./Tecnologies.module.css";
import TecnCard from "./TecnologiesCards/TecnCard";
import allTecnologies from "../../tecnologies.json";
import axiosInstance from "../../services/api";

const Tecnologies = () => {
  const [tecnologies, setTecnologies] = useState([]);
  const sectionTecsRef = useRef(null);
  const [isVisibleTec, setIsVisibleTec] = useState(false);

  const fetchTechnologies = async () => {
    try {
      const response = await axiosInstance.get("technologies");
      console.log(response.data);
      setTecnologies(response.data);
    } catch (err) {
      console.error(
        "Error al traer las tecnologias:",
        err.response?.data || err.message,
      );
    }
  };

  useEffect(() => {
    fetchTechnologies();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisibleTec(true);
          observer.disconnect(); // Solo anima una vez
        }
      },
      { threshold: 0.2 },
    );

    if (sectionTecsRef.current) observer.observe(sectionTecsRef.current);
    return () => observer.disconnect();
  }, []);

  const groupedTechnologies = Object.values(
    tecnologies.reduce((acc, tecno) => {
      const groupKey = tecno.teC_TCY_ID;
      if (!acc[groupKey]) {
        acc[groupKey] = {
          tcy_id: groupKey,
          items: [],
        };
      }
      acc[groupKey].items.push(tecno);
      return acc;
    }, {}),
  );

  return (
    <section
      className={`${styles.sectionTecnologies} d-flex flex-column min-vh-100`}
      id="tecs"
    >
      <div
        className={`${styles.contentTecnologies} ${isVisibleTec ? styles.visibleTecs : ""} container px-3 text-light text-center d-flex flex-column gap-3`}
        ref={sectionTecsRef}
      >
        <div className="row justify-content-center">
          <div className="col-12 d-flex flex-column gap-3">
            <h2>TECNOLOGIAS</h2>
          </div>
        </div>
        <div className="row g-3">
          {groupedTechnologies.map((group) => (
            <div
              className={`${styles.cardContainer} col-12 col-sm-6 col-lg-3`}
              key={group.tcy_id}
            >
              <TecnCard title={group.tcy_id} items={group.items} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tecnologies;
