import React, { useState, useEffect } from 'react'
import styles from './StudiesAdm.module.css'
import axiosInstance from '../../../services/api'
//import StudyEditModal from './StudyEditModal'
import { alertDelete, alertSuccess, alertError } from '../../../utils/alerts'

// Ajustá estos IDs según los valores reales de tu tabla STUDY_TYPES
const STY_ACADEMICO = 1
const STY_CURSO = 2

const StudiesAdm = () => {

  const [activeTab, setActiveTab] = useState(STY_ACADEMICO)
  const [studies, setStudies] = useState([])
  const [editingStudy, setEditingStudy] = useState(null) // null = cerrado, {} = alta, objeto = edición

  const fetchStudies = async () => {
    try {
      const response = await axiosInstance.get(`studies/studiesAdm/${activeTab}`)
      setStudies(response.data)
    } catch (err) {
      console.error("Error al obtener los estudios", err)
    }
  }

  useEffect(() => {
    fetchStudies()
  }, [activeTab])

  const handleDelete = async (id) => {
    const result = await alertDelete('¿Eliminar este registro?')
    if (!result.isConfirmed) return

    try {
      await axiosInstance.delete(`studies/${id}`)
      fetchStudies()
      alertSuccess('Eliminado correctamente')
    } catch (err) {
      console.error("Error al eliminar", err)
      alertError('No se pudo eliminar')
    }
  }

  const handleSave = async (formData) => {
    try {
      if (editingStudy?.stD_ID) {
        await axiosInstance.put(`studies/${editingStudy.stD_ID}`, formData)
      } else {
        await axiosInstance.post('studies', formData)
      }
      setEditingStudy(null)
      fetchStudies()
      alertSuccess('Guardado correctamente')
    } catch (err) {
      console.error("Error al guardar", err)
      alertError('No se pudo guardar')
    }
  }

  return (
    <div className='container p-5'>

      <ul className={styles.tabs}>
        <li
          className={activeTab === STY_ACADEMICO ? styles.active : ''}
          onClick={() => setActiveTab(STY_ACADEMICO)}
        >
          Formación académica
        </li>
        <li
          className={activeTab === STY_CURSO ? styles.active : ''}
          onClick={() => setActiveTab(STY_CURSO)}
        >
          Cursos y certificaciones
        </li>
      </ul>

      <div className='d-flex justify-content-end mb-3'>
        <button className={styles.addButton} onClick={() => setEditingStudy({})}>
          + Agregar
        </button>
      </div>

      <div className='row g-3'>
        {studies.map(study => (
          <div className='col-12' key={study.stD_ID}>
            <div className={styles.studyItem}>
              <div>
                <h6>{study.stD_TITLE}</h6>
                <span>{study.stD_INSTITUTION}</span>
              </div>
              <div className='d-flex gap-2'>
                <button onClick={() => setEditingStudy(study)}>Editar</button>
                <button onClick={() => handleDelete(study.stD_ID)}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingStudy && (
        <StudyEditModal
          study={editingStudy}
          showSubjects={activeTab === STY_ACADEMICO}
          onClose={() => setEditingStudy(null)}
          onSave={handleSave}
        />
      )}

    </div>
  )
}

export default StudiesAdm