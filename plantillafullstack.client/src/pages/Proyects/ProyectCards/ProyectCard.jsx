import React from 'react'
import styles from './ProyectCard.module.css'
import imgProy1 from '../../../assets/aritzProyect.png'

const ProyectCard = () => {
  return (
    <div className={styles.proyectCardContainer} id='container'>
        <div className='row'>
            <div className='col-12 d-flex flex-column gap-3 justify-content-between'>
                <div className={styles.imageProyectContainer}>
                    <img src={imgProy1} alt="proyect1" className='img-fluid'/>
                </div>
                <h6>Proyecto 1</h6>
                <div className={styles.descriptionContainer}>
                    <p>Descripcion</p>
                </div>
                <div className={styles.tagsContainer}>
                    <span className='badge bg-transparent border border-secondary text-white-50 px-3 py-2' style={{borderRadius: "0px", fontSize: "0.75rem"}}>React</span>
                    <span className='badge bg-transparent border border-secondary text-white-50 px-3 py-2' style={{borderRadius: "0px", fontSize: "0.75rem"}}>.NET</span>
                    <span className='badge bg-transparent border border-secondary text-white-50 px-3 py-2' style={{borderRadius: "0px", fontSize: "0.75rem"}}>SQL Server</span>
                    <span className='badge bg-transparent border border-secondary text-white-50 px-3 py-2' style={{borderRadius: "0px", fontSize: "0.75rem"}}>Bootstrap</span>
                </div>
                <div className={styles.detalleContainer}>
                    <button>Ver detalle</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProyectCard