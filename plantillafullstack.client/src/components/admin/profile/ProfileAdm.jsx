import React, { useState, useEffect } from 'react'
import styles from './ProfileAdm.module.css'
import axiosInstance from '../../../services/api'
import { FaPen } from "react-icons/fa";

const ProfileAdm = () => {

      const [profile, setProfile] = useState({});
      const [formProfile, setFormProfile] = useState({
        profileName : '',
        profileSurname: '',
        profileDesc: '',
        profileImg: ''
      });
      const [editMode, setEditMode] = useState(false);

      useEffect(() => {
          const fetchProfile = async () => {
              try {
                  const response = await axiosInstance.get('profile'); // Realiza una solicitud GET a /api/products
                  setProfile(response.data); // Actualiza el estado con los datos obtenidos
                  console.log('Profile obtenido:', response.data);
              } catch (err) {
                  console.error("Error al obtener el profile", err); // Muestra el error en consola
              }
          };

          fetchProfile();
      }, []);

      const handleChange = (e) => {
        const {name, value} = e.target;
        setFormProfile({...formProfile, [e.target.name] : e.target.value})
      };

  return (
        <div className={`container ${styles.presentationContainer}`}>
          <div className="row h-100 align-items-center">
                <div className="col-lg-12 text-center">
                    <div className={styles.imageAndName}>
                        <div className={styles.fotoCv}>
                            <img src={`/src/assets/${profile.prO_IMG}`} />
                        </div>
                        <h1 className="text-white">{profile.prO_NAME} {profile.prO_SURNAME}</h1>
                        <div>
                            <p className="text-white text-opacity-50 fs-5">Desarrollador Full Stack</p>
                            <b className="text-white text-opacity-50 fs-5">React JS / .NET Core / SQL Server</b>
                        </div>
                        <div>
                          <button
                              className={styles.editButton}
                              onClick={() => setEditMode(true)}
                          >
                              Editar
                          </button>
                        </div>
                    </div>
                </div>
          </div>
        </div>
  )
}

export default ProfileAdm