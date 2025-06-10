import Iridescence from '../components/Button.jsx';
import Logo from '../components/Logo.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import "../src/assets/style.css"
import useShowAnimation from '../hooks/useShowAnimation.js';
  import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const { showCard, showContent } = useShowAnimation();
 const navigate = useNavigate();
    return (
      <section id="hero" className="relative w-screen overflow-hidden pt-12">
        <div className="hero-layout">
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
  
             
              <AnimatePresence>
                {showCard && (
                  <motion.div
                    initial={{ opacity: 0,  y:50  }}
                    animate={{ opacity: 1,  y:0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: .5, ease: 'easeInOut' }}
                      
  draggable="false" 
  onDragStart={(e) => e.preventDefault()}
                    className="z-20 select-none  "
                  >
                    <Logo
                      imageSrc="../src/assets/logo.png"
                      containerHeight="600px"
                      containerWidth="600px"
                      imageHeight="600px"
                      imageWidth="600px"
                      rotateAmplitude={50}
                      scaleOnHover={0.8}
                      showMobileWarning={false}
                      showTooltip={false}
                      displayOverlayContent={true}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
  
             
              {showContent && (
    <motion.button
      onClick={() => navigate("/resume-maker")}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="absolute bottom-20 right-1/6 lg:right-50  lg:bottom-25 lg:text-[30px] md:text-[10px] text-[10px] px-6 py-4 z-30 rounded-[50px] cursor-pointer overflow-hidden"
    ><Iridescence
  color={[0, 0.3, 0.6]}
  mouseReact={true}
  amplitude={0.6}
  speed={4}
/><span className="relative z-20 text-white font-extrabold ">
                  Hire talent
                </span>
    </motion.button>
  )}       </div>
          
 
          </header>
        </div>
      </section>
    );
  };
  
  export default Hero;