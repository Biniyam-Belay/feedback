/* eslint-disable no-unused-vars */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { motion, useInView } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import reactsvg from '../assets/react.svg';
import bg from '../assets/grbg.jpg';
import Card from './Card';

const Landing = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true });

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <div 
      className="bg-black text-white font-sans relative bg-cover"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center text-center min-h-screen px-6 sm:px-4">
        <div className='w-fit px-10 py-5 h-[30px] flex justify-center mb-5 items-center bg-gray-900/30 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 cursor-pointer'>
          <div className='flex gap-2 items-center justify-between'>
            <img 
              src={reactsvg} 
              alt="react Logo" 
              className='text-gray-400 w-5 h-5'
            /> 
            Next Gen Insights
          </div>
        </div>
        
        <motion.h1
          className="text-6xl md:text-7xl font-semibold leading-tight max-w-4xl uppercase"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Reimagining <span className="text-gray-400 uppercase"><br />Customer Feedback</span>
        </motion.h1>
        <motion.p
          className="text-md text-gray-400 mt-5 leading-tight max-w-full z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Actionable insights, smarter decisions—unlock customer-driven growth.
        </motion.p>
        <motion.div
          className="mt-10"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
        </motion.div>
      </section>

      <section className='flex flex-col justify-center items-center mt-10 px-6 sm:px-4'>
        <div className='flex flex-col gap-5 items-center justify-center'>
          <h1 className='text-5xl font-medium'>Industries We Work With</h1>
          <p className='text-gray-400/70 text-md'>Here are the success stories, we helped these companies to achieve their marketing peak</p>
        </div>

        <div className='flex flex-wrap gap-10 justify-center items-center mt-10'>
          <Card img={reactsvg} name={'Biniyam'}/>
          <Card img={reactsvg} name={'Biniyam'}/>
          <Card img={reactsvg} name={'Biniyam'}/>
          <Card img={reactsvg} name={'Biniyam'}/>
        </div>
      </section>
    </div>
  );
}

export default Landing;