import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Footer from '../section/footer';
import TestimonialSection from '../section/Testimonials';
import TextPressure from '../components/AboutusText';
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormSubmit } from "../hooks/useFormSubmit.js";
import { useForm } from "react-hook-form";
import { jobSeekerSchema } from "../src/schema/jobSeekerSchema.js";
  import { useNavigate } from 'react-router-dom';
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
    <section >
     
        
           <div className='text-4xl font-bold text-center mb-4 px-6 pt-20 max-w-5xl mx-auto' style={{position: 'relative',}}>
  <h1 className='text-8xl font-[ClashDisplay-Semibold]'>JOB <span className='text-blue-700'>SEEKER</span></h1>
</div><div className='flex flex-col lg:flex-row items-center mx-11 gap-7 justify-evenly '>
    <motion.div className="form-container opacity-100 max-w-fit min-h-fit sm:items-start items-center    flex flex-col justify-center   p-6 bg-white rounded-xl shadow-md">
      <h2 className="form-title text-2xl text-center font-bold mb-6">Job Seeker <span className='text-blue-700'> Application</span></h2>
      <form  className="space-y-4 space-x-4 grid grid-cols-1 sm:grid-cols-3" onSubmit={handleSubmit((data) => onSubmit(data, reset))}>
        <div className="form-field">
          <label className="block font-medium">Full Name</label>
          <input type="text"
           name="fullName" 
          {...register("fullname")}
          
          
            placeholder="Full Name"
            className={`w-full border ${errors.fullname ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
    />{errors.fullname && <p className="text-red-500">{errors.fullname.message}</p>}
        </div>
 <div className="form-field">
         <label className="block text-sm font-medium mb-1">Gender</label>
      <select {...register("gender")} className={`w-full border ${errors.gender ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
      name="gender">
         <option value="" disabled>
                Select one
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
      </select>
      {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
</div>
               <div className="form-field">
          <label className="block font-medium">Date of Birth</label>
          <input type="text"
           name="dob" 
          {...register("dob")}
          
          
            placeholder="Date of Birth"
            className={`w-full border ${errors.dob ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
    />{errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
        </div>
               <div className="form-field">
          <label className="block font-medium">Email</label>
          <input type="email"
           name="email" 
          {...register("email")}
          
          
            placeholder="Email"
            className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
    />{errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
               <div className="form-field">
          <label className="block font-medium">Mobile Number</label>
          <input type="tel"
           name="phone" 
          {...register("phone")}
          
          
            placeholder="Mobile Number"
            className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
    />{errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        </div>
               <div className="form-field">
          <label className="block font-medium">City</label>
          <input type="text"
           name="city" 
          {...register("city")}
          
          
            placeholder="City"
            className={`w-full border ${errors.city ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
    />{errors.city && <p className="text-red-500">{errors.city.message}</p>}
        </div>
               <div className="form-field">
          <label className="block font-medium">Current CTC</label>
          <input type="text"
           name="currentctc" 
          {...register("currentctc")}
          
          
            placeholder="Current CTC"
            className={`w-full border ${errors.currentctc ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
    />{errors.currentctc && <p className="text-red-500">{errors.currentctc.message}</p>}
        </div>
               <div className="form-field">
          <label className="block font-medium">Expected CTC</label>
          <input type="text"
           name="expectedctc" 
          {...register("expectedctc")}
          
          
            placeholder="Expected CTC"
            className={`w-full border ${errors.expectedctc ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
    />{errors.expectedctc && <p className="text-red-500">{errors.expectedctc.message}</p>}
        </div>
               <div className="form-field">
          <label className="block font-medium">Current/Last Company</label>
          <input type="text"
           name="company" 
          {...register("company")}
          
          
            placeholder="Current/Last Company"
            className={`w-full border ${errors.company ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
    />{errors.company && <p className="text-red-500">{errors.company.message}</p>}
        </div>
               <div className="form-field">
          <label className="block font-medium">Experience</label>
          <input type="text"
           name="experience" 
          {...register("experience")}
          
          
            placeholder="Experience"
            className={`w-full border ${errors.experience ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
    />{errors.experience && <p className="text-red-500">{errors.experience.message}</p>}
        </div>
               <div className="form-field">
          <label className="block font-medium">Education</label>
          <input type="text"
           name="education" 
          {...register("education")}
          
          
            placeholder="Education"
            className={`w-full border ${errors.education ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
    />{errors.education && <p className="text-red-500">{errors.education.message}</p>}
        </div>
       <div className="form-field flex flex-col space-y-2">
  <label className="font-medium">Upload Resume(PDF)</label>

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
   
   className="file-input border border-gray-300 rounded-lg p-2 file:border-none file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded-md hover:file:bg-blue-700 transition-all duration-200"
/>
 <motion.button
 type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
           onClick={() => navigate("/resume-maker")}
          className="px-1 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        >
          Build Resume
          
        </motion.button> 
 
</div  >
<div className='col-2 '>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="px-6 py-3 w-full  bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        >
          Submit Application
          
        </motion.button></div>
      </form>
    </motion.div> </div>
    <TestimonialSection/>
    <Footer/>
    </section>
  );
}
