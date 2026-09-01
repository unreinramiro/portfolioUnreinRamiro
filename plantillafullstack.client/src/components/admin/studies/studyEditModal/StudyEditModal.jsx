import React, { useState, useEffect } from 'react'
import AssignatureEditModal from './assignaturesEditModal/AssignatureEditModal';
import styles from './StudyEditModal.module.css'
import axiosInstance from '../../../../services/api'
import { FaTrashAlt } from 'react-icons/fa'

const StudyEditModal = ({ study, onClose, onSave, onDelete, showSubjects }) => {
  const [form, setForm] = useState({ StdTitle: study.stD_TITLE, /* ... */ });
  const [assignatures, setAssignatures] = useState([]);
  const [editingAssignature, setEditingAssignature] = useState(null); // null = cerrado

  useEffect(() => {
    if (showSubjects && study.stD_ID) { // Si es un estudio de universidad
      axiosInstance.get(`assignatures?studyId=${study.stD_ID}`)
        .then(res => setAssignatures(res.data));
    }
  }, [study.stD_ID]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {/* form de STUDIES: título, institución, fecha, etc. */}

        {showSubjects && (
          <section className={styles.sectionAsgContainer}>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className='text-white'>Asignaturas</h5>
              <button className={styles.addButton} type="button" onClick={() => setEditingAssignature({})}>
                + Agregar
              </button>
            </div>

            <ul className={styles.assignatureList}>
              {assignatures.map(a => (
                <li key={a.asG_ID}>
                  {a.asG_TITLE}
                  <div>
                    <button type="button" onClick={() => setEditingAssignature(a)}>Editar</button>
                    <button type="button" onClick={() => handleDeleteAssignature(a.asG_ID)}>
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
          onSave={(data) => { /* POST o PUT según tenga asG_ID */
            // luego: refrescar `assignatures` y cerrar
          }}
        />
      )}
      
    </div>
  );
};

export default StudyEditModal