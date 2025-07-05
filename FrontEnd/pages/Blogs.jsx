import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet-async";
import Footer from "../section/Footer.jsx";
import parse from "html-react-parser";
gsap.registerPlugin(ScrollTrigger);

const BlogCard = ({ title, preview, content, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [revealedLines, setRevealedLines] = useState(0);
  const cardRef = React.useRef(null);

  const contentLines = content.split(". ").map((line) => line.trim()).filter(Boolean);

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
      className="bg-white border border-blue-500 text-black rounded-3xl p-8 shadow-xl w-full my-6 cursor-pointer transition-transform duration-300 hover:shadow-2xl"
    >
      <h2 className="text-3xl font-semibold text-blue-700 mb-3 tracking-tight">
        {title}
      </h2>
     <div className="text-lg leading-relaxed text-gray-700">
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
            key={idx}x
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="mb-2"
          >
           {parse(content)}
          </motion.p>
        ))}
      </motion.div>
    </AnimatePresence>
  ) : (
    <p>{preview}</p>
  )}
</div>

    </motion.div>
  );
};

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/blogs"); // Adjust if your endpoint is different
        const data = await res.json();
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <Helmet>
  <title>Blogs | DirectHire</title>
  <meta name="description" content="Explore expert hiring insights, career tips, and industry updates on the DirectHire blog. Stay informed and empowered." />

  {/* Open Graph / Facebook */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Blogs | DirectHire" />
  <meta property="og:description" content="Explore expert hiring insights, career tips, and industry updates on the DirectHire blog." />
  <meta property="og:url" content="https://yourdomain.com/blogs" />
  <meta property="og:image" content="https://yourdomain.com/og-image.jpg" /> {/* Replace with actual image URL */}

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Blogs | DirectHire" />
  <meta name="twitter:description" content="Explore expert hiring insights, career tips, and industry updates on the DirectHire blog." />
  <meta name="twitter:image" content="https://yourdomain.com/og-image.jpg" />

  {/* Canonical Link */}
  <link rel="canonical" href="https://yourdomain.com/blogs" />
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

          {loading ? (
            <p className="text-xl text-gray-500">Loading blogs...</p>
          ) : blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <BlogCard key={blog._id || index} index={index} {...blog} />
            ))
          ) : (
            <p className="text-xl text-gray-500">No blogs found.</p>
          )}
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default BlogPage;
