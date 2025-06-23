import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hiretalent from "../section/Hiretalent";
import JobSeekerSection from "../section/Jobseeker";
import StatsSection from "../section/Experience";
import GridMotion from "./Bggalary"; // Your animated background

const IMG_PADDING = 12;
const items = [
 'DIRECT HIRE',
 '/logo.webp', 
 'DIRECT HIRE',
'DIRECT HIRE',
   '/logo.webp', 
'DIRECT HIRE',
   '/logo.webp', 
'DIRECT HIRE', 
 'DIRECT HIRE',
   '/logo.webp', 
'DIRECT HIRE',
   '/logo.webp', 
'DIRECT HIRE', 
   '/logo.webp', 
'DIRECT HIRE',
 '/logo.webp', 
'DIRECT HIRE',  
   '/logo.webp', 
'DIRECT HIRE',
 '/logo.webp', 
'DIRECT HIRE','DIRECT HIRE',
 '/logo.webp', 
'DIRECT HIRE','DIRECT HIRE',
 '/logo.webp', 
'DIRECT HIRE','DIRECT HIRE',
 '/logo.webp', 
'DIRECT HIRE','DIRECT HIRE',
 '/logo.webp', 
'DIRECT HIRE',
  // Add more items as needed
];
export const TextParallaxContentExample = () => {
  return (
    <div className="bg-white pt-8">
      <TextParallaxContent heading={<><JobSeekerSection/><Hiretalent /></>} />
      
    </div>
  );
};

const TextParallaxContent = ({ heading, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[400vh]">
        <StickyBackground />
        <OverlayCopy heading={heading} />
      </div>
      {children}
    </div>
  );
};

// 👇 Renders GridMotion as background instead of image
const StickyBackground = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

  return (
    <motion.div
      style={{
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
        opacity,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <GridMotion items={items} /> {/* ⬅️ Your animated background grid */}
    </motion.div>
  );
};

const OverlayCopy = ({ heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [1, 0], [1, 0]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [1, 1, 1]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 z-40 flex min-h-screen w-full flex-col items-center justify-center text-white"
    >
      {heading}
    </motion.div>
  );
};
