import React, { useState, useEffect } from 'react';
import Card from '../../Components/Card/Card';
import Feauters from '../../Components/Feauters/Feauters';
import ContactUs from '../../Components/ContactUs/ContactUs';
import { useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';

const Home = () => {
  const videoId = 'QCJET0iawEs';

 
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0, 
    },
  };
 
  return (
  
    <div className="bg-[#1E293B] min-h-screen relative">

      <div className="min-h-screen  flex flex-col sm:flex-row items-center justify-center gap-10 py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 ">
  {/* Left Section */}
  <div className="flex flex-col max-w-xl text-white items-center sm:items-start">
    <h1 className="sm:text-start text-center text-5xl md:text-6xl font-extrabold text-[#8B5CF6] mb-4 font-rubik-doodle-shadow">
      CSMASTERY
    </h1>
    <p className="mb-6 text-base sm:text-lg md:text-lg text-[#E2E8F0] font-semibold sm:text-start text-center">
      Welcome to CSMASTERY, your ultimate destination for intellectual growth and fun learning! 
      Our mission is to empower minds through a fusion of enlightening blog content and captivating quizzes. 
      At CSMASTERY, we believe that knowledge is the ultimate superpower, and we're here to equip you with the tools 
      you need to unlock your full potential. Immerse yourself in our curated blog posts, crafted by AI to spark 
      curiosity and inspire discovery. Then, put your intellect to the test with our thought-provoking quizzes, 
      designed to challenge and entertain.
    </p>
    <a
      href="/about"
      className=" bg-gradient-to-r from-[#F43F5E] via-[#8B5CF6] to-[#8B5CF6] hover:bg-lime-500 text-[#E2E8F0] font-medium rounded-lg px-4 py-3 w-40 text-center"
    >
      Know More
    </a>
  </div>

  {/* Right Section (Video/Image) */}
  <div className="flex justify-center items-center">
      <img src='/images/home.png' className=' w-3/4 h-full object-cover' />
  </div>
</div>


      <div className=' h-screen w-full flex flex-col gap-14 items-center mt-4 '>
        <h1 className=' text-white md:text-6xl font-bold z-20 sm:text-5xl sm:mt-8 md:mt-0 mt-0 text-3xl'>Know About CSMASTERY</h1>

        <Card />

      </div>
      <div className=' mt-14  min-h-1/2'>
        <Feauters />
      </div>

      <div>
        <ContactUs/>
      </div>

    </div>
  );
}

export default Home;
