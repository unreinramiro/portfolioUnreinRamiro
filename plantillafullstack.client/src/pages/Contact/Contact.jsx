import React, { useState } from 'react';
import styles from './Contact.module.css'

const Contact = () => {

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

  return (
    <section 
        className={`${styles.sectionContact} d-flex flex-column`}
        id='contact'
        >
        <div className={`${styles.contentContact} container px-3 text-light text-center d-flex flex-column gap-3`}>
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
        </div>

    </section>
  )
}

export default Contact