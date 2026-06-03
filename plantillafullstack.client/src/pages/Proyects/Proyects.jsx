import React, {useState, useEffect, useRef} from 'react'
import styles from './Proyects.module.css'
import ProyectCard from './ProyectCards/ProyectCard';
import proyectos from '../../proyects.json'

const Proyects = () => {

    const [isVisibleProy, setIsVisibleProy] = useState(false);
    const sectionProyectsRef = useRef(null);
    const [proyects, setProyects] = useState([]);

    useEffect(() => {
        setProyects(proyectos);
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
        className='d-flex flex-column h-100'
        id="proyects"
    >
        <div 
            ref={sectionProyectsRef} 
            className={`${styles.contentProyects} ${isVisibleProy ? styles.visibleProyects : ''} container px-3 text-light text-center d-flex flex-column`}
        >
            <div className='row justify-content-center'>
                <div className='col-12 d-flex flex-column gap-3'>
                    <h2>PROYECTOS</h2>
                </div>
            </div>
            <div className={`${styles.proyectsContainer} row justify-content-center g-3`}>
                    {proyects.map((proyect, index) => (
                        <div 
                            className={`${styles.proyectCard} col-12 col-sm-6 col-lg-4`}
                            key={index}
                        >
                                <ProyectCard
                                    
                                    title={proyect.title}
                                    desc={proyect.description}
                                    tecnologies={proyect.tecnologies}
                                    image={proyect.img}
                                />
                        </div>
                    ))}
            </div>
        </div>    
    </section>
  )
}

export default Proyects