import React, { useEffect, useRef, useState } from 'react'
import styles from './AboutMe.module.css'
const AboutMe = () => {

  const sectionRef = useRef(null);
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

      if (sectionRef.current) observer.observe(sectionRef.current);

      return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="aboutMe"
      className={styles.aboutMeContainer}
    >
        <div 
          ref={sectionRef}
          className={`${styles.content} ${isVisible ? styles.visible : ''} container text-light text-center d-flex flex-column`}>
          <div className='row justify-content-center'>
            <div className='col-8 d-flex flex-column gap-3'>
              <h2>SOBRE MI</h2>
              <p>
                 Soy un desarrollador fullstack de Argentina, mi enfoque se basa en soluciones reales con APIs robustas.
                 Las mismas las llevo a cabo con .NET Core y React.
                 Cuento con experiencia practica desarrollando aplicaciones web tales como ecommerces, sistemas de gestión de inventarios, entre otros.
                 Mi perfil esta complementado con el manejo de bases de datos relacionales, herramientas esenciales como Git y OpenShift.
             </p>
             <p>
                Actualmente me encuentro cursando la carrera de Tecnicatura Universitaria en Programacion en la UTN.
              </p>
            </div>
          </div>
        </div>
    </section>
  )
}

export default AboutMe