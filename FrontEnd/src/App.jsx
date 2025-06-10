import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "../section/NavBar.jsx";
import Home from "../pages/Home";
import ContactUs from "../pages/Contactus.jsx";
import LoadingSpinner from "../components/LoadingAnimation.jsx";  // Import your spinner here
import AboutUs from "../pages/AboutUs.jsx";
import JobSeekerForm from "../pages/JobSeeker.jsx";
import 'swiper/css';
import 'swiper/css/navigation';
import HireTalentPage from "../pages/Hiretalent.jsx";
import BlogPage from "../pages/Blogs.jsx";
import { Toaster } from "react-hot-toast";
const ResumeMaker = lazy(() => import("../pages/ResumeMaker.jsx"));

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar /> {/* Navbar will be excluded from specific routes if needed */}
      <Routes>
        {/* Exclude Navbar for ResumeMaker route */}
        <Route path="/resume-maker/*" element={<ResumeMakerLayout />} />
        <Route path="*" element={<DefaultLayout />} />
      </Routes>
    </>
  );
}

const DefaultLayout = () => (
  <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/job-seeker" element={<JobSeekerForm />} />
      <Route path="/hire-talent" element={<HireTalentPage/>} />
      <Route path="/blog" element={<BlogPage/>} />
    </Routes>
    
  </>
);

const ResumeMakerLayout = () => (
  <div >
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/*" element={<ResumeMaker />} />
      </Routes>
    </Suspense>
  </div>
);

export default App;
