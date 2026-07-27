import React, { useEffect, useRef, useState } from 'react'
import styles from './Studies.module.css'
import CertifCard from './Certifications/CertifCard';
import certified from '../../certifications.json'
import Academic from './Academic/Academic';
import Certifications from './Certifications/Certifications';


const Proyects = () => {

  return (
    <section
        className={`d-flex flex-column ${styles.studiesSection}`}
        id="studies"
    >
        <Academic />
        <Certifications />
    </section>
  )
}

export default Proyects