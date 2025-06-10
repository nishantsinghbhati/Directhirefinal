import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from 'react-router-dom';

export default function HeroCTA() {
  const arrowRef = useRef(null);
 const navigate = useNavigate();
  useEffect(() => {
    gsap.set(arrowRef.current, { x: 0 });
  }, []);

  const handleMouseEnter = () => {
    gsap.to(arrowRef.current, {
      x: 8,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(arrowRef.current, {
      x: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section className="w-full bg-blue-600 py-16 text-white flex flex-col items-center justify-center relative text-center px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl relative z-30 font-bold mb-6 max-w-4xl leading-snug">
        Connecting Companies with Skilled Professionals & Empowering Careers with Purpose
      </h2>

      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} onClick={()=> navigate("/contact")} 
        className="bg-black text-white flex items-center relative z-30 gap-2 px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-opacity-80"
      >
        Get In Touch
        <span ref={arrowRef} className="inline-block transition-transform">
          ➝
        </span>
      </button>
    </section>
  );
}
