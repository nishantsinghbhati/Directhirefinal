import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet-async";
import Footer from "../section/footer.jsx";
gsap.registerPlugin(ScrollTrigger);

const blogs = [
  {
    title: "Why Design Matters",
    preview: "Explore the impact of design on user experience and brand identity.",
    content: `Design plays a crucial role in how users perceive and interact with digital products. Good design goes beyond aesthetics — it’s about creating intuitive and enjoyable experiences that keep users engaged. A well-designed interface builds trust, guides users toward their goals, and can even drive conversions. In today’s competitive digital landscape, design is a powerful differentiator that reflects brand values, communicates professionalism, and makes lasting impressions. From typography and color to layout and micro-interactions, every detail matters in shaping a product’s identity and usability. Ultimately, design is what connects the product to the user, making it indispensable in creating meaningful digital experiences.`
  },
  {
    title: "Top 5 Animation Libraries",
    preview: "Discover powerful tools for adding life to your interfaces.",
    content: `Animation libraries help developers create smooth, interactive experiences without building everything from scratch. Here are five standout libraries: (1) Framer Motion – Great for React, offering simple APIs with powerful effects. (2) GSAP – A performance-driven library for complex animations with timeline control. (3) Anime.js – Versatile and lightweight, works with SVG, CSS, and JS. (4) Lottie – Renders After Effects animations in real-time using JSON files. (5) Three.js – Ideal for 3D graphics in the browser. Each of these libraries enables developers to enhance user engagement through motion, improving UI feedback and delighting users with visually rich experiences.`
  },
  {
    title: "Top 5 Animation Libraries",
    preview: "Discover powerful tools for adding life to your interfaces.",
    content: `Animation libraries help developers create smooth, interactive experiences without building everything from scratch. Here are five standout libraries: (1) Framer Motion – Great for React, offering simple APIs with powerful effects. (2) GSAP – A performance-driven library for complex animations with timeline control. (3) Anime.js – Versatile and lightweight, works with SVG, CSS, and JS. (4) Lottie – Renders After Effects animations in real-time using JSON files. (5) Three.js – Ideal for 3D graphics in the browser. Each of these libraries enables developers to enhance user engagement through motion, improving UI feedback and delighting users with visually rich experiences.`
  },
  {
    title: "Top 5 Animation Libraries",
    preview: "Discover powerful tools for adding life to your interfaces.",
    content: `Animation libraries help developers create smooth, interactive experiences without building everything from scratch. Here are five standout libraries: (1) Framer Motion – Great for React, offering simple APIs with powerful effects. (2) GSAP – A performance-driven library for complex animations with timeline control. (3) Anime.js – Versatile and lightweight, works with SVG, CSS, and JS. (4) Lottie – Renders After Effects animations in real-time using JSON files. (5) Three.js – Ideal for 3D graphics in the browser. Each of these libraries enables developers to enhance user engagement through motion, improving UI feedback and delighting users with visually rich experiences.`
  },
  {
    title: "Top 5 Animation Libraries",
    preview: "Discover powerful tools for adding life to your interfaces.",
    content: `Animation libraries help developers create smooth, interactive experiences without building everything from scratch. Here are five standout libraries: (1) Framer Motion – Great for React, offering simple APIs with powerful effects. (2) GSAP – A performance-driven library for complex animations with timeline control. (3) Anime.js – Versatile and lightweight, works with SVG, CSS, and JS. (4) Lottie – Renders After Effects animations in real-time using JSON files. (5) Three.js – Ideal for 3D graphics in the browser. Each of these libraries enables developers to enhance user engagement through motion, improving UI feedback and delighting users with visually rich experiences.`
  },
  {
    title: "Top 5 Animation Libraries",
    preview: "Discover powerful tools for adding life to your interfaces.",
    content: `Animation libraries help developers create smooth, interactive experiences without building everything from scratch. Here are five standout libraries: (1) Framer Motion – Great for React, offering simple APIs with powerful effects. (2) GSAP – A performance-driven library for complex animations with timeline control. (3) Anime.js – Versatile and lightweight, works with SVG, CSS, and JS. (4) Lottie – Renders After Effects animations in real-time using JSON files. (5) Three.js – Ideal for 3D graphics in the browser. Each of these libraries enables developers to enhance user engagement through motion, improving UI feedback and delighting users with visually rich experiences.`
  },
  {
    title: "Top 5 Animation Libraries",
    preview: "Discover powerful tools for adding life to your interfaces.",
    content: `Animation libraries help developers create smooth, interactive experiences without building everything from scratch. Here are five standout libraries: (1) Framer Motion – Great for React, offering simple APIs with powerful effects. (2) GSAP – A performance-driven library for complex animations with timeline control. (3) Anime.js – Versatile and lightweight, works with SVG, CSS, and JS. (4) Lottie – Renders After Effects animations in real-time using JSON files. (5) Three.js – Ideal for 3D graphics in the browser. Each of these libraries enables developers to enhance user engagement through motion, improving UI feedback and delighting users with visually rich experiences.`
  },
  {
    title: "Top 5 Animation Libraries",
    preview: "Discover powerful tools for adding life to your interfaces.",
    content: `Animation libraries help developers create smooth, interactive experiences without building everything from scratch. Here are five standout libraries: (1) Framer Motion – Great for React, offering simple APIs with powerful effects. (2) GSAP – A performance-driven library for complex animations with timeline control. (3) Anime.js – Versatile and lightweight, works with SVG, CSS, and JS. (4) Lottie – Renders After Effects animations in real-time using JSON files. (5) Three.js – Ideal for 3D graphics in the browser. Each of these libraries enables developers to enhance user engagement through motion, improving UI feedback and delighting users with visually rich experiences.`
  },
  {
    title: "Top 5 Animation Libraries",
    preview: "Discover powerful tools for adding life to your interfaces.",
    content: `Animation libraries help developers create smooth, interactive experiences without building everything from scratch. Here are five standout libraries: (1) Framer Motion – Great for React, offering simple APIs with powerful effects. (2) GSAP – A performance-driven library for complex animations with timeline control. (3) Anime.js – Versatile and lightweight, works with SVG, CSS, and JS. (4) Lottie – Renders After Effects animations in real-time using JSON files. (5) Three.js – Ideal for 3D graphics in the browser. Each of these libraries enables developers to enhance user engagement through motion, improving UI feedback and delighting users with visually rich experiences.`
  },
  {
    title: "Building with React",
    preview: "Learn best practices and advanced techniques in React development.",
    content: `React has become a cornerstone of modern web development thanks to its component-based architecture and declarative syntax. When building scalable applications, it’s important to understand key concepts like hooks, context API, and performance optimizations. Best practices include breaking down UI into reusable components, maintaining clean folder structures, and using TypeScript for type safety. Leveraging tools like React Query for data fetching, React Router for navigation, and testing libraries for ensuring code quality can take your React projects to the next level. Staying updated with ecosystem changes and consistently refactoring code keeps applications maintainable and robust over time.`
  }
];

