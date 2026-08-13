import React, { useEffect, useState, useRef } from 'react'
import styles from './ProjectsAdm.module.css'
import axiosInstance from '../../../services/api'
import ProjectCard from '../../../pages/Proyects/ProyectCards/ProyectCard'
import SearchBar from '../../SearchBar/SearchBar'
import { FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProjectEditModal from './editModal/ProjectEditModal'
import { alertSuccess, alertError, alertConfirm, alertToast } from '../../../utils/alerts'


const ProjectsAdm = () => {

  const [projects, setProjects] = useState([]);
  const scrollRef = useRef(null);
  const [editingProject, setEditingProject] = useState(null);
  const [showModalProy, setShowModalProy] = useState(false);

  const fetchProjects = async () => {
    try{
      const response = await axiosInstance.get('projects');
      setProjects(response.data);
      console.log('Projectos obtenidos:', response.data);
    }catch(e){
      console.log("Error al traer los projectos");
    }
  };

  useEffect(()=>{
    fetchProjects();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -clientWidth / 2 : clientWidth / 2,
        behavior: 'smooth'
      });
    }
  };

  const handleEditProject = async (proyect) => {
    const res = await axiosInstance.get(`technologies/${proyect.prO_ID}`);
    setEditingProject({...proyect, technologies: res.data});
  };

  return (
    <div className={`container`}>
        <div className='row p-4 g-4'>
          <div className='col-lg-9 col-sm-12 d-flex justify-content-center'>
            <SearchBar />
          </div>
          <div className='col-lg-3 col-sm-12 d-flex justify-content-center'>
            <button className={styles.addButton}>
              <FaPlus />Agregar</button>
          </div>
        </div>
        <div className={styles.carouselWrapper}>
          <button 
            className={styles.arrowButton} 
            onClick={() => scroll('left')}>
            <FaChevronLeft />
          </button>

          <div 
            className={styles.projectsContainer} 
            ref={scrollRef}>
            {projects.map((proyect, index) => (
              <div 
                key={index} 
                className={styles.projectItem}>
                <ProjectCard 
                  onShowModal={handleEditProject}
                  proyect={proyect}
                  textButton={"Editar"}/>
              </div>
            ))}
          </div>

          <button 
            className={styles.arrowButton} 
            onClick={() => scroll('right')}>
            <FaChevronRight />
          </button>
        </div>
        {editingProject && (
            <ProjectEditModal
                project={editingProject}
                onClose={() => setEditingProject(null)}
                onSave={async (formData) => {
                  try {
                    await axiosInstance.put(`projects/${editingProject.prO_ID}`, formData, {
                      headers: { 'Content-Type': undefined }
                    });
                    setEditingProject(null);
                    alertSuccess('Proyecto actualizado!', 'Los cambios se guardaron correctamente');
                    fetchProjects();
                  } catch (err) {
                    console.error("Error al actualizar el proyecto", err);
                  }
                }} />
        )}
    </div>
  )
}

export default ProjectsAdm