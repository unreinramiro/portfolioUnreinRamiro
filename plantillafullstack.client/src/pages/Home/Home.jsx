import React, { useState, useEffect } from 'react'
import Presentation from '../Presentation/Presentation';
import AboutMe from '../AboutMe/AboutMe';
import Studies from '../Studies/Studies';
import Proyects from '../Proyects/Proyects';
import Tecnologies from '../Tecnologies/Tecnologies';
import Contact from '../Contact/Contact';
import axiosInstance from '../../services/api'
import Certifications from '../Studies/Certifications/Certifications';


const Home = () => {

    const [profile, setProfile] = useState({});

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

    return (
        <>
            <Presentation profile={profile}/>
            <AboutMe profile={profile} />
            <Studies />
            {/* <Certifications /> */}
            <Proyects />
            <Tecnologies />
            <Contact />
        </>
    );
};

export default Home;