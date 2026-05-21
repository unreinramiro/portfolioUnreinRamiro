import React from 'react'
import fotoCv from '../../assets/fotoCv.jpg'
import styles from './Presentation.module.css'

const Presentation = () => {
  return (
    <section id="home">
        <div className="container h-100">
            <div className="row h-100 align-items-center">
                <div className="col-lg-12 text-center">
                    <div className={styles.imageAndName}>
                        <div className={styles.fotoCv}>
                            <img src={fotoCv} />
                        </div>
                        <h1 className="text-white">Ramiro Unrein</h1>
                        <div>
                            <p className="text-white text-opacity-50 fs-5">Desarrollador Full Stack</p>
                            <b className="text-white text-opacity-50 fs-5">React JS / .NET Core / SQL Server</b>
                        </div>
                        <div className={styles.containerBtns}>
                            <a href="#proyects" className={`${styles.btnProyContact} ${styles.btnProy}`} >Ver proyectos</a>
                            <button className={`${styles.btnProyContact} ${styles.btnContact}`}>Contactar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Presentation