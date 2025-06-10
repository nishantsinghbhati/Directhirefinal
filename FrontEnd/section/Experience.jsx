import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";
import CircularText from "../components/CirculerOverlay"; // Assuming this path is correct
import { useScrollFadeIn } from "../hooks/useScrollFadeIn"; // Assuming this path is correct

// Re-using the CountUp component as it's already good
function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "", // Ensure this is a string literal, no extra {}
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(direction === "down" ? to : from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
  });

  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = String(direction === "down" ? to : from);
    }
  }, [from, to, direction]);

  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === "function") {
        onStart();
      }

      const timeoutId = setTimeout(() => {
        motionValue.set(direction === "down" ? from : to);
      }, delay * 1000);

      const durationTimeoutId = setTimeout(
        () => {
          if (typeof onEnd === "function") {
            onEnd();
          }
        },
        delay * 1000 + duration * 1000
      );

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [
    isInView,
    startWhen,
    motionValue,
    direction,
    from,
    to,
    delay,
    onStart,
    onEnd,
    duration,
  ]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const options = {
          useGrouping: !!separator,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        };

        const formattedNumber = Intl.NumberFormat("en-US", options).format(
          latest.toFixed(0)
        );

        // Replace the default comma separator if a custom one is provided
        ref.current.textContent = separator
          ? formattedNumber.replace(/,/g, separator)
          : formattedNumber;
      }
    });

    return () => unsubscribe();
  }, [springValue, separator]);

  // Make sure className is always a string and correctly applied
  return <span className={`${className}`} ref={ref} />;
}

const stats = [
  { value: 7, suffix: "+", label: "Serving Sectors" ,icon:"/bag.png" },
  { value: 20, suffix: "+", label: "Trusted by Employers",icon: "/profile.png"},
  { value: 10, suffix: "+", label: "Recruiters Team",icon:"/check.png" },
  { value: 1500, suffix: "+", label: "Successful Placements", separator: ",",icon:"/stats.png" },
];

export default function StatsSection() {
  const sectionRef = useRef(null); // Ref for the entire section to get mouse position relative to it
  const titleRef = useRef(null);
  const subtitleRef = useRef(null); // Keeping this if you plan to add a subtitle or another animated element

  useScrollFadeIn(titleRef);
  useScrollFadeIn(subtitleRef, { duration: 1, start: "top 70%" }); // Example usage, adjust or remove if not needed

  // State for mouse position relative to the section
  const [mousePosition, ] = useState({ x: 0, y: 0 });

 

  // Framer Motion Variants for background animations
 

  // Parallax calculations for background elements based on mouse position
  const parallaxStrength = 0.05; // Adjust this value for more or less pronounced movement
  const offsetX = (mousePosition.x - (sectionRef.current?.offsetWidth || 0) / 2) * parallaxStrength;
  const offsetY = (mousePosition.y - (sectionRef.current?.offsetHeight || 0) / 2) * parallaxStrength;


  return (
    <motion.div
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
       
      >
  
      
    <div className="min-h-[800px] items-center flex flex-col justify-center ">  
     <h1 ref={titleRef} className="text-center xl:text-8xl sm:text-5xl z-20 lg:text-8xl md:text-5xl text-4xl font-[ClashDisplay-Semibold] sm:pb-8 pb-5">
          Exper<span className="text-blue-700">ience</span> 
        </h1>
        <p className="pb-8 text-center font-[ClashDisplay-Regular]  z-20 text-black">With a proven track record and industry-wide recognition
</p>
    <div className="relative min-w-fit  min-h-fit">
  {/* Aurora background */}  
  

  {/* Foreground content */}
  <div className="relative z-10 flex items-center justify-center h-fit">
     <section
      ref={sectionRef} // Attach ref to the section to get its dimensions
      className=" relative overflow-hidden py-16 sm:py-2 max-h-fit flex items-center justify-center"
    >
 
   
      {/* Content Layer (positioned above background animations with z-index) */}
      <div className="z-40 relative sm:min-h-[300px] overflow-hidden px-4  flex flex-col items-center justify-center">
   

        <div className="max-w-7xl w-full flex flex-wrap justify-center items-center gap-2 xl:gap-30 sm:gap-5">
         {stats.map((stat, index) => (
  <div key={index} className="flex flex-col items-center gap-2">
    <motion.div
      initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
       
      whileHover={{
        scale: 1.08,
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 10 ,duration: 0.9 }}
      className="relative rounded-full"
    >
      <CircularText
        text="DIRECT::::::::HIRE::::::::"
        onHover="speedUp"
        spinDuration={20}
        className="w-40 h-40 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-50 z-20 lg:h-50 relative"
      >
        <div
          className="flex flex-col items-center justify-center rounded-full
                     w-50 h-50 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-50 lg:h-50
                     text-center p-2"
        >
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-black">
           <img  src={stat.icon} alt="" /> <CountUp
              to={stat.value}
              duration={2}
              className="inline"
              separator={stat.separator}
            />
            {stat.suffix}
            
          </div>
        </div>
      </CircularText>
    </motion.div>

    {/* ✅ Label now separated under the circle */}
    <p className="text-center  mt-1 text-[20px] sm:text-xs md:text-[20px] lg:text-2xl font-bold tracking-tighter text-black">
      {stat.label}
    </p>
  </div>
))}
        </div>
      </div>
    </section> {/* This could be JobSeekerSection, HeroSection, etc. */}
  </div>
</div>
</div></motion.div>
   
  );
}