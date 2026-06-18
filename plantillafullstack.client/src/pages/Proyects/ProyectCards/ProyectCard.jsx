import React, { useState, useEffect } from 'react'
import styles from './ProyectCard.module.css'
import imgProy1 from '../../../assets/aritzProyect.png'

const ProyectCard = ({onShowModal, proyect}) => {

  return (
    <div className={styles.proyectCardContainer}>
        <div className='row'>
            <div className='col-12 d-flex flex-column gap-3 justify-content-between'>
                <div className={styles.imageProyectContainer}>
                    <img src={'../../../../src/assets/' + proyect.img} alt="proyect1"/>
                </div>
                <h6>{proyect.title}</h6>
                <div className={styles.descriptionContainer}>
                    <p>{proyect.desc}</p>
                </div>
                <div className={styles.tagsContainer}>
                    {proyect.tecnologies.map((tecnology, index) => (
                        <span key={index} className='badge bg-transparent border border-secondary text-white-50 px-3 py-2' style={{borderRadius: "0px", fontSize: "0.75rem"}}>
                            {tecnology}
                        </span>
                    ))}
                </div>
                <div className={styles.detalleContainer}>
                    <button onClick={() => onShowModal(proyect)}>Ver detalle</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProyectCard