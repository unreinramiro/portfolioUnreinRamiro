import React from 'react';
import Presentation from '../Presentation/Presentation';
import AboutMe from '../AboutMe/AboutMe';
import Studies from '../Studies/Studies';
import Proyects from '../Proyects/Proyects';


const Home = () => {
    return (
        <>
            <Presentation />
            <AboutMe />
            <Studies />
            <Proyects />
        </>
    );
};

export default Home;