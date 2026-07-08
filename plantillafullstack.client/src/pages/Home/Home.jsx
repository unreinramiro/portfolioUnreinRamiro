import React from 'react';
import Presentation from '../Presentation/Presentation';
import AboutMe from '../AboutMe/AboutMe';
import Studies from '../Studies/Studies';
import Proyects from '../Proyects/Proyects';
import Tecnologies from '../Tecnologies/Tecnologies';


const Home = () => {
    return (
        <>
            <Presentation />
            <AboutMe />
            <Studies />
            <Proyects />
            <Tecnologies />
        </>
    );
};

export default Home;