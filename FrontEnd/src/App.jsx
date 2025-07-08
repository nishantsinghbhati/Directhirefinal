import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
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
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
     
      {/* 👇 This key prop forces rerender on route change */}
      <div key={location.pathname}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/job-seeker" element={<JobSeekerForm />} />
          <Route path="/hire-talent" element={<HireTalentPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route
            path="/resume-maker/*"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ResumeMaker />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </>
  );
}


export default App;
