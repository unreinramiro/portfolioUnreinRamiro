import React, {useState, useEffect, use} from 'react'
import styles from './AssignaturesModal.module.css'
import SearchBar from '../../../components/SearchBar/SearchBar'
import AssignatureCard from './AssignatureCard'
import axiosInstance from '../../../services/api'

const AssignaturesModal = ({ onClose }) => {

    const [assignatures, setAssignatures] = useState([]);
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        
        const fetchAssignatures = async () => {
            try {
                const response = await axiosInstance.get('assignatures'); // Realiza una solicitud GET a /api/products
                setAssignatures(response.data); // Actualiza el estado con los datos obtenidos
                setFiltered(response.data);
                console.log('Asignaturas obtenidas:', response.data);
            } catch (err) {
                console.error("Error al obtener las asignaturas", err); // Muestra el error en consola
            }
        };

        fetchAssignatures();

        
    }, []);

    const handleSearch = (query) => {
        setFiltered(
            assignatures.filter(as => 
                as.asG_TITLE.toLowerCase().includes(query.toLowerCase())
            )
        );
    };

    const grouped = filtered.reduce((acc, item) => { 
        
        if (!acc[item.asG_YEAR]) { 
            acc[item.asG_YEAR] = []; 
        }

        if (!acc[item.asG_YEAR][item.asG_SEMESTER]) {
            acc[item.asG_YEAR][item.asG_SEMESTER] = [];
        }

        acc[item.asG_YEAR][item.asG_SEMESTER].push(item);

        return acc; 
    }, {});

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
                    {Object.entries(grouped).map(([year, semesters]) => ( // Recorre el grupo anio
                    <div>

                        <div className='col-12 mt-4'>
                            <h4 className='text-white'>Año {year}</h4>
                        </div>

                    {Object.entries(semesters).map(([semester, assignatures]) => (   //Recorre el grupo semestre 
                        <div 
                            className='row mt-4'
                            key={semester}
                        >
                            <h6 className='text-end'>Semestre {semester}</h6>
                            <div className='col-12 d-flex flex-column gap-3'>
                                {assignatures.map(as => (
                                    <AssignatureCard 
                                        key={as.asG_ID}
                                        title={as.asG_TITLE} 
                                        status={as.asG_STATUS} 
                                        firstNote={as.asG_FIRST_NOTE} 
                                        secondNote={as.asG_SECOND_NOTE} 
                                        promotion={as.asG_PROMOTION}
                                        />
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
                    ))}
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default AssignaturesModal