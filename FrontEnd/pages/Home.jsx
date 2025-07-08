// Improved Home.jsx with lag reduction, staggered Framer Motion, and lazy loading of heavy sections

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../section/Hero';
import SplashCursor from '../components/Cursor';
import LoadingOverlay from '../components/LoadingOverlay';
import Experience from '../section/Experience';
import { motion, LazyMotion, domAnimation } from "framer-motion";
import IndustrySpecializations from '../section/Sectors';
import JobSeekerSection from '../section/Jobseeker';
import Hiretalent from '../section/Hiretalent';
import TestimonialSection from '../section/Testimonials';
import HeroCTA from '../section/Callaction';
import Footer from '../section/Footer';
import { TextParallaxContentExample } from '../components/scrole';
import CompanyLogosCarousel from "../section/CompanyLogos.jsx";
import { candidatereviews } from "../constants/index.js";
import Navbar from "../section/NavBar.jsx";
import { useInView } from 'react-intersection-observer';

const LazySection = ({ children, threshold = 0.2 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
  });
  return <section ref={ref}>{inView && children}</section>;
};

const Home = () => {
  const [revealComplete, setRevealComplete] = useState(false);

  return (
    <>
      <Helmet>
        <title>Home | DirectHire</title>
        <meta name="description" content="Explore DirectHire – an innovative resume builder platform that connects job seekers with employers." />
        <meta name="keywords" content="resume builder, job portal, hire talent, job seeker tools" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Home | DirectHire" />
        <meta property="og:description" content="Explore DirectHire – an innovative resume builder platform that connects job seekers with employers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta property="og:image" content="https://yourdomain.com/images/og-home.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home | DirectHire" />
        <meta name="twitter:description" content="Explore DirectHire – an innovative resume builder platform that connects job seekers with employers." />
        <meta name="twitter:image" content="https://yourdomain.com/images/og-home.jpg" />
      </Helmet>

      {!revealComplete && (
        <LoadingOverlay onComplete={() => setRevealComplete(true)} />
      )}

      {revealComplete && (
        <>
          <Navbar />

          <header>
            <Hero />
          </header>

          <main>
            <LazyMotion features={domAnimation}>
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.2 } },
                }}
              >
                <motion.div variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } }}>
                  <LazySection>
                    <IndustrySpecializations />
                  </LazySection>
                </motion.div>

                <motion.div variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } }}>
                  <LazySection>
                    <CompanyLogosCarousel />
                  </LazySection>
                </motion.div>

                <motion.div variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } }}>
                  <LazySection>
                    <Experience />
                  </LazySection>
                </motion.div>
              </motion.section>
            </LazyMotion>

            <LazySection>
              <section aria-label="Parallax Scroll Section">
                <div className="sm:block hidden">
                  <TextParallaxContentExample />
                </div>
                <div className="sm:hidden">
                  <JobSeekerSection />
                  <Hiretalent />
                </div>
              </section>
            </LazySection>

            <LazySection>
              <section aria-label="Testimonials">
                <TestimonialSection testimonials={candidatereviews} />
              </section>
            </LazySection>

            <LazySection>
              <section aria-label="Call to Action">
                <HeroCTA />
              </section>
            </LazySection>
          </main>

          <SplashCursor />

          <footer>
            <Footer />
          </footer>
        </>
      )}
    </>
  );
};

export default Home;
