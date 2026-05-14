import React from 'react';
import styles from './Home.module.css';
import fotoCv from '../../assets/fotoCv.jpg'

const Home = () => {
    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className={styles.imageAndName}>
                                <div className={styles.fotoCv}>
                                    <img src={fotoCv} />
                                </div>
                                <h1 className="text-white">Ramiro Unrein</h1>
                                <div>
                                    <p className="text-white text-opacity-50 fs-5">Desarrollador Full Stack</p>
                                    <b className="text-white text-opacity-50 fs-5">React JS / .NET Core / SQL Server</b>
                                </div>
                                <div className={styles.containerBtns}>
                                    <button className={`${styles.btnProyContact} ${styles.btnProy}`} >Ver proyectos</button>
                                    <button className={`${styles.btnProyContact} ${styles.btnContact}`}>Contactar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;