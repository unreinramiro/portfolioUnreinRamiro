import React, { useEffect, useState, useRef } from 'react'
import styles from './ProjectsAdm.module.css'
import axiosInstance from '../../../services/api'
import ProjectCard from '../../../pages/Proyects/ProyectCards/ProyectCard'
import SearchBar from '../../SearchBar/SearchBar'
import { FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";


const ProjectsAdm = () => {

  const [projects, setProjects] = useState([]);
  const scrollRef = useRef(null);

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

  return (
    <div className={`container`}>
        <div className='row p-4'>
          <div className='col d-flex justify-content-center'>
            <SearchBar />
          </div>
          <div className='col-3 d-flex justify-content-center'>
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
                  proyect={proyect}
                  textButton={"Editar"} />
              </div>
            ))}
          </div>

          <button 
            className={styles.arrowButton} 
            onClick={() => scroll('right')}>
            <FaChevronRight />
          </button>
        </div>
    </div>
  )
}

export default ProjectsAdm