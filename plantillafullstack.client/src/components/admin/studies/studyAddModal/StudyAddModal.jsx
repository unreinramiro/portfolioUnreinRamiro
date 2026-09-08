import React, { useState, useEffect } from "react";
import styles from "./StudyAddModal.module.css";

const StudyAddModal = ({ onClose, onSave }) => {
  const [formAddStudy, setformAddStudy] = useState({
    StdStyId: "1",
    StdTitle: "",
    StdDesc: "",
    StdInstitution: "",
    StdStart: null,
    StdEnd: null,
    StdHours: null,
    StdCertification: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(formAddStudy).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        formData.append(key, value);
      }
    });

    onSave(formData);
  };

  const handleChange = (e) => {
    setformAddStudy({ ...formAddStudy, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.StudyAddModal}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-white">Agregar Estudio</h3>
        <form
          className="container d-flex flex-column gap-3"
          onSubmit={handleSubmit}
        >
          <div className="row">
            <div className="col-8">
              <label className="text-white">Título</label>
              <input
                type="text"
                name="StdTitle"
                className={styles.input}
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label className="text-white">Tipo de estudio</label>
              <select
                name="StdStyId"
                className={styles.input}
                value={formAddStudy.StdStyId}
                onChange={handleChange}
              >
                <option value="1">Universitario</option>
                <option value="2">Curso</option>
                <option value="3">Certificacion</option>
                <option value="4">Bootcamp</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <label className="text-white">Descripción</label>
              <textarea
                name="StdDesc"
                rows={3}
                className={styles.input}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <label className="text-white">Institucion</label>
              <input
                type="text"
                name="StdInstitution"
                className={styles.input}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="text-white">Fecha de inicio</label>
              <input
                type="date"
                name="StdStart"
                className={styles.input}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label className="text-white">Fecha de fin</label>
              <input
                type="date"
                name="StdEnd"
                className={styles.input}
                onChange={handleChange}
              />
            </div>
          </div>

          {formAddStudy.StdStyId !== "1" && (
            <div className="row">
              <div className="col-8">
                <label className="text-white">URL Certificado</label>
                <input
                  type="text"
                  name="StdCertification"
                  className={styles.input}
                  onChange={handleChange}
                />
              </div>
              <div className="col-4">
                <label className="text-white">Cantidad de horas:</label>
                <input
                  type="number"
                  name="StdHours"
                  className={styles.input}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          <div className="row mt-2">
            <div className="col-12 d-flex justify-content-between gap-2">
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button type="submit" className={`${styles.addButton}`}>
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudyAddModal;
