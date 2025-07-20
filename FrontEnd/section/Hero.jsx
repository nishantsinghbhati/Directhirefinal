import Iridescence from '../components/Button.jsx';
import instance from "../src/lib/api.js";
import { motion } from 'framer-motion';
import "../src/assets/style.css";
import useShowAnimation from '../hooks/useShowAnimation.js';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoadingSpinner from "../components/LoadingAnimation.jsx";
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
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const { showContent } = useShowAnimation();

  // Determine device type once
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
   const fetchAndSetImage = async () => {
  try {
    const endpoint = isMobile
      ? "https://api.directhire.in/static/banners/mobile/banner.png"
      : "https://api.directhire.in/static/banners/desktop/banner.png";

    // Preload the image
    const img = new Image();
    img.src = endpoint;

    img.onload = () => {
      setBackgroundImage(endpoint);
      setIsLoading(false);
    };

    img.onerror = () => {
      console.error("Failed to load hero image.");
      setIsLoading(false);
    };
  } catch (error) {
    console.error("Error fetching hero image:", error);
    setIsLoading(false);
  }
};

    fetchAndSetImage();
  }, [isMobile]);

  return (
    <section
      id="hero"
      className="relative w-screen h-screen overflow-hidden flex justify-center items-center"
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-full w-full bg-gray-100">
          <div className="loader"><LoadingSpinner /></div> {/* Replace with your custom spinner if needed */}
        </div>
      ) : (
        <>
          {backgroundImage && (
            <img
              src={backgroundImage}
              alt="Hero Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          <div className="relative z-20 hero-layout">
            <header className="flex flex-col justify-center md:w-screen w-screen md:px-20 px-5">
              <div className="relative w-full flex items-center justify-center lg:min-h-screen md:h-screen h-[600px]">
                {showContent && (
                  <motion.button
                    onClick={() => navigate("/job-seeker")}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="absolute bottom-20 left-1/6 lg:left-50 lg:bottom-25 lg:text-[30px] md:text-2xl text-[10px] px-6 py-4 z-30 rounded-[50px] cursor-pointer overflow-hidden"
                  >
                    <Iridescence
                      color={[0, 0.3, .6]}
                      mouseReact={false}
                      amplitude={0.6}
                      speed={2}
                    />
                    <span className="relative z-20 text-white font-extrabold">
                      Find a Job
                    </span>
                  </motion.button>
                )}
                {showContent && (
                  <motion.button
                    onClick={() => navigate("/resume-maker")}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="absolute bottom-20 right-1/6 lg:right-50 lg:bottom-25 lg:text-[30px] md:text-2xl text-[10px] px-6 py-4 z-30 rounded-[50px] cursor-pointer overflow-hidden"
                  >
                    <Iridescence
                      color={[0, 0.3, .6]}
                      mouseReact={false}
                      amplitude={0.6}
                      speed={2}
                    />
                    <span className="relative z-20 text-white font-extrabold">
                      Hire Talent
                    </span>
                  </motion.button>
                )}
              </div>
            </header>
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;
