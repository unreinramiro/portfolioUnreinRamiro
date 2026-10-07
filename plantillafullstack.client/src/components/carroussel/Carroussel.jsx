import React from "react";
import styles from "./Carroussel.module.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Carroussel = ({ img1, img2, img3 }) => {
  return (
    <div
      id="carouselExampleFade"
      className={`carousel slide carousel-fade w-100 ${styles.carouselContainer}`}
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={`http://localhost:5231/images/${img1}`}
            className={`d-block w-100 ${styles.carouselImage}`}
            alt="..."
          />
        </div>
        {img2 &&(
            <div className="carousel-item">
            <img
                src={`http://localhost:5231/images/${img2}`}
                className={`d-block w-100 ${styles.carouselImage}`}
                alt="..."
            />
            </div>
        )}
        {img3 && (
          <div className="carousel-item">
            <img
              src={`http://localhost:5231/images/${img3}`}
              className={`d-block w-100 ${styles.carouselImage}`}
              alt="..."
            />
          </div>
        )}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};

export default Carroussel;
