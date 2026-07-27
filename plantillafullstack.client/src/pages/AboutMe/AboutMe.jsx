import React, { useEffect, useRef, useState } from 'react'
import styles from './AboutMe.module.css'
const AboutMe = ({profile}) => {

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
      className={`${styles.aboutMeContainer}`}
    >
        <div 
          ref={sectionRef}
          className={`${styles.content} ${isVisible ? styles.visible : ''} container text-light text-center d-flex flex-column justify-content-center`}>
          <div className='row justify-content-center align-items-center'>
            <div className='col-8 d-flex flex-column gap-3'>
              <h2>SOBRE MI</h2>
              <p>
                 {profile.prO_DESC}
             </p>
            </div>
          </div>
        </div>
    </section>
  )
}

export default AboutMe