import React, { useState, useEffect } from "react";
import styles from "./AssignatureEditModal.module.css";

const AssignatureEditModal = ({ assignature, studyId, onClose, onSave, onDelete }) => {
  const [asgFormData, setAsgFormData] = useState({
    AsgId: assignature.asG_ID,
    AsgStdId: assignature.asG_STD_ID,
    AsgTitle: assignature.asG_TITLE,
    AsgFirstNote: assignature.asG_FIRST_NOTE,
    AsgSecondNote: assignature.asG_SECOND_NOTE,
    AsgPromotion: assignature.asG_PROMOTION ?? assignature.asgPromotion ?? false,
    AsgSemester: assignature.asG_SEMESTER,
    AsgStatus: assignature.asG_STATUS,
    AsgYear: assignature.asG_YEAR,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    let parsedValue = value;

    if (type === "number") {
      parsedValue = value === "" ? null : parseFloat(value);
    } else if (name === "AsgPromotion") {
      parsedValue = value === "true"; // Convierte string del select a boolean
    } else if (name === "AsgSemester" || name === "AsgYear") {
      parsedValue = value === "" ? null : parseInt(value, 10);
    }

    setAsgFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(asgFormData);
    onSave(asgFormData);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.ProjectEditModal}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-white text-center">Editar Asignatura</h3>

        <form className="container d-flex flex-column gap-3" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12">
              <label className="text-white">Título</label>
              <input
                type="text"
                name="AsgTitle"
                className={styles.input}
                value={asgFormData.AsgTitle}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="text-white">Nota 1er Parcial</label>
              <input
                type="number"
                name="AsgFirstNote"
                className={styles.input}
                value={asgFormData.AsgFirstNote}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label className="text-white">Nota 2do Parcial</label>
              <input
                type="number"
                name="AsgSecondNote"
                className={styles.input}
                value={asgFormData.AsgSecondNote}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <label className="text-white">Anio</label>
              <select
                className={styles.input}
                name="AsgYear"
                value={asgFormData.AsgYear}
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
                name="AsgSemester"
                value={asgFormData.AsgSemester}
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
                name="AsgStatus"
                value={asgFormData.AsgStatus}
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
                name="AsgPromotion"
                value={asgFormData.AsgPromotion}
                onChange={handleChange}
              >
                <option value="true">Si</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-12 d-flex justify-content-between gap-2">
              <button type="button" className={styles.deleteBtn} onClick={() => onDelete(asgFormData.AsgId)}>
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
