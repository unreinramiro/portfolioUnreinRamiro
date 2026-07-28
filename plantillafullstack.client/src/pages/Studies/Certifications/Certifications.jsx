import React, {useState, useEffect} from 'react'
import styles from '../Certifications/Certifications.module.css'
import axiosInstance from '../../../services/api'
import CertifCard from './CertifCard'
import AnimatedCard from './AnimatedCard/AnimatedCard'

const Certifications = () => {

    const [certifications, setCertifications] = useState([]);

    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const response = await axiosInstance.get('studies/courses-certifications'); // Realiza una solicitud GET a /api/products
                setCertifications(response.data); // Actualiza el estado con los datos obtenidos
                console.log('Certificaciones obtenidas:', response.data);
            } catch (err) {
                console.error("Error al obtener los certificados", err); // Muestra el error en consola
            }
        };

        fetchCertifications();
    }, []); 


    const chunkArray = (arr, size) =>
    arr.reduce((acc, _, i) => i % size === 0 ? [...acc, arr.slice(i, i + size)] : acc, []);

  return (
        <div className={`${styles.certificationsSection} py-5`}>
            <div className="container">
                <h4 className="text-center mb-5">
                    CURSOS Y CERTIFICACIONES
                </h4>

                {chunkArray(certifications, 2).map((row, rowIndex) => (
                    <div className="row justify-content-center g-4 mb-4" key={rowIndex}>
                        {row.map((certification, index) => (
                            <div 
                                className={`col-12 col-md-6 d-flex ${styles.cardAnimation}`}
                                key={index}
                                style={{ animationDelay: `${index * 0.15}s` }}>
                                <AnimatedCard>
                                    <CertifCard
                                        title={certification.stD_TITLE}
                                        institution={certification.stD_INSTITUTION}
                                        hours={certification.stD_HOURS}
                                    />
                                </AnimatedCard>

                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
  )
}

export default Certifications