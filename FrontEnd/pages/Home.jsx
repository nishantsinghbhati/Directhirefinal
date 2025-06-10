import  { useState } from 'react';
import Hero from '../section/Hero';
import SplashCursor from '../components/Cursor';
import LoadingOverlay from '../components/LoadingOverlay';
import Experience from '../section/Experience';
import { motion } from "framer-motion";
import IndustrySpecializations from '../section/Sectors';
import JobSeekerSection from '../section/Jobseeker';
import Hiretalent from '../section/Hiretalent';
import TestimonialSection from '../section/Testimonials';
import HeroCTA from '../section/Callaction';
import Footer from '../section/footer';
import { TextParallaxContentExample } from '../components/scrole';
const Home = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [revealComplete, setRevealComplete] = useState(false);

  return (
    <>
      {!revealComplete && (
        <LoadingOverlay
          onComplete={() => setRevealComplete(true)}
        />
      )}

      {revealComplete && (
        <div>
          <Hero />
          <motion.div
        initial={{ opacity: 0 , x:50 }}
        whileInView={{ opacity: 1,  x:0}}
        viewport={{ once: true }}
        transition={{ delay: 0, duration: 0.6 }}
        className=""
      ><IndustrySpecializations/><Experience /> </motion.div>
    <div className='sm:block hidden'  > <TextParallaxContentExample/></div>
    <div className='sm:hidden '><JobSeekerSection/><Hiretalent/></div>
     <TestimonialSection/>
          <SplashCursor />
          <HeroCTA/>
          <Footer/>
        </div>
      )}
      
    </>
  );
};

export default Home;
