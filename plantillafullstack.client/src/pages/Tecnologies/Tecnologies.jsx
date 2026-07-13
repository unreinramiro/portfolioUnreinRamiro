import React, { useEffect, useState } from 'react'
import styles from './Tecnologies.module.css'
import TecnCard from './TecnologiesCards/TecnCard'
import allTecnologies from '../../tecnologies.json'

const Tecnologies = () => {

    const [tecnologies, setTecnologies] = useState([]);

    useEffect(() => {
      setTecnologies(allTecnologies);
    }, []);

  return (
    <section 
        className={`${styles.sectionTecnologies} d-flex flex-column min-vh-100`}
    >
      <div className={`${styles.contentTecnologies} container px-3 text-light text-center d-flex flex-column gap-3`}>
            <div className='row justify-content-center'>
                <div className='col-12 d-flex flex-column gap-3'>
                    <h2>TECNOLOGIAS</h2>
                </div>
            </div>
            <div className='row g-3'>
              {tecnologies.map((tecno, index) => (
                <div 
                  className={`${styles.cardContainer} col-12 col-sm-6 col-lg-3`}
                  key={index}
                >
                  <TecnCard 
                    tecs={tecno}
                  />
                </div>
              ))}
            </div>
      </div>
    </section>
  )
}

export default Tecnologies