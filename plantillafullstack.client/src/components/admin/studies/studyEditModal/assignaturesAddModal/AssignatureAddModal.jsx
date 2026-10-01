import React, { useState, useEffect } from "react";
import styles from "./AssignatureAddModal.module.css";

const AssignatureAddModal = ({ onClose, onSave, studyId }) => {
  const [asgFormData, setAsgFormData] = useState({
    AsgStdId: studyId,
    AsgTitle: "",
    AsgFirstNote: 1,
    AsgSecondNote: 1,
    AsgPromotion: false,
    AsgSemester: 1,
    AsgStatus: "Iniciada",
    AsgYear: 1,
  });

  const handleChange = (e) => {
    setAsgFormData({ ...asgFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(asgFormData);
    onSave(asgFormData);
  };
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.AsgAddModal} onClick={(e) => e.stopPropagation()}>
        <h5 className="text-white">Agregar Asignatura</h5>
        <form
          className="container d-flex flex-column gap-3"
          onSubmit={handleSubmit}
        >
          <div className="row d-flex flex-column gap-3">
            <div className="row">
              <div className="col-12">
                <label className="text-white">Título</label>
                <input
                  type="text"
                  name="AsgTitle"
                  className={styles.input}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label className="text-white">Nota 1</label>
                <input
                  type="number"
                  name="AsgFirstNote"
                  className={styles.input}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <label className="text-white">Nota 2</label>
                <input
                  type="number"
                  name="AsgSecondNote"
                  className={styles.input}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label className="text-white">Semestre</label>
                <select
                  className={styles.input}
                  name="AsgSemester"
                  onChange={handleChange}
                >
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>
              <div className="col-6">
                <label className="text-white">Año</label>
                <select
                  className={styles.input}
                  name="AsgYear"
                  onChange={handleChange}
                >
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label className="text-white">Promocionada</label>
                <select
                  className={styles.input}
                  name="AsgPromotion"
                  onChange={handleChange}
                >
                  <option>Si</option>
                  <option>No</option>
                </select>
              </div>
              <div className="col-6">
                <label className="text-white">Estado</label>
                <select
                  className={styles.input}
                  name="AsgStatus"
                  onChange={handleChange}
                >
                  <option>Iniciada</option>
                  <option>En curso</option>
                  <option>Finalizada</option>
                  <option>Sin iniciar</option>
                </select>
              </div>
            </div>
          </div>
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

export default AssignatureAddModal;
