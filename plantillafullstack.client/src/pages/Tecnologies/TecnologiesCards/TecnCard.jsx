import { useState } from "react";
import styles from "./TecnCard.module.css";

const TecnCard = ({ title, items }) => {
  switch (title) {
    case 1:
      title = "Frontend";
      break;
    case 2:
      title = "Backend";
      break;
    case 3:
      title = "Base de datos";
      break;
    case 4:
      title = "Herramientas";
      break;
  }

  return (
    <div className={`container ${styles.containerTecnCard}`}>
      <div className="row">
        <h3>{title}</h3>
      </div>
      <div className="row">
        <div className={`col-12 ${styles.subContainerTecnCard}`}>
          {items.map((item) => (
            <p key={item.teC_ID}>{item.teC_NAME}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TecnCard;
