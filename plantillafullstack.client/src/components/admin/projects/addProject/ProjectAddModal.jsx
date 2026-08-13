import React, { useState, useEffect } from "react";
import styles from "./ProjectAddModal.module.css";
import axiosInstance from "../../../../services/api";

const ProjectAddModal = ({ onClose, onSave }) => {
  const [allTechnologies, setAllTechnologies] = useState([]);

  const [selectedTechIds, setSelectedTechIds] = useState([]);

  const [form, setForm] = useState({
    ProTitle: "",
    ProDescription: "",
    ProGithubUrl: "",
    ProProductionUrl: "",
  });

  const [images, setImages] = useState({
    ProImg1: "",
    ProImg2: "",
    ProImg3: "",
    ProImg4: "",
  });

  const [imageFiles, setImageFiles] = useState({});

  const handleImageChange = (key, file) => {
    if (!file) return;
    setImages({ ...images, [key]: URL.createObjectURL(file) });
    setImageFiles({ ...imageFiles, [key]: file }); // Le suma o sobrescribe la propiedad cuyo nombre es el valor de key
  };

  useEffect(() => {
    axiosInstance
      .get("technologies")
      .then((res) => setAllTechnologies(res.data));
  }, []);

  const toggleTech = (id) => {
    setSelectedTechIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ProTitle", form.ProTitle);
    formData.append("ProDescription", form.ProDescription);
    formData.append("ProGithubUrl", form.ProGithubUrl);
    formData.append("ProProductionUrl", form.ProProductionUrl);

    selectedTechIds.forEach((id) => formData.append("Technologies", id));

    Object.entries(imageFiles).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    onSave(formData);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.ProjectAddModal}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-white text-center">Agregar Proyecto</h3>

        <form
          className="container d-flex flex-column gap-3"
          onSubmit={handleSubmit}
        >
          <div className="row">
            {["ProImg1", "ProImg2", "ProImg3", "ProImg4"].map((key, i) => (
              <div className="col-3" key={key}>
                <label htmlFor={key} className={styles.imageSlot}>
                  <span>+</span>
                </label>
                <input
                  id={key}
                  type="file"
                  accept="image/*"
                  className="d-none"
                  name={`ProImg${i + 1}`}
                  onChange={(e) => handleImageChange(key, e.target.files[0])}
                />
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-12">
              <label className="text-white">Título</label>
              <input
                type="text"
                name="ProTitle"
                className={styles.input}
                value={form.ProTitle}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <label className="text-white">Descripción</label>
              <textarea
                name="ProDescription"
                rows={3}
                className={styles.input}
                value={form.ProDescription}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="text-white">GitHub URL</label>
              <input
                type="text"
                name="ProGithubUrl"
                className={styles.input}
                value={form.ProGithubUrl}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label className="text-white">Producción URL</label>
              <input
                type="text"
                name="ProProductionUrl"
                className={styles.input}
                value={form.ProProductionUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <label className="text-white">Tecnologías</label>
              <div className={styles.techGrid}>
                {allTechnologies.map((tech) => (
                  <label key={tech.teC_ID} className={styles.techChip}>
                    <input
                      type="checkbox"
                      checked={selectedTechIds.includes(tech.teC_ID)}
                      onChange={() => toggleTech(tech.teC_ID)}
                    />
                    {tech.teC_NAME}
                  </label>
                ))}
              </div>
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

export default ProjectAddModal;
