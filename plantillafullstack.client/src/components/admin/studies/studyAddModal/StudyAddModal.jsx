import React, { useState, useEffect } from "react";
import styles from "./StudyAddModal.module.css";

const StudyAddModal = ({ onClose }) => {
  const [tipoEstudio, setTipoEstudio] = useState("1");

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.StudyAddModal}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-white">Agregar Estudio</h3>
        <form className="container d-flex flex-column gap-3">
          <div className="row">
            <div className="col-8">
              <label className="text-white">Título</label>
              <input type="text" name="ProTitle" className={styles.input} />
            </div>
            <div className="col-4">
              <label className="text-white">Tipo de estudio</label>
              <select
                className={styles.input}
                value={tipoEstudio}
                onChange={(e) => setTipoEstudio(e.target.value)}
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
                name="ProDescription"
                rows={3}
                className={styles.input}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <label className="text-white">Institucion</label>
              <input type="text" name="ProTitle" className={styles.input} />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="text-white">Fecha de inicio</label>
              <input type="date" name="ProGithubUrl" className={styles.input} />
            </div>
            <div className="col-6">
              <label className="text-white">Fecha de fin</label>
              <input
                type="date"
                name="ProProductionUrl"
                className={styles.input}
              />
            </div>
          </div>

          {tipoEstudio !== "1" && (
              <div className="row">
                <div className="col-8">
                  <label className="text-white">URL Certificado</label>
                  <input
                    type="text"
                    name="ProProductionUrl"
                    className={styles.input}
                  />
                </div>
                <div className="col-4">
                  <label className="text-white">Cantidad de horas:</label>
                  <input
                    type="number"
                    name="ProGithubUrl"
                    className={styles.input}
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
