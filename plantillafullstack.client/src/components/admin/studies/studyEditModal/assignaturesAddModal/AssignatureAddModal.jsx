import React from "react";
import styles from "./AssignatureAddModal.module.css";

const AssignatureAddModal = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.AsgAddModal} onClick={(e) => e.stopPropagation()}>
        <h5 className="text-white">Agregar Asignatura</h5>
        <form className="container d-flex flex-column gap-3">
          <div className="row d-flex flex-column gap-3">
            <div className="row">
              <div className="col-12">
                <label className="text-white">Título</label>
                <input type="text" name="asg_title" className={styles.input} />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label className="text-white">Nota 1</label>
                <input
                  type="number"
                  name="asg_first_note"
                  className={styles.input}
                />
              </div>
              <div className="col-6">
                <label className="text-white">Nota 2</label>
                <input
                  type="number"
                  name="asg_second_note"
                  className={styles.input}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label className="text-white">Semestre</label>
                <select className={styles.input}>
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>
              <div className="col-6">
                <label className="text-white">Año</label>
                <select className={styles.input}>
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label className="text-white">Promocionada</label>
                <select className={styles.input}>
                  <option>Si</option>
                  <option>No</option>
                </select>
              </div>
              <div className="col-6">
                <label className="text-white">Estado</label>
                <select className={styles.input}>
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
