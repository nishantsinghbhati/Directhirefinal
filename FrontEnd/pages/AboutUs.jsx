import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import DotGrid from "../components/Dotgrid.jsx";
import Experience from "../section/Experience.jsx";
import TextPressure from "../components/AboutusText.jsx";
import ProfileCard from "../section/Founder.jsx";
import Footer from "../section/Footer.jsx";
import IndustrySpecializations from "../section/Sectors.jsx";
import TestimonialSection from "../section/Testimonials.jsx";
import CompanyLogosCarousel from "../section/CompanyLogos.jsx";
import { candidatereviews } from "../constants/index.js";
import { sections } from "../constants/index.js";

const StorySection = ({ title, text, image, reverse, style }) => (
  <section className={`py-16 px-6 md:flex ${reverse ? "flex-row-reverse" : ""} items-center max-w-7xl mx-auto`}>
    <article className="md:w-1/2 p-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-4"
      >
        {title}
      </motion.h2>
      <p className="text-gray-700 leading-relaxed">{text}</p>
    </article>
    <div className="md:w-[500px] p-4">
      <motion.img
        src={image}
        alt={`Illustration showing ${title}`}
        className={` ${style} w-full shadow-lg`}
        loading="lazy"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />
    </div>
  </section>
);

const HeroSection = () => (
  <header className="relative mt-20 sm:min-h-screen sm:mt-0 min-h-screen flex items-center justify-center">
    <div className="text-black text-center px-4">
      <div className="max-w-5xl mx-auto sm:mb-20 mb-9" style={{ position: 'relative' }}>
        <h1>
          <TextPressure
            text="About us"
            flex={true}
            alpha={false}
            stroke={true}
            width={true}
            weight={true}
            italic={true}
            textColor="#1447e6"
            minFontSize={36}
          />
        </h1>
      </div>
      <p className="text-xl max-w-6xl mx-auto font-[ClashDisplay-Medium]">
 At Direct Hire, everything began with a simple yet powerful observation. Ayushi, the founder, started her career in recruitment and quickly noticed a gap in the market — one that affected both sides of the hiring equation. On the client side, companies struggled to find candidates who truly matched their needs. On the candidate side, talented individuals were missing out on the right opportunities, not due to lack of skill, but due to lack of access. Ayushi realized that the system needed a bridge — something that genuinely connected the right talent to the right opportunity. That’s when Direct Hire was born.      </p>
    </div>
  </header>
);

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Direct Hire</title>
        <meta name="description" content="Learn about Direct Hire’s journey, values, and the visionary founder connecting the right talent with the right opportunity." />
        <meta name="keywords" content="About Direct Hire, recruitment agency, hiring services, founder story, Ayushi Agarwal, HR solutions, job matching, candidate placement" />
        <meta name="author" content="Direct Hire" />
        <meta property="og:title" content="About Us | Direct Hire" />
        <meta property="og:description" content="Discover Direct Hire's mission, story, and how we're revolutionizing the recruitment industry." />
        <meta property="og:url" content="https://yourdomain.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | Direct Hire" />
        <meta name="twitter:description" content="Discover Direct Hire's story, mission, and the visionary team behind it." />
        <meta name="twitter:image" content="https://yourdomain.com/twitter-image.jpg" />
        <link rel="canonical" href="https://yourdomain.com/about" />
      </Helmet>

      <div className="absolute w-full h-full object-cover bg-blue-200 -z-10">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <DotGrid
            dotSize={60}
            gap={30}
            baseColor="#BEDBFF"
            activeColor="#0000ff"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>
      </div>

      <HeroSection />

      <main>
        {sections.map((section, index) => (
          <StorySection key={index} {...section} />
        ))}

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 text-center"
        >
         
          <IndustrySpecializations />
          <Experience />
        </motion.section>

        <section className="relative sm:min-h-[700px] min-h-screen overflow-hidden flex flex-col items-center px-4 py-10">
          <h2 className="sm:text-8xl text-6xl font-[ClashDisplay-Semibold] text-center mb-12">
            Fou <span className="text-blue-700">nder</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-10 w-full max-w-7xl">
            <div className="flex-1 flex justify-center sm:justify-end">
              <ProfileCard
                name="Ayushi Agarwal"
                title="Founder"
                handle="AyushiAgarwal"
                status="Online"
                contactText="Contact Me"
                avatarUrl="./Untitled design.webp"
                showUserInfo={true}
                enableTilt={true}
               
                grainUrl="/grain.webp"
                iconUrl="/logo.webp"
              />
            </div>

            <div className="flex-1 text-left sm:pl-6">
              <p className="text-center sm:text-lg leading-7 sm:leading-8 font-[ClashDisplay-Reguler] text-gray-700">
                Hi, my name is <span className="text-blue-700 font-[ClashDisplay-Medium] ">Ayushi</span>, and I started my career as a customer support executive, then 
        switched to the operations domain and found it wasn't for me, then switched to SEO but 
        didn't find it exciting either, and finally, I started in the HR domain and liked it so much 
        that a job change that started as a curiosity turned into passion, and that passion led to 
        the creation of Direct Hire.
        <br /><br />
        I founded this recruitment consultancy with a clear vision: to connect the right talent with 
        the right opportunity.
        <br /><br />
        I understood the problems of both companies and candidates, whether it was 
        candidates not finding the right jobs or companies not being able to find the right talent 
        with the skills required for the jobs. In both scenarios, it would often lead to either the 
        candidate leaving the job or vice versa.
              </p>
            </div>
          </div>
        </section>

        <section>
          <CompanyLogosCarousel />
        </section>

        <section>
          <TestimonialSection testimonials={candidatereviews} />
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default AboutUs;
