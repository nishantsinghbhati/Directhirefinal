import Iridescence from '../components/Button.jsx';
import instance from "../src/lib/api.js";
import { motion } from 'framer-motion';
import "../src/assets/style.css"
import useShowAnimation from '../hooks/useShowAnimation.js';
  import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const bufferToBase64 = async (buffer, contentType) => {
  const blob = new Blob([new Uint8Array(buffer)], { type: contentType });
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const Hero = () => {
  const [image, setImage] = useState(null);
  const [banner, setBanner] = useState(null);
  const navigate = useNavigate();
  const { showCard, showContent } = useShowAnimation();

  useEffect(() => {
    

    const fetchFirstBanner = async () => {
      try {
        const { data } = await instance.get('/apis/banners');
        if (data && data.length > 0) {
          const first = data[0];
          const bannerBase64 = await bufferToBase64(first.imageBuffer.data, first.contentType);
          setBanner({
            ...first,
            base64: bannerBase64,
          });
        }
      } catch (error) {
        console.error("Error fetching first banner:", error);
      }
    };

    const fetchFirstImage = async () => {
      try {
        const { data } = await instance.get('/apis/images');
        if (data && data.length > 0) {
          const first = data[0];
          const base64 = await bufferToBase64(first.imageBuffer.data, first.contentType);
          setImage({
            ...first,
            base64,
          });
        }
      } catch (error) {
        console.error("Error fetching first image:", error);
      }
    };

    fetchFirstImage();
    fetchFirstBanner();
  }, []);

  // Determine responsive image to use:
  const isMobile = window.innerWidth <= 768;
  const backgroundImage = isMobile
    ? (banner?.base64 || image?.base64 || null)
    : (image?.base64 || banner?.base64 || null);

  return (
   <section
  id="hero"
  className="relative w-screen h-screen overflow-hidden flex justify-center items-center"
>
  {backgroundImage && (
    <img
      src={backgroundImage}
      alt="Hero Background"
      className="absolute inset-0 w-full h-full object-contain"
    />
  )}
  {/* Your hero content here */}

    
 
  <div className="relative z-20 hero-layout">

          <header className="flex flex-col justify-center  md:w-screen w-screen md:px-20 px-5">
            <div className="relative w-full flex items-center justify-center lg:min-h-screen md:h-screen h-[600px]">
            {showContent && (
    <motion.button
     onClick={() => navigate("/job-seeker")}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0  }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="absolute bottom-20  left-1/6 lg:left-50 lg:bottom-25 lg:text-[30px] md:text-2xl text-[10px] px-6 py-4 z-30 rounded-[50px] cursor-pointer overflow-hidden"
      
    ><Iridescence
  color={[0, 0.3, .6]}
  mouseReact={false}
  amplitude={0.6}
  speed={2}
/><span className="relative z-20 text-white font-extrabold ">
                  Find a Job
                </span>
    </motion.button>
  )}
           {showContent && (
    <motion.button
     onClick={() => navigate("/resume-maker")}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0  }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="absolute bottom-20  right-1/6 lg:right-50 lg:bottom-25 lg:text-[30px] md:text-2xl text-[10px] px-6 py-4 z-30 rounded-[50px] cursor-pointer overflow-hidden"
      
    ><Iridescence
  color={[0, 0.3, .6]}
  mouseReact={false}
  amplitude={0.6}
  speed={2}
/><span className="relative z-20 text-white font-extrabold ">
                  Hire Talent
                </span>
    </motion.button>
  )}
                  </div>
          
 
          </header>
        </div>
      </section>
    );
  };
  
  export default Hero; 