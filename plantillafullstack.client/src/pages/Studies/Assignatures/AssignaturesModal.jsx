import React from 'react'
import styles from './AssignaturesModal.module.css'
import SearchBar from '../../../components/SearchBar/SearchBar'

const AssignaturesModal = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
        <div 
            className={styles.AssignaturesModal} 
            onClick={e => e.stopPropagation()}  // evita cerrar al clickear dentro
        >
            <h3 className='text-white text-center'>Materias</h3>
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <SearchBar />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AssignaturesModal