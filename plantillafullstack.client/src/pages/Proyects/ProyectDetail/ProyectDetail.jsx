import React from 'react'
import styles from './ProyectDetail.module.css'
import Carroussel from '../../../components/carroussel/Carroussel'
import githubIcon from '../../../assets/github.png'
import productionIcon from '../../../assets/clapper.png'

const ProyectDetail = ({selectedProy, onClose}) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
        <div 
            className={styles.ProyectDetailModal} 
            onClick={e => e.stopPropagation()}  // evita cerrar al clickear dentro
        >
            <h3 className='text-white text-center'>{selectedProy.title}</h3>
            <div className={styles.containerImages}>
                <Carroussel img1 = {selectedProy.img}/>
            </div>
            <div className='container d-flex flex-column gap-3'>
                <div className='row'>
                    <p>{selectedProy.description}</p>
                </div>
                <div className='row'>
                    <a 
                        className={`col-6 d-flex flex-column align-items-center justify-content-between ${styles.iconContainer} ${styles.githubContainer}`}
                        href={`https://github.com/unreinramiro/${selectedProy.gitHub}`}
                        target="_blank"
                        >
                        <h4 className='text-center'>Ver en GitHub</h4>
                        <img
                            src={githubIcon}
                            className='img-fluid bg-white p-1 rounded'
                            style={{ width: '40px', height: '40px' }}
                            />
                    </a>
                    <a className={`col-6 d-flex flex-column align-items-center ${styles.iconContainer} ${styles.prodContainer}`}>
                        <h4 className='text-center'>Ver en Produccion</h4>
                        <img 
                            src={productionIcon} 
                            className='img-fluid bg-white p-1 rounded'
                            style={{ width: '40px', height: '40px' }}
                            />
                    </a>
                </div>
                <div className='row'>
                    <div className='col-sm-12 d-flex gap-1 flex-wrap'>
                    {selectedProy.tecnologies.map((tecnology, index) => (
                        <span key={index} className='badge bg-transparent border border-secondary text-white-50 px-3 py-2' style={{borderRadius: "0px", fontSize: "0.75rem"}}>
                            {tecnology}
                        </span>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProyectDetail