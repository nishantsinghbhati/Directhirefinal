import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../section/Hero';
import SplashCursor from '../components/Cursor';
import LoadingOverlay from '../components/LoadingOverlay';
import Experience from '../section/Experience';
import { motion } from "framer-motion";
import IndustrySpecializations from '../section/Sectors';
import JobSeekerSection from '../section/Jobseeker';
import Hiretalent from '../section/Hiretalent';
import TestimonialSection from '../section/Testimonials';
import HeroCTA from '../section/Callaction';
import Footer from '../section/Footer';
import { TextParallaxContentExample } from '../components/scrole';
import CompanyLogosCarousel from "../section/CompanyLogos.jsx";
import {candidatereviews} from "../constants/index.js"

const Home = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [revealComplete, setRevealComplete] = useState(false);

  return (
    <>
     <Helmet>
  <title>Home | DirectHire</title>
  <meta name="description" content="Explore DirectHire – an innovative resume builder platform that connects job seekers with employers." />
  <meta name="keywords" content="resume builder, job portal, hire talent, job seeker tools" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  {/* Open Graph Meta Tags */}
  <meta property="og:title" content="Home | DirectHire" />
  <meta property="og:description" content="Explore DirectHire – an innovative resume builder platform that connects job seekers with employers." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://yourdomain.com/" />
  <meta property="og:image" content="https://yourdomain.com/images/og-home.jpg" />

  {/* Twitter Card Meta Tags */}
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
          <header>
            <Hero />
          </header>

          <main>
            <motion.section
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0, duration: 0.6 }}
            >
              <IndustrySpecializations />
              <section>
         <CompanyLogosCarousel/>
        </section>
              <Experience />
            </motion.section>

            <section aria-label="Parallax Scroll Section">
              <div className="sm:block hidden">
                <TextParallaxContentExample />
              </div>
              <div className="sm:hidden">
                <JobSeekerSection />
                <Hiretalent />
              </div>
            </section>

            <section aria-label="Testimonials">
              <TestimonialSection testimonials={candidatereviews} />
            </section>

            <section aria-label="Call to Action">
              <HeroCTA />
            </section>
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
