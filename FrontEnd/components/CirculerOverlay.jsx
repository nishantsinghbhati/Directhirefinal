import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const getRotationTransition = (duration, from, loop = true) => ({
  from: from,
  to: from + 360,
  ease: "linear",
  duration: duration,
  type: "tween",
  repeat: loop ? Infinity : 0,
});

const getTransition = (duration, from) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: "spring",
    damping: 20,
    stiffness: 300,
  },
});

const CircularText = ({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  className = "",
  children,
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const [currentRotation, setCurrentRotation] = useState(0);
  const containerRef = useRef(null);
  const [radius, setRadius] = useState(40); // default fallback radius

  // Resize observer to dynamically update radius
  useEffect(() => {
    const updateRadius = () => {
      if (containerRef.current) {
        const size = containerRef.current.offsetWidth;
        setRadius(size / 2.5); // adjust divisor to tune spacing
      }
    };

    updateRadius(); // initial
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  useEffect(() => {
    controls.start({
      rotate: currentRotation + 360,
      scale: 1,
      transition: getTransition(spinDuration, currentRotation),
    });
  }, [spinDuration, controls, onHover, text]);

  const handleHoverStart = () => {
    if (!onHover) return;
    let duration = spinDuration;

    switch (onHover) {
      case "slowDown":
        duration *= 2;
        break;
      case "speedUp":
        duration /= 4;
        break;
      case "goBonkers":
        duration /= 20;
        break;
      case "pause":
        controls.stop();
        return;
    }

    controls.start({
      rotate: currentRotation + 360,
      scale: 1,
      transition: getTransition(duration, currentRotation),
    });
  };

  const handleHoverEnd = () => {
    controls.start({
      rotate: currentRotation + 360,
      scale: 1,
      transition: getTransition(spinDuration, currentRotation),
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto z-20 rounded-full ${className}`}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {/* Static center content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {children}
      </div>

      {/* Rotating text ring */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={controls}
        onUpdate={(latest) => setCurrentRotation(Number(latest.rotate))}
        className="absolute inset-0"
      >
        {letters.map((letter, i) => {
          const rotation = (360 / letters.length) * i;
          const angleInRad = (rotation * Math.PI) / 180;
          const x = Math.cos(angleInRad) * radius;
          const y = Math.sin(angleInRad) * radius;

          return (
            <span
              key={i}
              className="absolute text-[20px] sm:text-sm md:text-base lg:text-lg font-bold text-blue-700"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotation}deg)`,
                transformOrigin: "center",
              }}
            >
              {letter}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
};

export default CircularText;
