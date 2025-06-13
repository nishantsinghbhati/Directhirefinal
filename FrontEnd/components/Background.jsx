import React from 'react';
import { motion } from 'framer-motion';

const generateCircles = (count = 15) =>
  Array.from({ length: count }).map((_, i) => ({
    id: `circle-${i}`,
    size: `${Math.random() * 80 + 20}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: Math.random() * 20 + 10,
    opacity: Math.random() * 0.4 + 0.1,
  }));

const AnimatedBackground = ({ children }) => {
  const circles = generateCircles();

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ backgroundPosition: '0% 50%' }}
        animate={{ backgroundPosition: '100% 50%' }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: 'easeInOut',
          repeatType: 'reverse',
        }}
        style={{
          background: 'linear-gradient(135deg, #0056b3, #007bff, #3498db, #00c6ff)',
          backgroundSize: '400% 400%',
        }}
      />

      {/* Animated Circles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {circles.map(circle => (
          <motion.div
            key={circle.id}
            className="absolute rounded-full bg-white"
            style={{
              width: circle.size,
              height: circle.size,
              left: circle.left,
              top: circle.top,
              opacity: circle.opacity,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
            initial={{ y: 0, scale: 0.5, opacity: 0 }}
            animate={{
              y: [0, -100, 100, 0],
              x: [0, 50, -50, 0],
              scale: [0.5, 1, 0.8, 0.5],
              opacity: [0, circle.opacity, circle.opacity, 0],
            }}
            transition={{
              duration: circle.duration,
              delay: circle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 w-full h-full">{children}</div>
    </div>
  );
};

export default AnimatedBackground;
