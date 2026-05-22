import React from 'react'
import styles from './AssignaturesModal.module.css'
import SearchBar from '../../../components/SearchBar/SearchBar'
import AssignatureCard from './AssignatureCard'

const AssignaturesModal = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
        <div 
            className={styles.AssignaturesModal} 
            onClick={e => e.stopPropagation()}  // evita cerrar al clickear dentro
        >
            <h3 className='text-white text-center'>Materias</h3>
            <div className='container d-flex flex-column gap-3'>
                <div className='row'>
                    <div className='col-12'>
                        <SearchBar />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <h4>Primer Año</h4>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <AssignatureCard />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AssignaturesModal