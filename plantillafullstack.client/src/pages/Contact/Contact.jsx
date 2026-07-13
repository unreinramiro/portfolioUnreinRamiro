import React, { useState, useEffect, useRef } from 'react';
import styles from './Contact.module.css';
import linkedInIcon from '../../assets/linkedin.png';
import gitIcon from '../../assets/github.png';

const Contact = () => {

    const [isVisibleContact, setIsVisibleContact] = useState(false);
    const sectionContactRef = useRef(null);

    const [form, setForm] = useState({
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Acá luego irá la llamada a la API
        console.log(form);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisibleContact(true);
                    observer.disconnect(); // Solo anima una vez
                }
            },
            { threshold: 0.2 }
        );

        if (sectionContactRef.current) observer.observe(sectionContactRef.current);
        return () => observer.disconnect();
    }, [])
    

  return (
    <section 
        className={`${styles.sectionContact} d-flex flex-column`}
        id='contact'
        >
        <div 
            className={`${styles.contentContact} ${isVisibleContact ? styles.visible : ''} container px-3 text-light text-center d-flex flex-column gap-5`}
            ref={sectionContactRef}
            >
            <div className='row justify-content-center gap-4'>
                <div className='col-12 d-flex flex-column gap-3'>
                    <h2>CONTACTO</h2>
                </div>
                <div className='row'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="ejemplo@gmail.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="subject"
                                placeholder="Asunto del mensaje"
                                value={form.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <textarea
                                className="form-control"
                                name="message"
                                rows="6"
                                placeholder="Escribí tu mensaje..."
                                value={form.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="d-grid">
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Enviar mensaje
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <ul className='d-flex justify-content-evenly'>
                    <li>
                        <a 
                            href='https://www.linkedin.com/in/ramirounrein/'
                            target="_blank"
                            className={styles.contactIcon}
                            >
                            <img 
                                src={linkedInIcon}
                                className='img-fluid bg-white p-1 rounded'
                                style={{ width: '40px', height: '40px' }}
                                />
                        </a>
                    </li>
                    <li>
                        <a 
                            href='https://github.com/unreinramiro'
                            target="_blank"
                            className={styles.contactIcon}
                            >
                            <img 
                                src={gitIcon}
                                className='img-fluid bg-white p-1 rounded'
                                style={{ width: '40px', height: '40px' }}
                                />
                        </a>
                    </li>
                </ul>
            </div>
        </div>

    </section>
  )
}

export default Contact