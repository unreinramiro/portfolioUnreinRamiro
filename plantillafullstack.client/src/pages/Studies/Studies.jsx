import React, { useEffect, useRef, useState } from 'react'
import styles from './Studies.module.css'
import CertifCard from './Certifications/CertifCard';
import certified from '../../certifications.json'
import AssignaturesModal from './Assignatures/AssignaturesModal';

const Proyects = () => {

    const [certifications, setCertifications] = useState([]);
    const [showModal, setShowModal] = useState(false);

      const sectionStudiesRef = useRef(null);
      const [isVisible, setIsVisible] = useState(false);
    
      useEffect(() => {
        setCertifications(certified);

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

      const chunkArray = (arr, size) =>
        arr.reduce((acc, _, i) => i % size === 0 ? [...acc, arr.slice(i, i + size)] : acc, []);
      
  return (
    <section
        className='d-flex flex-column gap-5 h-100'
        id="studies"
    >
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
        <h4>CURSOS Y CERTIFICACIONES</h4>
        <div className='container'>
            {chunkArray(certifications, 2).map((row, rowIndex) => (
                <div className='row justify-content-center g-4 mb-4' key={rowIndex} >
                    {row.map((certification, index) => (
                        <div className='col-12 col-md-6 d-flex' key={index}>
                            <CertifCard
                                title={certification.title}
                                institution={certification.institution}
                                date={certification.date}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </section>
  )
}

export default Proyects