import React, { useState, useEffect, use } from "react";
import styles from "./AssignaturesModal.module.css";
import SearchBar from "../../../components/SearchBar/SearchBar";
import AssignatureCard from "./AssignatureCard";
import axiosInstance from "../../../services/api";
import filterImg from "../../../assets/filter.png";

const AssignaturesModal = ({ onClose }) => {
  const [assignatures, setAssignatures] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    semester: "",
    year: "",
    status: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAssignatures = async () => {
      try {
        const response = await axiosInstance.get(`assignatures/${1}`);
        setAssignatures(response.data);
        setFiltered(response.data);
        console.log("Asignaturas obtenidas:", response.data);
      } catch (err) {
        console.error("Error al obtener las asignaturas", err);
      }
    };

    fetchAssignatures();
  }, []);

  const handleSearch = (query) => {
    setFiltered(
      assignatures.filter((as) =>
        as.asG_TITLE.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    applyFilters(searchQuery, newFilters);
  };

  const applyFilters = (query, currentFilters) => {
    let result = assignatures;

    // Filtro por texto (SearchBar)
    if (query.trim() !== "") {
      result = result.filter((as) =>
        as.asG_TITLE.toLowerCase().includes(query.toLowerCase()),
      );
    }

    // Filtro por Semestre
    if (currentFilters.semester) {
      result = result.filter(
        (as) => as.asG_SEMESTER === parseInt(currentFilters.semester, 10),
      );
    }

    // Filtro por Año
    if (currentFilters.year) {
      result = result.filter(
        (as) => as.asG_YEAR === parseInt(currentFilters.year, 10),
      );
    }

    // Filtro por Estado
    if (currentFilters.status) {
      result = result.filter((as) => as.asG_STATUS === currentFilters.status);
    }

    setFiltered(result);
  };

  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.asG_YEAR]) {
      acc[item.asG_YEAR] = [];
    }

    if (!acc[item.asG_YEAR][item.asG_SEMESTER]) {
      acc[item.asG_YEAR][item.asG_SEMESTER] = [];
    }

    acc[item.asG_YEAR][item.asG_SEMESTER].push(item);

    return acc;
  }, {});

  const handleResetFilters = () => {
    const resetValues = { semester: "", year: "", status: "" };
    setFilters(resetValues);
    applyFilters(searchQuery, resetValues);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.AssignaturesModal}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-white text-center">Materias</h3>
        <div className="container d-flex flex-column gap-3">
          <div className="row">
            <div className="col-12">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
          <div className="row d-flex justify-content-start">
            <div className="col-2">
              <label className="d-flex flex-column align-items-start text-white">
                Filtros
                <button
                  type="button"
                  className={`${styles.filterButton} ${
                    showFilters ? styles.activeFilterBtn : ""
                  }`}
                  onClick={() => setShowFilters((prev) => !prev)}
                >
                  <img
                    src={filterImg}
                    alt="Filtrar"
                    className={styles.filterIcon}
                  />
                </button>
              </label>
              {(filters.semester || filters.year || filters.status) && (
                <button
                  type="button"
                  className={styles.resetBtn}
                  onClick={handleResetFilters}
                >
                  Limpiar filtros
                </button>
              )}
            </div>
            {showFilters && (
              <div className={`row g-2 ${styles.filtersSection}`}>
                <div className="col-12 col-md-4 d-flex flex-column align-items-start gap-1">
                  <label className="text-white w-100 text-start fs-6">
                    Semestre
                    <select
                      className={styles.input}
                      name="semester"
                      onChange={handleFilterChange}
                      value={filters.semester}
                    >
                      <option>1</option>
                      <option>2</option>
                    </select>
                  </label>
                </div>
                <div className="col-12 col-md-4 d-flex flex-column align-items-start gap-1">
                  <label className="text-white w-100 text-start fs-6">
                    Año
                    <select
                      className={styles.input}
                      name="year"
                      onChange={handleFilterChange}
                      value={filters.year}
                    >
                      <option>1</option>
                      <option>2</option>
                    </select>
                  </label>
                </div>
                <div className="col-12 col-md-4 d-flex flex-column align-items-start gap-1">
                  <label className="text-white w-100 text-start fs-6">
                    Estado
                    <select
                      className={styles.input}
                      name="status"
                      onChange={handleFilterChange}
                      value={filters.status}
                    >
                      <option value="">Todos</option>
                      <option value="Sin iniciar">Sin iniciar</option>
                      <option value="En curso">En curso</option>
                      <option value="Finalizada">Finalizada</option>
                    </select>
                  </label>
                </div>
              </div>
            )}
          </div>
          <div className="row">
            {Object.keys(grouped).length > 0 ? (
              Object.entries(grouped).map(([year, semesters]) => (
                <div key={year}>
                  <div className="col-12 mt-4">
                    <h4 className="text-white text-start">Año {year}</h4>
                  </div>

                  {Object.entries(semesters).map(([semester, assignatures]) => (
                    <div className="row mt-4" key={semester}>
                      <h6 className="text-end text-light">
                        Semestre {semester}
                      </h6>
                      <div className="col-12 d-flex flex-column gap-3">
                        {assignatures.map((as) => (
                          <AssignatureCard
                            key={as.asG_ID}
                            title={as.asG_TITLE}
                            status={as.asG_STATUS}
                            firstNote={as.asG_FIRST_NOTE}
                            secondNote={as.asG_SECOND_NOTE}
                            promotion={as.asG_PROMOTION}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p className="text-white-50 text-center mt-4">
                No se encontraron materias con las opciones seleccionadas.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignaturesModal;
