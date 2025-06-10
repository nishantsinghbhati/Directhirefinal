import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger for advanced scroll animations
import { useNavigate } from 'react-router-dom';
import { useScrollFadeIn } from '../hooks/useScrollFadeIn';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hiretalent = () => {
    // Refs for GSAP animations and scroll fade-in
    const buttonPrimaryRef = useRef(null);
    const buttonSecondaryRef = useRef(null);
    const imageBoxRef = useRef(null);
    const navigate = useNavigate();

    // Refs for scroll fade-in (applied to the main container and title)
    const sectionRef = useRef(null); // Ref for the entire section for overall scroll animation
    const titleRef = useRef(null); // Ref for the main title
    const sectionsRefs = useRef([]); // Array to hold refs for each content section

    // Use the custom scroll fade-in hook for the main section and title
    useScrollFadeIn(sectionRef, { threshold: 0.1 }); // Apply to the whole section
    useScrollFadeIn(titleRef, { duration: 1, delay: 0.2, start: "top 70%" }); // Apply to the main title

    const content = {
        title: "Hire Talent",
        sections: [
            {
                subheading: "Pre-Screened Candidates",
                body: "Access a curated pool of job-ready professionals with polished, consultancy-reviewed resumes. Save time on sourcing — we handle the groundwork.",
            },
            {
                subheading: "Targeted Role Matching",
                body: "Share your hiring needs, and we’ll connect you with candidates whose skills align perfectly. From entry-level to experienced professionals, we’ve got your back.",
            },
            {
                subheading: "Fast & Direct Hiring",
                body: "Skip the delays. Reach qualified candidates directly and fill your open roles faster — no middle layers, just transparent and efficient hiring.",
            },
        ],
        buttonPrimary: "Hire Now",
        buttonSecondary: "Talk to Consultant",
    };

    // Framer Motion variants for staggered text animation (used on the text content wrapper)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    // Framer Motion variants for individual text items (subheading and body)
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    // Framer Motion variants for individual words in subheadings (on hover)
    const wordHoverVariants = {
        hover: {
            scale: 1.05,
            color: "#007bff", // Example hover color
            transition: { duration: 0.2, ease: "easeOut" }
        },
    };

    useEffect(() => {
        // GSAP animation for the image box
        // Fades in and slightly scales up when it enters the viewport
        gsap.fromTo(
            imageBoxRef.current,
            { opacity: 0, scale: 0.95, y: 50 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: imageBoxRef.current,
                    start: "top 80%", // Animation starts when the top of the image box is 80% from the top of the viewport
                    toggleActions: "play none none none", // Play animation once
                }
            }
        );

        // GSAP animation for the buttons
        // Fades in and moves up slightly, with a stagger between buttons
        gsap.fromTo(
            [buttonPrimaryRef.current, buttonSecondaryRef.current],
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: buttonPrimaryRef.current, // Use one of the buttons as a trigger
                    start: "top 90%",
                    toggleActions: "play none none none",
                }
            }
        );

        // GSAP ScrollTrigger for each content section (subheading and body)
        sectionsRefs.current.forEach((el, index) => {
            if (el) {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 100%", // Adjust as needed
                            toggleActions: "play none none none",
                        }
                    }
                );
            }
        });

    }, []); // Empty dependency array means this effect runs once on mount


    return (
        <section ref={sectionRef} className="sm:min-h-[150vh] min-h-screen sm:mt-0 mt-4 flex relative z-20 items-center justify-center  sm:p-8 overflow-hidden">
          
            <div ref={imageBoxRef} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2  bg-blue-700  hover:bg-gradient-to-br from-blue-700 to-blue-900 sm:rounded-2xl gap-8 lg:gap-16 items-center p-9 w-full">
               <motion.div
      initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6 }}>    {/* Left Section: Image/Illustration Placeholder */}
                <div ref={imageBoxRef} className="w-full h-80 sm:h-96 rounded-lg shadow-lg flex re items-center justify-center overflow-hidden">
                    <img src='../src/assets/recruiting-skills-cover.png' alt="Recruiting skills illustration" className="object-cover  w-full h-full" />
                </div>
</motion.div>
                {/* Right Section: Text Content and Buttons */}
                <motion.div
                    className="flex flex-col space-y-6"
                    variants={containerVariants}
                    
                    animate="visible"
                         
      initial={{  opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.9 }}>
              
                    <h1 ref={titleRef} className="text-4xl sm:text-5xl sm:text-start text-center font-extrabold text-gray-100 mb-4">
                        {content.title}
                    </h1>

                    {content.sections.map((section, index) => (
                        <div key={index} ref={el => sectionsRefs.current[index] = el}>
                            <motion.h3
                                className="text-xl font-semibold text-gray-100 mb-1 inline-block" // inline-block to allow individual word hover
                                variants={itemVariants} // For initial fade-in
                            >
                                {section.subheading.split(' ').map((word, wordIndex) => (
                                    <motion.span
                                        key={wordIndex}
                                        variants={wordHoverVariants}
                                        whileHover="hover"
                                        className="inline-block cursor-pointer" // Make each word clickable/hoverable
                                    >
                                        {`${word }   `} 
                                    </motion.span>
                                ))}
                            </motion.h3>
                            <motion.p
                                className="text-gray-100 leading-relaxed"
                                variants={itemVariants}
                            >
                                {section.body}
                            </motion.p>
                        </div>
                    ))}

                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <motion.button
                            ref={buttonPrimaryRef}
                            className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow-md
                                       focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            whileHover={{ scale: 1.05, backgroundColor: "#333", boxShadow: "0 8px 15px rgba(0,0,0,0.2)" }} // Framer Motion hover
                            whileTap={{ scale: 0.95 }} // Framer Motion tap
                            onClick={() => navigate("/hire-talent")}
                        >
                            {content.buttonPrimary}
                        </motion.button>
                        <motion.button
                            ref={buttonSecondaryRef}
                            className="px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg shadow-md
                                       focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                            whileHover={{ scale: 1.05, backgroundColor: "#e0e0e0", boxShadow: "0 8px 15px rgba(0,0,0,0.1)" }} // Framer Motion hover
                            whileTap={{ scale: 0.95 }} // Framer Motion tap
                            onClick={() => navigate("/contact")}
                        >
                            {content.buttonSecondary}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hiretalent;