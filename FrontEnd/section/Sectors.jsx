import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {industryData} from "../constants/index" 
// Industry data


export default function IndustrySpecializations() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [SwiperComponents, setSwiperComponents] = useState(null);
  const circleRefs = useRef([]);

  // Dynamically load Swiper only on the client
  useEffect(() => {
    const loadSwiper = async () => {
      const { Swiper, SwiperSlide } = await import('swiper/react');
      const { Navigation, Autoplay } = await import('swiper/modules');
      await import('swiper/css');
      await import('swiper/css/navigation');
      setSwiperComponents({ Swiper, SwiperSlide, Navigation, Autoplay });
    };
    loadSwiper();
  }, []);

  // Circle dash style setup - Initialize stroke animation
  useEffect(() => {
    circleRefs.current.forEach((circle, index) => {
      if (circle) {
        const r = parseFloat(circle.getAttribute('r'));
        const rlen = 2 * Math.PI * r;
        circle.style.strokeDasharray = `${rlen}px`;
        // Initially hide all strokes
        circle.style.strokeDashoffset = `${rlen}px`;
      }
    });
  }, [SwiperComponents]); // Run after Swiper is loaded

  // Animate the stroke of the active circle
  useEffect(() => {
    circleRefs.current.forEach((circle, index) => {
      if (circle) {
        const r = parseFloat(circle.getAttribute('r'));
        const rlen = 2 * Math.PI * r;
        
        if (index === activeIndex) {
          // Animate to show stroke for the active circle
          circle.style.transition = 'stroke-dashoffset 2.3s ease-out, stroke 0.3s ease-in-out';
          circle.style.strokeDashoffset = '0px';
          circle.style.stroke = '#2D6CDF'; // Active stroke color
        } else {
          // Hide stroke for inactive circles
          circle.style.transition = 'stroke-dashoffset 2.3s ease-out, stroke 0.3s ease-in-out';
          circle.style.strokeDashoffset = `${rlen}px`;
          circle.style.stroke = 'transparent'; // Inactive stroke color
        }
      }
    });
  }, [activeIndex]); // Re-run when activeIndex changes

  // Apply custom navigation styles
  useEffect(() => {
    if (!SwiperComponents) return;

    const applyNavigationStyles = () => {
      const prevButton = document.querySelector('.mySwiper .swiper-button-prev');
      const nextButton = document.querySelector('.mySwiper .swiper-button-next');
      
      const buttonStyles = {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#2D6CDF',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        border: 'none',
        cursor: 'pointer'
      };
      
      if (prevButton) {
        Object.assign(prevButton.style, { ...buttonStyles, left: '0' });
        prevButton.style.setProperty('--swiper-navigation-size', '0px');
        prevButton.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      }
      
      if (nextButton) {
        Object.assign(nextButton.style, { ...buttonStyles, right: '0' });
        nextButton.style.setProperty('--swiper-navigation-size', '0px');
        nextButton.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      }
    };

    const timer = setTimeout(applyNavigationStyles, 100);
    
    const handleResize = () => applyNavigationStyles();
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [SwiperComponents]);

  if (!SwiperComponents) return null;

  const { Swiper, SwiperSlide, Navigation, Autoplay } = SwiperComponents;

  return (
    <section className="relative sm:min-h-[800px] flex flex-col justify-center items-center z-20 text-gray-800">
      <div className="container max-w-screen-xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center sm:mb-40 mb-16 min-w-fit">
            <h2 className="text-center xl:text-7xl sm:text-5xl font-[ClashDisplay-Semibold] text-4xl sm:pb-16 pb-5">
              Industry <span className="text-blue-700">Specialisation</span>
            </h2>
            <p className="text-gray-600 font-[ClashDisplay-Regular] text-sm sm:text-2xl sm:px-24 md:px-32 xl:px-30">
              We recognize that each industry has its own nuances in terms of management style,
              hiring practices and compensation norms. To provide clients with specialized search
              solutions, Direct Hire has developed expertise in the following industries:
            </p>
          </div>
        </motion.div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides
          loop
          navigation
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="mySwiper"
        >
          {industryData.map((item, i) => (
            <SwiperSlide key={i}>
              <a href={item.link} className="group text-center block transition-transform duration-300 hover:scale-105">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  {/* Background Circle */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 150 150">
                    <circle
                      cx="75"
                      cy="75"
                      r="65"
                      stroke="transparent"
                      strokeWidth="0"
                      fill={i === activeIndex ? "rgba(45, 108, 223, 0.1)" : "#E0E0E0"}
                      style={{ transition: "fill 0.3s ease-in-out" }}
                    />
                  </svg>

                  {/* Progress Circle */}
                  <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 150 150">
                    <circle
                      ref={(el) => (circleRefs.current[i] = el)}
                      className="progress-circle"
                      cx="75"
                      cy="75"
                      r="65"
                      strokeWidth="5"
                      fill="transparent"
                    />
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src={item.icon} alt={item.label} className="w-10 h-10" />
                  </div>
                </div>
                <p className="text-sm font-medium">{item.label}</p>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}