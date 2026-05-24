import React, {useState, useEffect, useRef} from 'react'
import styles from './Proyects.module.css'

const Proyects = () => {

    const [isVisibleProy, setIsVisibleProy] = useState(false);
    const sectionProyectsRef = useRef(null);

    useEffect(() => {

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisibleProy(true);
                    observer.disconnect(); // Solo anima una vez
                }
            },
            { threshold: 0.2 }
        );

        if (sectionProyectsRef.current) observer.observe(sectionProyectsRef.current);
        return () => observer.disconnect();
      }, []);

  return (
    <section
        className='d-flex flex-column gap-5 h-100'
        id="proyects"
    >
        <div 
            ref={sectionProyectsRef} className={`${styles.contentProyects} ${isVisibleProy ? styles.visibleProyects : ''} container px-3 text-light text-center d-flex flex-column`}>
            <div className='row justify-content-center'>
                <div className='col-12 d-flex flex-column gap-3'>
                    <h2>Proyectos</h2>
                </div>
            </div>
        </div>    
    </section>
  )
}

export default Proyects