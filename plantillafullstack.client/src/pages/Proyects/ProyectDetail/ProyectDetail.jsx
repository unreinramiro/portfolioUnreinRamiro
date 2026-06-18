import React from 'react'
import styles from './ProyectDetail.module.css'

const ProyectDetail = ({selectedProy, onClose}) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
        <div 
            className={styles.ProyectDetailModal} 
            onClick={e => e.stopPropagation()}  // evita cerrar al clickear dentro
        >
            <h3 className='text-white text-center'>{selectedProy.title}</h3>

        </div>
    </div>
  )
}

export default ProyectDetail