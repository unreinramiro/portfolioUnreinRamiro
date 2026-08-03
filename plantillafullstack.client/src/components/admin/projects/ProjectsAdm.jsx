import React, { useEffect, useState } from 'react'
import styles from './ProjectsAdm.module.css'
import axiosInstance from '../../../services/api'
import ProjectCard from '../../../pages/Proyects/ProyectCards/ProyectCard'

const ProjectsAdm = () => {

  const [projects, setProjects] = useState([]);

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

  return (
    <div className={`container`}>
      <div className="row h-100 align-items-center">
         <div className="col-lg-12 text-center">
          {projects.map((proyect, index) => (
            <ProjectCard 
              key={index}
              proyect={proyect}
            />
          ))}
         </div>
      </div>
    </div>
  )
}

export default ProjectsAdm