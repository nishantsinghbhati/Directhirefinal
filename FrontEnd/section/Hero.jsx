import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Iridescence from '../components/Button.jsx';
import instance from "../src/lib/api.js";
import useShowAnimation from '../hooks/useShowAnimation.js';
import "../src/assets/style.css";

// Utility: Convert buffer to base64
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const { showContent } = useShowAnimation();

  // Handle window resize for dynamic responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch image and banner from backend
  useEffect(() => {
    const fetchFirstImage = async () => {
      try {
        const { data } = await instance.get('/apis/images');
        if (data && data.length > 0) {
          const first = data[0];
          const base64 = await bufferToBase64(first.imageBuffer.data, first.contentType);
          setImage({ ...first, base64 });
        }
      } catch (error) {
        console.error("Error fetching first image:", error);
      }
    };

    const fetchFirstBanner = async () => {
      try {
        const { data } = await instance.get('/apis/banners');
        if (data && data.length > 0) {
          const first = data[0];
          const base64 = await bufferToBase64(first.imageBuffer.data, first.contentType);
          setBanner({ ...first, base64 });
        }
      } catch (error) {
        console.error("Error fetching first banner:", error);
      }
    };

    fetchFirstImage();
    fetchFirstBanner();
  }, []);

  // Determine background based on device type
  const backgroundImage = isMobile
    ? (banner?.base64 || image?.base64 || null)
    : (image?.base64 || banner?.base64 || null);

  return (
    <section
      id="hero"
      className="relative w-screen overflow-hidden pt-22"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-20 hero-layout">
        <header className="flex flex-col justify-center w-screen md:px-20 px-5">
          <div className="relative w-full flex items-center justify-center lg:min-h-screen md:h-screen h-[600px]">

            {showContent && (
              <>
                {/* Find a Job Button */}
                <motion.button
                  onClick={() => navigate("/job-seeker")}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="absolute bottom-20 left-[16%] lg:left-[50%] lg:bottom-[10%] lg:text-[30px] md:text-2xl text-[10px] px-6 py-4 z-30 rounded-full cursor-pointer overflow-hidden"
                >
                  <Iridescence
                    color={[0, 0.3, 0.6]}
                    mouseReact={false}
                    amplitude={0.6}
                    speed={2}
                  />
                  <span className="relative z-20 text-white font-extrabold">
                    Find a Job
                  </span>
                </motion.button>

                {/* Hire Talent Button */}
                <motion.button
                  onClick={() => navigate("/resume-maker")}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="absolute bottom-20 right-[16%] lg:right-[50%] lg:bottom-[10%] lg:text-[30px] md:text-2xl text-[10px] px-6 py-4 z-30 rounded-full cursor-pointer overflow-hidden"
                >
                  <Iridescence
                    color={[0, 0.3, 0.6]}
                    mouseReact={false}
                    amplitude={0.6}
                    speed={2}
                  />
                  <span className="relative z-20 text-white font-extrabold">
                    Hire Talent
                  </span>
                </motion.button>
              </>
            )}

          </div>
        </header>
      </div>
    </section>
  );
};

export default Hero;
