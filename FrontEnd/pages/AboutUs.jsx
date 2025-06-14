import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import DotGrid from "../components/Dotgrid.jsx";
import Experience from "../section/Experience.jsx";
import TextPressure from "../components/AboutusText.jsx";
import ProfileCard from "../section/OurTeam.jsx";
import Footer from "../section/footer.jsx";
import IndustrySpecializations from "../section/Sectors.jsx";
import TestimonialSection from "../section/Testimonials.jsx";

const sections = [
  {
    title: "More Than Recruitment — A Mission-Driven Talent Platform",
    text: "Direct Hire is more than just a recruitment agency. It’s a platform built on the belief that quality hiring shouldn't be slow, impersonal, or based on outdated methods. Today, we work with a wide range of clients across IT and Non-IT sectors — from agile startups to growing corporates — helping them close positions quickly without compromising on quality. Behind every successful placement is our ever-evolving talent community: skilled professionals from diverse backgrounds who we actively support, nurture, and help grow through upskilling and career development initiatives.",
    image: "/Gemini_Generated_Image_2wyum52wyum52wyu.png",
    style: "rounded-r-full"
  },
  {
    title: "Precision Over Volume — Our Unique Hiring Philosophy",
    text: "What truly sets us apart is our approach. Where most agencies focus on volume, we’re obsessed with fit. We take the time to understand the needs behind every role and go beyond resumes to find candidates who align in skills, mindset, and potential. Our turnaround times are fast, but never rushed — because we believe quality hiring is about precision, not pressure.",
    image: "/Gemini_Generated_Image_cm9dwicm9dwicm9d.png",
    reverse: true,
    style: "rounded-l-full"
  },
  {
    title: "From One to Many — The Team Powering the Vision",
    text: "What started as a solo mission has now grown into a team of 15+ passionate individuals, all driven by the same mission: to close the hiring gap with speed, care, and clarity. We’re building a future where hiring isn’t just a transaction — it’s a meaningful match between talent and opportunity. And we're just getting started.",
    image: "/team.png",
    style: "rounded-r-full"
  }
];

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
        alt={title}
        className={` ${style} w-full shadow-lg`}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />
    </div>
  </section>
);

const HeroSection = () => (
  <header className="relative sm:mt-0 h-screen flex   items-center justify-center">
    <div className="text-black text-center px-4">
      <div className="max-w-5xl mx-auto mb-20 " style={{ position: 'relative' }}>
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
      </div>
      <p className="text-xl max-w-6xl mx-auto">
        At Direct Hire, everything began with a simple yet powerful observation. Ayushi, the founder, started her career in recruitment and quickly noticed a gap in the market — one that affected both sides of the hiring equation. On the client side, companies struggled to find candidates who truly matched their needs. On the candidate side, talented individuals were missing out on the right opportunities, not due to lack of skill, but due to lack of access. Ayushi realized that the system needed a bridge — something that genuinely connected the right talent to the right opportunity. That’s when Direct Hire was born.
      </p>
    </div>
  </header>
);

const AboutUs = () => {
    console.log("Helmet rendering");

  return (
   <>
       <Helmet>
        <title>About Us | Direct Hire</title>
        <meta name="description" content="Learn more about Direct Hire’s story, mission, and the team behind the hiring revolution." />
        <meta property="og:title" content="About Us | Direct Hire" />
        <meta property="og:description" content="Discover our journey, values, and the people powering our hiring platform." />
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

        <section className="relative min-h-[625px] overflow-hidden justify-center items-center flex ">
  
  
<ProfileCard
  name="Ayushi Agarwal"
  title="Founder"
  handle="AyushiAgarwal"
  status="Online"
  contactText="Contact Me"
  avatarUrl="./pf.png"
  showUserInfo={true}
  enableTilt={true}
  onContactClick={() => console.log('Contact clicked')}
  grainUrl = "./grain.webp"
  iconUrl = "../src/assets/logo.png"
/>
        </section>

        <section>
          <TestimonialSection />
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default AboutUs;