const BlogCard = ({ title, preview, content, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [revealedLines, setRevealedLines] = useState(0);
  const cardRef = React.useRef(null);

  const contentLines = content.split('. ').map(line => line.trim()).filter(Boolean);

  useEffect(() => {
    if (expanded) {
      let currentLine = 0;
      const interval = setInterval(() => {
        currentLine++;
        setRevealedLines(currentLine);
        if (currentLine >= contentLines.length) clearInterval(interval);
      }, 300);
      return () => clearInterval(interval);
    } else {
      setRevealedLines(0);
    }
  }, [expanded]);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
        duration: 1,
        ease: "power3.out",
      }
    );
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ scale: 1.03 }}
      onClick={() => setExpanded(!expanded)}
      className="bg-white border border-blue-500 text-black rounded-3xl p-8 shadow-xl w-full md:w-full lg:w-full my-6 cursor-pointer transition-transform duration-300 hover:shadow-2xl"
    >
      <h2 className="text-3xl font-semibold text-blue-700 mb-3 tracking-tight">
        {title}
      </h2>
      <p className="text-lg leading-relaxed text-gray-700">
        {expanded ? (
          <AnimatePresence>
            <motion.div
              key="full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {contentLines.slice(0, revealedLines).map((line, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="mb-2"
                >
                  {line}.
                </motion.p>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          preview
        )}
      </p>
    </motion.div>
  );
};

const BlogPage = () => {
  return (
    <>
    
       <Helmet>
        <title>Blogs | DirectHire</title>

      </Helmet>

    <div className="relative min-h-screen bg-white text-black overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100 via-white to-blue-100 opacity-30 animate-pulse z-0" />

      <div className="relative z-10 flex flex-col items-center py-24 px-6 max-w-5xl mx-auto">
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold text-blue-700 mb-12 tracking-wide"
        >
          Our Blog
        </motion.h1>

        {blogs.map((blog, index) => (
          <BlogCard key={index} index={index} {...blog} />
        ))}
      </div>
    </div>
      <footer>
            <Footer />
          </footer></>
  );
};

export default BlogPage;
