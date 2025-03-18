import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Events from '../../components/Events/Events';

const Home = () => {

  return (
    <>
      <div className="home-container">
        <Navbar />
        <Hero />
        <Events />
      </div>
    </>
  );
}

export default Home;