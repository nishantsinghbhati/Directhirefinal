import {useEffect} from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Footer from '../section/Footer';
import TestimonialSection from '../section/Testimonials';
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormSubmit } from "../hooks/useFormSubmit.js";
import { useForm } from "react-hook-form";
import { jobSeekerSchema } from "../src/schema/jobSeekerSchema.js";
import { useNavigate } from 'react-router-dom';
import {candidatereviews} from "../constants/index.js"
import { Helmet } from 'react-helmet-async';
import Navbar from "../section/NavBar.jsx";
export default function JobSeekerForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(jobSeekerSchema),
  });

  const onSubmit = useFormSubmit("/api/job");

  useEffect(() => {
    gsap.from(".form-container", { duration: 1, y: 30, opacity: 0, ease: "power3.out" });
    gsap.fromTo(".form-container",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
    gsap.from(".form-title", { duration: 1, x: -100, opacity: 0, ease: "power3.out", delay: 0.2 });
    gsap.from(".form-field", {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.5,
      delay: 0.4,
      ease: 'power2.out'
    });
    gsap.fromTo(".form-title",
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(".form-field",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.4, ease: "power2.out" }
    );
  }, []);

  return (
    <section className="min-h-screen">
        <Helmet>
        <title>Job Seeker Application</title>
        <meta name="description" content="Submit your application to find your dream job." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Job Seeker Application" />
        <meta property="og:description" content="Submit your application to find your dream job." />
      </Helmet>
        <Navbar/>
      {/* Hero Title Section */}
      <div className="text-center pt-20 px-4 sm:px-6 lg:px-8  sm:pt-16 lg:pt-20 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-[ClashDisplay-Semibold] leading-tight">
            JOB <span className="text-blue-700">SEEKER</span>
          </h1>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div className="form-container bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
            <h2 className="form-title text-xl sm:text-2xl lg:text-3xl text-center font-bold mb-6 sm:mb-8">
              Job Seeker <span className="text-blue-700">Application</span>
            </h2>
            
            <form 
              className="space-y-4 sm:space-y-6" 
              onSubmit={handleSubmit((data) => onSubmit(data, reset))}
            >
              {/* Form Grid - Responsive Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                
                {/* Full Name */}
                <div className="form-field">
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input 
                    type="text"
                    name="fullName" 
                    {...register("fullname")}
                    placeholder="Full Name"
                    className={`w-full border ${errors.fullname ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base`}
                  />
                  {errors.fullname && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.fullname.message}</p>}
                </div>

                {/* Gender */}
                <div className="form-field">
                  <label className="block text-sm font-medium mb-2">Gender</label>
                  <select 
                    {...register("gender")} 
                    className={`w-full border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base`}
                    name="gender"
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.gender.message}</p>}
                </div>

                {/* Date of Birth */}
                <div className="form-field">
                  <label className="block text-sm font-medium mb-2">Date of Birth</label>
                  <input 
                    type="date"
                    name="dob" 
                    {...register("dob")}
                    className={`w-full border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base`}
                  />
                  {errors.dob && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.dob.message}</p>}
                </div>

                {/* Email */}
                <div className="form-field">
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email"
                    name="email" 
                    {...register("email")}
                    placeholder="your.email@example.com"
                    className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base`}
                  />
                  {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Mobile Number */}
                <div className="form-field">
                  <label className="block text-sm font-medium mb-2">Mobile Number</label>
                  <input 
                    type="tel"
                    name="phone" 
                    {...register("phone")}
                    placeholder="+91 9876543210"
                    className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone.message}</p>}
                </div>

                {/* City */}
                <div className="form-field">
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input 
                    type="text"
                    name="city" 
                    {...register("city")}
                    placeholder="Your City"
                    className={`w-full border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base`}
                  />
                  {errors.city && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.city.message}</p>}
                </div>

                {/* Current CTC */}
                <div className="form-field">
                  <label className="block text-sm font-medium mb-2">Current CTC</label>
                  <input 
                    type="text"
                    name="currentctc" 
                    {...register("currentctc")}
                    placeholder="e.g., 5,00,000"
                    className={`w-full border ${errors.currentctc ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base`}
                  />
                  {errors.currentctc && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.currentctc.message}</p>}
                </div>

                {/* Expected CTC */}
                <div className="form-field">
                  <label className="block text-sm font-medium mb-2">Expected CTC</label>
                  <input 
                    type="text"
                    name="expectedctc" 
                    {...register("expectedctc")}
                    placeholder="e.g., 8,00,000"
                    className={`w-full border ${errors.expectedctc ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base`}
                  />
                  {errors.expectedctc && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.expectedctc.message}</p>}
                </div>

                {/* Current/Last Company */}
                <div className="form-field">
                  <label className="block text-sm font-medium mb-2">Current/Last Company</label>
                  <input 
                    type="text"
                    name="company" 
                    {...register("company")}
                    placeholder="Company Name"
                    className={`w-full border ${errors.company ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base`}
                  />
                  {errors.company && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.company.message}</p>}
                </div>

                {/* Experience */}
                <div className="form-field">
                  <label className="block text-sm font-medium mb-2">Experience</label>
                  <input 
                    type="text"
                    name="experience" 
                    {...register("experience")}
                    placeholder="e.g., 3 years"
                    className={`w-full border ${errors.experience ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base`}
                  />
                  {errors.experience && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.experience.message}</p>}
                </div>

                {/* Education */}
                <div className="form-field">
                  <label className="block text-sm font-medium mb-2">Education</label>
                  <input 
                    type="text"
                    name="education" 
                    {...register("education")}
                    placeholder="e.g., B.Tech Computer Science"
                    className={`w-full border ${errors.education ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base`}
                  />
                  {errors.education && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.education.message}</p>}
                </div>

                {/* Resume Upload - Full Width on Mobile */}
                <div className="form-field md:col-span-2 xl:col-span-3">
                  <label className="block text-sm font-medium mb-2">Upload Resume (PDF)</label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="application/pdf"
                      {...register("resume", {
                        required: "Resume is required",
                        validate: {
                          isPdf: (fileList) =>
                            fileList?.[0]?.type === "application/pdf" || "Only PDF files are allowed",
                        },
                      })}
                      className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 file:border-none file:bg-blue-600 file:text-white file:px-3 file:py-2 file:rounded-md file:text-sm hover:file:bg-blue-700 transition-all duration-200"
                    />
                    {errors.resume && <p className="text-red-500 text-xs sm:text-sm">{errors.resume.message}</p>}
                    
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate("/resume-maker")}
                      className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition-colors duration-200 text-sm sm:text-base"
                    >
                      Build Resume
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 sm:pt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-6 py-3 sm:py-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-200 text-base sm:text-lg font-semibold"
                >
                  Submit Application
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <TestimonialSection testimonials={candidatereviews} />
      <Footer />
    </section>
  );
}