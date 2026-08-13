import React, { useEffect, useState, useRef } from "react";
import styles from "./ProjectsAdm.module.css";
import axiosInstance from "../../../services/api";
import ProjectCard from "../../../pages/Proyects/ProyectCards/ProyectCard";
import SearchBar from "../../SearchBar/SearchBar";
import { FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProjectEditModal from "./editModal/ProjectEditModal";
import {
  alertSuccess,
  alertError,
  alertConfirm,
  alertToast,
  alertDelete,
} from "../../../utils/alerts";
import Swal from "sweetalert2";
import ProjectAddModal from "./addProject/ProjectAddModal";

const ProjectsAdm = () => {
  const [projects, setProjects] = useState([]);
  const scrollRef = useRef(null);
  const [editingProject, setEditingProject] = useState(null);
  const [showModalProy, setShowModalProy] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get("projects");
      setProjects(response.data);
      console.log("Projectos obtenidos:", response.data);
    } catch (e) {
      console.log("Error al traer los projectos");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -clientWidth / 2 : clientWidth / 2,
        behavior: "smooth",
      });
    }
  };

  const handleEditProject = async (proyect) => {
    const res = await axiosInstance.get(`technologies/${proyect.prO_ID}`);
    setEditingProject({ ...proyect, technologies: res.data });
  };

  return (
    <div className={`container`}>
      <div className="row p-4 g-4">
        <div className="col-lg-9 col-sm-12 d-flex justify-content-center">
          <SearchBar />
        </div>
        <div className="col-lg-3 col-sm-12 d-flex justify-content-center">
          <button
            className={styles.addButton}
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus />
            Agregar
          </button>
        </div>
      </div>
      <div className={styles.carouselWrapper}>
        <button className={styles.arrowButton} onClick={() => scroll("left")}>
          <FaChevronLeft />
        </button>

        <div className={styles.projectsContainer} ref={scrollRef}>
          {projects.map((proyect, index) => (
            <div key={index} className={styles.projectItem}>
              <ProjectCard
                onShowModal={handleEditProject}
                proyect={proyect}
                textButton={"Editar"}
              />
            </div>
          ))}
        </div>

        <button className={styles.arrowButton} onClick={() => scroll("right")}>
          <FaChevronRight />
        </button>
      </div>
      {editingProject && (
        <ProjectEditModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSave={async (formData) => {
            try {
              await axiosInstance.put(
                `projects/${editingProject.prO_ID}`,
                formData,
                {
                  headers: { "Content-Type": undefined },
                },
              );
              setEditingProject(null);
              alertSuccess(
                "Proyecto actualizado!",
                "Los cambios se guardaron correctamente",
              );
              fetchProjects();
            } catch (err) {
              console.error("Error al actualizar el proyecto", err.response?.data);
            }
          }}
          onDelete={async (id) => {
            const result = await alertDelete(
              "¿Eliminar proyecto?",
              "Esta acción no se puede deshacer.",
            );

            if (!result.isConfirmed) return;

            try {
              await axiosInstance.delete(`projects/delete/${id}`);
              setEditingProject(null);
              fetchProjects();
              alertSuccess("Proyecto eliminado");
            } catch (err) {
              console.error("Error al eliminar el proyecto", err);
              alertError("No se pudo eliminar el proyecto");
            }
          }}
        />
      )}
      {showAddModal && (
        <ProjectAddModal
          onClose={() => setShowAddModal(false)}
          onSave={async (formData) => {
            try {
              const response = await axiosInstance.post(
                'projects/addProject',
                formData,
                {
                  headers: { "Content-Type": undefined },
                },
              );
              setShowAddModal(false);
              fetchProjects();
              alertSuccess("Se agrego correctamente el proyecto");
            } catch (error) {
              console.error("Error al agregar el proyecto", err);
              alertError("No se pudo agregar el proyecto");
            }
          }}
        />
      )}
    </div>
  );
};

export default ProjectsAdm;
