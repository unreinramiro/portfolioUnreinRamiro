import React, {useState, useEffect, use} from 'react'
import styles from './AssignaturesModal.module.css'
import SearchBar from '../../../components/SearchBar/SearchBar'
import AssignatureCard from './AssignatureCard'
import assignature from '../../../assignatures.json'

const AssignaturesModal = ({ onClose }) => {

    const [assignatures, setAssignatures] = useState([]);
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        setAssignatures(assignature);
        setFiltered(assignature);
    }, []);

    const handleSearch = (query) => {
        setFiltered(
            assignatures.filter(as => 
                as.title.toLowerCase().includes(query.toLowerCase())
            )
        );
    };

  return (
    <div className={styles.overlay} onClick={onClose}>
        <div 
            className={styles.AssignaturesModal} 
            onClick={e => e.stopPropagation()}  // evita cerrar al clickear dentro
        >
            <h3 className='text-white text-center'>Materias</h3>
            <div className='container d-flex flex-column gap-3'>
                <div className='row'>
                    <div className='col-12'>
                        <SearchBar onSearch={handleSearch}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <h4>Primer Año</h4>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 d-flex flex-column gap-3'>
                        {filtered.map(as => (<AssignatureCard title={as.title} status={as.status} firstNote={as.firstNote} secondNote={as.secondNote} avg={as.avg} />))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AssignaturesModal