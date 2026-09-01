import React, { useState, useEffect } from "react";
import styles from "./AssignatureEditModal.module.css";

const AssignatureEditModal = ({ assignature, studyId, onClose, onSave }) => {
  const [asgFormData, setAsgFormData] = useState({
    asg_title: assignature.asG_TITLE,
    asg_first_note: assignature.asG_FIRST_NOTE,
    asg_second_note: assignature.asG_SECOND_NOTE,
    asg_promotion: assignature.asG_PROMOTION ? assignature.asG_PROMOTION : "No",
    asg_semester: assignature.asG_SEMESTER,
    asg_status: assignature.asG_STATUS,
    asg_year: assignature.asG_YEAR,
  });

  const handleChange = (e) => {
    setAsgFormData({ ...asgFormData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.ProjectEditModal}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-white text-center">Editar Asignatura</h3>

        <form className="container d-flex flex-column gap-3">
          <div className="row">
            <div className="col-12">
              <label className="text-white">Título</label>
              <input
                type="text"
                name="asg_title"
                className={styles.input}
                value={asgFormData.asg_title}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="text-white">Nota 1er Parcial</label>
              <input
                type="number"
                name="asg_first_note"
                className={styles.input}
                value={asgFormData.asg_first_note}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label className="text-white">Nota 2do Parcial</label>
              <input
                type="number"
                name="asg_second_note"
                className={styles.input}
                value={asgFormData.asg_second_note}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <label className="text-white">Anio</label>
              <select
                className={styles.input}
                name="asg_year"
                value={asgFormData.asg_year}
                onChange={handleChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
            <div className="col-4">
              <label className="text-white">Semestre</label>
              <select
                className={styles.input}
                name="asg_semester"
                value={asgFormData.asg_semester}
                onChange={handleChange}
              >
                <option>1</option>
                <option>2</option>
              </select>
            </div>
            <div className="col-4">
              <label className="text-white">Estado</label>
              <select
                className={styles.input}
                name="asg_status"
                value={asgFormData.asg_status}
                onChange={handleChange}
              >
                <option>Sin iniciar</option>
                <option>En curso</option>
                <option>Finalizada</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label className="text-white">Promocionada</label>
              <select
                className={styles.input}
                name="asg_promotion"
                value={asgFormData.asg_promotion}
                onChange={handleChange}
              >
                <option>Si</option>
                <option>No</option>
              </select>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-12 d-flex justify-content-between gap-2">
              <button type="button" className={styles.deleteBtn}>
                Eliminar
              </button>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.saveBtn}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignatureEditModal;
