import React from 'react'
import styles from './CertifCard.module.css'
import certified from '../../../assets/certified.png'
import downloadIcon from '../../../assets/downloads.png'

const CertifCard = ({title, institution, date, certificate}) => {
  return (
    <div className={`w-100 h-100 ${styles.certifCardContainer}`}>
        <div className='row'>
            <div className='col-10'>
                <h5>{title}</h5>
            </div>
            <div className='col-2 text-end'>
                <img 
                    src={certified} 
                    alt="certified"
                    className='img-fluid'
                    width={30}
                />
            </div>
        </div>
        <div className='row'>
            <div className='col-12'>
                <p>{institution}</p>
            </div>
        </div>
        <div className='row'>
            <div className='col-8'>
                <p>40 horas</p>
            </div>
            <div className='col-4'>
                <p className='text-end'>{date}</p>
            </div>
        </div>
        <div className='row mt-3'>
            <div className='col-10'>
                <a className="text-white text-start">Descargar certificado</a>
            </div>
            <div className='col-2 text-end'>
                <img 
                    src={downloadIcon} 
                    alt="certified"
                    className={styles.whiteIcon}
                    width={15}
                />
            </div>
        </div>
    </div>
  )
}

export default CertifCard