import React, { useState, useRef, useEffect } from 'react'
import AssignaturesModal from '../Assignatures/AssignaturesModal'
import styles from '../Academic/Academic.module.css'

const Academic = () => {

    const [showModal, setShowModal] = useState(false);
    const sectionStudiesRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect(); // Solo anima una vez
            }
        },
        { threshold: 0.2 }
    );

    if (sectionStudiesRef.current) observer.observe(sectionStudiesRef.current);

    return () => observer.disconnect();
    }, []);

  return (
        <div className={styles.heroSection}>
            <div
                ref={sectionStudiesRef}
                className={`${styles.content} ${isVisible ? styles.visible : ''} container px-3 text-light text-center d-flex flex-column`}
            >
                <div className='row justify-content-center'>
                    <div className='col-12 d-flex flex-column gap-3'>
                        <h2>ESTUDIOS</h2>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <div className={`col-12 col-md-10 ${styles.academicFormContainer}`}>    
                        <h3 style={{height: "10px", margin: "0"}}>FORMACIÓN ACADÉMICA</h3>
                        <hr></hr>
                        <div className='d-flex justify-content-between align-items-center gap-2'>
                            <h2>Tecnicatura Universitaria en Programacion</h2>
                            <b className='bg-light text-dark'>En curso</b>
                        </div>
                        <div className='d-flex'>
                            <p>Universidad Tecnológica Nacional (UTN)</p>
                        </div>
                        <div className='d-flex'>
                            <p>2026 - Actualidad</p>
                        </div>
                        <div className='d-flex mt-2'>
                            <p>Formación integral en desarrollo de software, bases de datos, redes y arquitectura de sistemas.</p>
                        </div>
                        <hr style={{height: "10px", margin: "0"}}></hr>
                        <a onClick={() => setShowModal(true)}>Ver Materias</a>
                    </div>
                </div>
            </div>
            {showModal && <AssignaturesModal onClose={() => setShowModal(false)}/>}
        </div>
  )
}
export default Academic