import React from 'react'
import styles from './Carroussel.module.css'

const Carroussel = ({img1, img2, img3}) => {
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade w-100">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img src={'carrousselImages/'+ img1} className={`d-block w-100 ${styles.carouselImage}`} alt="..." />
            </div>
            <div className="carousel-item">
                <img src={'../../assets/carrousselImages/'+ img2} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
                <img src={'../../assets/carrousselImages/'+ img3} className="d-block w-100" alt="..." />
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
        </button>
    </div>
  )
}

export default Carroussel