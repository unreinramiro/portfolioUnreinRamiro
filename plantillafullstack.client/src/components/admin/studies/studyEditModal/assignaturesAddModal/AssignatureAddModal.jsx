import React, { useState } from "react";
import styles from "./AssignatureAddModal.module.css";

const AssignatureAddModal = ({ onClose, onSave, studyId }) => {
  const [asgFormData, setAsgFormData] = useState({
    AsgStdId: studyId,
    AsgTitle: "",
    AsgFirstNote: "",
    AsgSecondNote: "",
    AsgPromotion: false,
    AsgSemester: 1,
    AsgStatus: "Iniciada",
    AsgYear: 1,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let parsedValue = value;

    if (type === "number") {
      parsedValue = value === "" ? null : parseFloat(value);
    } else if (name === "AsgPromotion") {
      parsedValue = value === "true";
    } else if (name === "AsgSemester" || name === "AsgYear") {
      parsedValue = parseInt(value, 10);
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
                  value={asgFormData.AsgTitle}
                  className={styles.input}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label className="text-white">Nota 1</label>
                <input
                  type="number"
                  step="0.1"
                  name="AsgFirstNote"
                  value={asgFormData.AsgFirstNote ?? ""}
                  className={styles.input}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <label className="text-white">Nota 2</label>
                <input
                  type="number"
                  step="0.1"
                  name="AsgSecondNote"
                  value={asgFormData.AsgSecondNote ?? ""}
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
                  value={asgFormData.AsgSemester}
                  onChange={handleChange}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </select>
              </div>
              <div className="col-6">
                <label className="text-white">Año</label>
                <select
                  className={styles.input}
                  name="AsgYear"
                  value={asgFormData.AsgYear}
                  onChange={handleChange}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label className="text-white">Promocionada</label>
                <select
                  className={styles.input}
                  name="AsgPromotion"
                  value={asgFormData.AsgPromotion ? "true" : "false"}
                  onChange={handleChange}
                >
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="col-6">
                <label className="text-white">Estado</label>
                <select
                  className={styles.input}
                  name="AsgStatus"
                  value={asgFormData.AsgStatus}
                  onChange={handleChange}
                >
                  <option value="Iniciada">Iniciada</option>
                  <option value="En curso">En curso</option>
                  <option value="Finalizada">Finalizada</option>
                  <option value="Sin iniciar">Sin iniciar</option>
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
                <button type="submit" className={styles.addButton}>
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
