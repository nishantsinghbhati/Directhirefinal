// src/pages/HireTalentPage.jsx
import { useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormSubmit } from "../hooks/useFormSubmit.js";
import { hireTalentSchema } from "../src/schema/hireTalentSchema.js";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import gsap from "gsap";
import TestimonialSection from "../section/Testimonials";
import Footer from "../section/Footer";
import { hiringcompanysreviews } from "../constants/index.js";
import { Helmet } from "react-helmet-async";
import Navbar from "../section/NavBar.jsx";

export default function HireTalentPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(hireTalentSchema),
  });

  const onSubmit = useFormSubmit("/api/hire");

  return (
    <div className="bg-blue-200 min-h-screen ">
      <Helmet>
        <title>Hiretalent Application</title>
        <meta name="description" content="Submit your application to find your dream job." />
      </Helmet>
      <Navbar/>
      {/* Hero Title Section */}
      <div className="text-center px-4 sm:px-6 lg:px-8 pt-6 sm:pt-6 lg:pt-6 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-[ClashDisplay-Semibold] font-bold leading-tight">
            HIRE <span className="text-blue-700">TALENT</span>
          </h1>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center lg:justify-between gap-8 lg:gap-12">
            
            {/* Form Section */}
            <motion.div
              ref={containerRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/2 xl:w-2/5 bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-300"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">
                Hire Talent
              </h2>

              <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit((data) => onSubmit(data, reset))}>
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Company Name</label>
                  <input
                    {...register("company")}
                    name="company"
                    type="text"
                    className={`w-full border ${errors.company ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base`}
                    placeholder="Enter company name"
                  />
                  {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
                </div>

                {/* Contact Person */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Contact Person</label>
                  <input
                    {...register("contact")}
                    name="contact"
                    type="text"
                    className={`w-full border ${errors.contact ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base`}
                    placeholder="Name of contact person"
                  />
                  {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
                </div>

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                    <input
                      {...register("email")}
                      name="email"
                      type="email"
                      className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base`}
                      placeholder="Email address"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Phone</label>
                    <input
                      {...register("phone")}
                      name="phone"
                      type="tel"
                      className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base`}
                      placeholder="Phone number"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Job Title</label>
                  <input
                    {...register("title")}
                    name="title"
                    type="text"
                    className={`w-full border ${errors.title ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base`}
                    placeholder="e.g. Full Stack Developer"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                {/* Job Description */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Job Description</label>
                  <textarea
                    {...register("description")}
                    name="description"
                    rows="4"
                    className={`w-full border ${errors.description ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base resize-none`}
                    placeholder="Describe the role and expectations"
                  ></textarea>
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                {/* Work Mode */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Work Mode</label>
                  <select 
                    {...register("mode")} 
                    className={`w-full border ${errors.mode ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base bg-white`}
                    name="mode"
                  >
                    <option value="" disabled>Select one</option>
                    <option value="remote">Remote</option>
                    <option value="onsite">On-site</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                  {errors.mode && <p className="text-red-500 text-sm mt-1">{errors.mode.message}</p>}
                </div>

                {/* Location and Salary Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Location</label>
                    <input
                      {...register("location")}
                      name="location"
                      type="text"
                      className={`w-full border ${errors.location ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base`}
                      placeholder="City or remote"
                    />
                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Salary Range</label>
                    <input
                      {...register("salary")}
                      name="salary"
                      type="text"
                      className="w-full border border-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                      placeholder="e.g. ₹30,000 - ₹50,000/month"
                    />
                    {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary.message}</p>}
                  </div>
                </div>

                {/* Experience Required */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Experience Required</label>
                  <input
                    {...register("experience")}
                    name="experience"
                    type="text"
                    className="w-full border border-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                    placeholder="e.g. 1-3 years"
                  />
                  {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="pt-4 text-center">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                  >
                    Submit Hiring Request
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Image Section */}
            <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center order-first lg:order-last">
              <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl">
                <img 
                  src="/hire top talent.webp" 
                  alt="Hire Top Talent" 
                  className="w-full h-auto object-cover rounded-lg shadow-lg" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials and Footer */}
      <TestimonialSection testimonials={hiringcompanysreviews} />
      <Footer />
    </div>
  );
}