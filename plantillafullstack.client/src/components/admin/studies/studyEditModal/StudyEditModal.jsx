import React, { useState, useEffect } from "react";
import AssignatureEditModal from "./assignaturesEditModal/AssignatureEditModal";
import styles from "./StudyEditModal.module.css";
import axiosInstance from "../../../../services/api";
import { FaTrashAlt } from "react-icons/fa";
import AssignatureAddModal from "./assignaturesAddModal/AssignatureAddModal";

const StudyEditModal = ({ study, onClose, onSave, onDelete, showSubjects }) => {
  const [form, setForm] = useState({ StdTitle: study.stD_TITLE /* ... */ });
  const [assignatures, setAssignatures] = useState([]);
  const [editingAssignature, setEditingAssignature] = useState(null); // null = cerrado
  const [asgAddModal, setAsgAddModal] = useState(null);
  const [tipoEstudio, setTipoEstudio] = useState("1");

  useEffect(() => {
    if (showSubjects && study.stD_ID) {
      // Si es un estudio de universidad
      axiosInstance
        .get(`assignatures?studyId=${study.stD_ID}`)
        .then((res) => setAssignatures(res.data));
    }
  }, [study.stD_ID]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className="row">
          <div className="col-8">
              <h3 className="text-white">Editar Estudio</h3>
          </div>
          <div className="col-4 d-flex justify-content-center">
            <div className="d-flex gap-2">
              <button type="submit" className={`${styles.addButton}`}>
                Actualizar
              </button>
            </div>
          </div>
        </div>
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
        </form>

        {showSubjects && (
          <section className={styles.sectionAsgContainer}>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="text-white">Asignaturas</h5>
              <button
                className={styles.addButton}
                type="button"
                onClick={() => setAsgAddModal(true)}
              >
                + Agregar
              </button>
            </div>

            <ul className={styles.assignatureList}>
              {assignatures.map((a) => (
                <li key={a.asG_ID}>
                  {a.asG_TITLE}
                  <div>
                    <button
                      type="button"
                      onClick={() => setEditingAssignature(a)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteAssignature(a.asG_ID)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* botones Guardar/Cancelar/Eliminar del estudio */}
      </div>

      {editingAssignature && (
        <AssignatureEditModal
          assignature={editingAssignature}
          studyId={study.stD_ID}
          onClose={() => setEditingAssignature(null)}
          onSave={(data) => {
            /* POST o PUT según tenga asG_ID */
            // luego: refrescar `assignatures` y cerrar
          }}
        />
      )}

      {asgAddModal && (
        <AssignatureAddModal onClose={() => setAsgAddModal(null)} />
      )}
    </div>
  );
};

export default StudyEditModal;
