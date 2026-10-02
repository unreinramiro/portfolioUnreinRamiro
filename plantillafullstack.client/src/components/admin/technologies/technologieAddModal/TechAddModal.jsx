import React, { useState, useEffect } from "react";
import styles from "./TechAddModal.module.css";

const TechAddModal = ({ onClose, onSave }) => {
  const [formTech, setFormTech] = useState({
    TecTcyId: 1,
    TecName: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formTech);
    onSave(formTech);
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    let parsedValue = value;

    if(name == "TecTcyId"){
        parsedValue = ParseInt(value);
    }
    setFormTech((prev) => ({
        ...prev,
        [name]: parsedValue,
    }));
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.TechAddModal} onClick={(e) => e.stopPropagation()}>
        <h3 className="text-white text-center">Agregar Tecnologia</h3>

        <form
          className="container d-flex flex-column gap-3"
          onSubmit={handleSubmit}
        >
          <div className="row">
            <div className="col-12">
              <label className="text-white">Nombre</label>
              <input
                type="text"
                name="TecName"
                className={styles.input}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <label className="text-white">Categoria</label>
              <select
                className={styles.input}
                name="TecTcyId"
                onChange={handleChange}
              >
                <option value="1">Frontend</option>
                <option value="2">Backend</option>
                <option value="3">Bases de Datos</option>
                <option value="4">Herramientas</option>
              </select>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-12 d-flex justify-content-between gap-2">
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.saveBtn}>
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TechAddModal;
