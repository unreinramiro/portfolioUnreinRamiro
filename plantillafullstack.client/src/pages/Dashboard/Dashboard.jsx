import React, { useState } from 'react'
import styles from './Dashboard.module.css'
import ProfileAdm from '../../components/admin/profile/ProfileAdm'
import ProjectsAdm from '../../components/admin/projects/ProjectsAdm'
import StudiesAdm from '../../components/admin/studies/StudiesAdm'
import AssignaturesAdm from '../../components/admin/assignatures/AssignaturesAdm'
import TechAdm from '../../components/admin/technologies/TechAdm'
import { alertSuccess, alertError, alertConfirm, alertToast } from '../../utils/alerts'

const Dashboard = () => {

    const [activeTab, setActiveTab] = useState("Profile");
    const [session, setSession] = useState("on");

  return (
    <section className={styles.dashboardSection}>
        <div className={`container ${styles.dashboardContainer}`}>
            <div className='row flex-column flex-lg-row w-100 g-0'>
                <div className='col-12 col-lg-3'>
                    <div className={`row ${styles.titleContainer}`}>
                        <h3 className='text-white text-center'>Dashboard</h3>
                    </div>
                    <div className={`d-flex flex-row flex-lg-column ${styles.buttonsContainer}`}>
                        <button 
                            onClick={() => setActiveTab("Profile")}
                            className={`${styles.sidebarButton} ${
                            activeTab === "Profile" ? styles.active : ""}`}
                            >Profile</button>
                        <button 
                            onClick={() => setActiveTab("Projects")}
                            className={`${styles.sidebarButton} ${
                            activeTab === "Projects" ? styles.active : ""}`}
                            >Projects</button>
                        <button 
                            onClick={() => setActiveTab("Studies")}
                            className={`${styles.sidebarButton} ${
                            activeTab === "Studies" ? styles.active : ""}`}>Studies</button>
                        <button 
                            onClick={() => setActiveTab("Assignatures")}
                            className={`${styles.sidebarButton} ${
                            activeTab === "Assignatures" ? styles.active : ""}`}>Assignatures</button>
                        <button 
                            onClick={() => setActiveTab("Technologies")}
                            className={`${styles.sidebarButton} ${
                            activeTab === "Technologies" ? styles.active : ""}`}>Technologies</button>
                    </div>
                    <div className={`row ${styles.closeSessionContainer}`}>
                        <button
                            onClick={() => setSession("off")}
                            className={`${styles.closeSessionButton} ${
                            session === "off" ? styles.activeSession : ""}`}
                        >Cerrar sesion</button>
                    </div>
                </div>
                <div className={`col-12 col-lg-9 ${styles.contenidoContainer}`}>
                    <div className={`row p-3`}>
                        <h3 className='text-white text-center'>{activeTab}</h3>
                    </div>
                    <div className='row flex-grow-1 align-items-center'>
                        {activeTab === "Profile" && <ProfileAdm />}
                        {activeTab === "Projects" && <ProjectsAdm />}
                        {activeTab === "Studies" && <StudiesAdm />}
                        {activeTab === "Assignatures" && <AssignaturesAdm />}
                        {activeTab === "Technologies" && <TechAdm />}
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Dashboard