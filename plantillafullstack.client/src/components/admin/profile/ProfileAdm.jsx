import React, { useState, useEffect } from 'react'
import styles from './ProfileAdm.module.css'
import axiosInstance from '../../../services/api'
import { FaPen } from "react-icons/fa";
import { alertSuccess, alertError, alertConfirm, alertToast } from '../../../utils/alerts'

const ProfileAdm = () => {

      const [profile, setProfile] = useState({});
      const [formProfile, setFormProfile] = useState({
        profileName : '',
        profileSurname: '',
        profileDesc: '',
        profileImg: ''
      });
      const [editMode, setEditMode] = useState(false);

      const fetchProfile = async () => {
          try {
              const response = await axiosInstance.get('profile'); // Realiza una solicitud GET a /api/products
              setProfile(response.data); // Actualiza el estado con los datos obtenidos
              console.log('Profile obtenido:', response.data);
          } catch (err) {
              console.error("Error al obtener el profile", err); // Muestra el error en consola
          }
      };

      useEffect(() => {
          fetchProfile();
      }, []);

      const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormProfile({...formProfile, [name] : value})
      };

      useEffect(()=> {
        setFormProfile({
            profileName : profile.prO_NAME || '',
            profileSurname: profile.prO_SURNAME || '',
            profileDesc: profile.prO_DESC || '',
            profileImg: profile.prO_IMG || ''
        })
      }, [profile]);

      
    const handleUpdProfile = async () => {
        try {
            const formData = new FormData();
            formData.append('ProfileName', formProfile.profileName);
            formData.append('ProfileSurname', formProfile.profileSurname);
            formData.append('ProfileDesc', formProfile.profileDesc);
            
            if (formProfile.profileImg) {
                formData.append('ProfileImg', formProfile.profileImg);
            }

            const response = await axiosInstance.put('profile/updProfile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alertSuccess('¡Perfil actualizado!', 'Los cambios se guardaron correctamente');
            fetchProfile();
        } catch (err) {
            alertError('Error', 'No se pudo actualizar el perfil');
        }
    }

  return (
        <div className={`container ${styles.presentationContainer}`}>
          <div className="row h-100 align-items-center">
                <div className="col-lg-12 text-center">
                    {editMode ? 

                    <div className={styles.editModeContainer}>
                        <label className={styles.fileButton}>
                            Cambiar foto
                            <input 
                                type="file" 
                                hidden
                                accept='image/*'
                                onChange={(e) => setFormProfile({
                                    ...formProfile,
                                    profileImg: e.target.files[0]
                                })} />
                        </label>
                        <div className={styles.formGroup}>
                            <label>Nombre</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={formProfile.profileName}
                                onChange={handleChange}
                                name="profileName"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Apellido</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={formProfile.profileSurname}
                                onChange={handleChange}
                                name="profileSurname"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Descripción</label>
                            <textarea
                                className={styles.textarea}
                                rows={6}
                                value={formProfile.profileDesc}
                                onChange={handleChange}
                                name="profileDesc"
                            />
                        </div>
                        <div className={styles.buttonsContainer}>
                            <button
                                className={styles.editButton}
                                onClick={handleUpdProfile}
                            >
                                Confirmar
                            </button>

                            <button
                                className={`${styles.editButton} ${styles.cancelButton}`}
                                onClick={() => setEditMode(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                    : 
                    
                    <div className={styles.imageAndName}>
                        <div className={styles.fotoCv}>
                            <img src={`http://localhost:5231/images/${profile.prO_IMG}`} />
                        </div>
                        <h1 className="text-white">{profile.prO_NAME} {profile.prO_SURNAME}</h1>
                        <div>
                            <p className='text-white'>{profile.prO_DESC}</p>
                        </div>
                        <div>
                        <button
                              className={styles.editButton}
                              onClick={() => setEditMode(true)}
                          >
                            <FaPen />
                            Editar
                          </button>
                        </div>
                    </div>
                    }
                </div>
          </div>
        </div>
  )
}

export default ProfileAdm