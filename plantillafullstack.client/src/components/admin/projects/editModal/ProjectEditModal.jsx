import React, { useState } from 'react'
import styles from './ProjectEditModal.module.css'

const ProjectEditModal = ({ project, onClose, onSave }) => {

    const [form, setForm] = useState({
        proTitle: project.proTitle,
        proDescription: project.proDescription,
        proGithubUrl: project.proGithubUrl,
        proProductionUrl: project.proProductionUrl,
    });

    const [images, setImages] = useState({
        proImg1: project.proImg1,
        proImg2: project.proImg2,
        proImg3: project.proImg3,
        proImg4: project.proImg4,
    });

    const [technologies, setTechnologies] = useState(
        project.technologies?.map(t => t.techName).join(', ') || ''
    );

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (key, file) => {
        if (!file) return;
        setImages({ ...images, [key]: URL.createObjectURL(file) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...form,
            images,
            technologies: technologies.split(',').map(t => t.trim()).filter(Boolean),
        });
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.ProjectEditModal} onClick={e => e.stopPropagation()}>
                <h3 className='text-white text-center'>Editar Proyecto</h3>

                <form className='container d-flex flex-column gap-3' onSubmit={handleSubmit}>

                    <div className='row'>
                        {['proImg1', 'proImg2', 'proImg3', 'proImg4'].map((key, i) => (
                            <div className='col-3' key={key}>
                                <label htmlFor={key} className={styles.imageSlot}>
                                    {images[key]
                                        ? <img src={images[key]} alt={`img${i + 1}`} />
                                        : <span>+</span>}
                                </label>
                                <input
                                    id={key}
                                    type='file'
                                    accept='image/*'
                                    className='d-none'
                                    onChange={e => handleImageChange(key, e.target.files[0])}
                                />
                            </div>
                        ))}
                    </div>

                    <div className='row'>
                        <div className='col-12'>
                            <label className='text-white'>Título</label>
                            <input
                                type='text'
                                name='proTitle'
                                className={styles.input}
                                value={form.proTitle}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-12'>
                            <label className='text-white'>Descripción</label>
                            <textarea
                                name='proDescription'
                                rows={3}
                                className={styles.input}
                                value={form.proDescription}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-6'>
                            <label className='text-white'>GitHub URL</label>
                            <input
                                type='text'
                                name='proGithubUrl'
                                className={styles.input}
                                value={form.proGithubUrl}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='col-6'>
                            <label className='text-white'>Producción URL</label>
                            <input
                                type='text'
                                name='proProductionUrl'
                                className={styles.input}
                                value={form.proProductionUrl}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-12'>
                            <label className='text-white'>Tecnologías (separadas por coma)</label>
                            <input
                                type='text'
                                className={styles.input}
                                value={technologies}
                                onChange={e => setTechnologies(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='row mt-2'>
                        <div className='col-12 d-flex justify-content-end gap-2'>
                            <button type='button' className={styles.cancelBtn} onClick={onClose}>
                                Cancelar
                            </button>
                            <button type='submit' className={styles.saveBtn}>
                                Guardar
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ProjectEditModal