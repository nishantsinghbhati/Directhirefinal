// src/pages/HireTalentPage.jsx
import { useEffect, useRef,  } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormSubmit } from "../hooks/useFormSubmit.js";
import { hireTalentSchema } from "../src/schema/hireTalentSchema.js";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import gsap from "gsap";
import TextPressure from "../components/AboutusText";
import TestimonialSection from "../section/Testimonials";
import Footer from "../section/footer";
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
    <div className=" bg-blue-200">
        <div className='text-4xl font-bold text-center mb-4 px-6 pt-20 max-w-5xl mx-auto' style={{position: 'relative',}}>
 <h1 className='text-8xl font-[ClashDisplay-Semibold]'>HIRE <span className='text-blue-700'>TALENT</span></h1>
</div>
    <div className="min-h-screen lg:flex-row flex items-center justify-evenly px-4 py-12">
              
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-white  rounded-2xl shadow-xl min-h-fit max-w-full p-8 border border-gray-300"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">
          Hire Talent
        </h2>

         <form  className="space-y-2 min-w-full" onSubmit={handleSubmit((data) => onSubmit(data, reset))}>
           <div>
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <input
               {...register("company")}
                name="company"
              type="text"
              className={`w-full border ${errors.company ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
              placeholder="Enter company name"
            />
             {errors.company && <p className="text-red-500">{errors.company.message}</p>}
          </div>
            <div>
            <label className="block text-sm font-medium mb-1">Contact Person</label>
            <input
             {...register("contact")}
              name="contact"
              type="text"
              className={`w-full border ${errors.contact ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
              placeholder="Name of contact person"
            />
             {errors.contact && <p className="text-red-500">{errors.contact.message}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
               {...register("email")}
                name="email"
                type="email"
                className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholder="Email address"
              />
               {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
               {...register("phone")}
                name="phone"
                type="tel"
                className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholder="Phone number"
              />
               {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Job Details */}
          <div>
            <label className="block text-sm font-medium mb-1">Job Title</label>
            <input
             {...register("title")}
              name="title"
              type="text"
              className={`w-full border ${errors.title ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
              placeholder="e.g. Full Stack Developer"
            />
             {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>

         <div>
  <label className="block text-sm font-medium mb-1">Job Description</label>
  <textarea
   {...register("description")}
    name="description"
    rows="4"
    className={`w-full border ${errors.description ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
    placeholder="Describe the role and expectations"
  ></textarea>
   {errors.description && <p className="text-red-500">{errors.description.message}</p>}
</div>
      {/* Repeat the above for other fields */}
      <div>
         <label className="block text-sm font-medium mb-1">Work Mode</label>
      <select {...register("mode")} className={`w-full border ${errors.mode ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
      name="mode">
         <option value="" disabled>
                Select one
              </option>
              <option value="remote">Remote</option>
              <option value="onsite">On-site</option>
              <option value="hybrid">Hybrid</option>
      </select>
      {errors.mode && <p className="text-red-500">{errors.mode.message}</p>}
</div>
<div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
               {...register("location")}
                name="location"
                type="text"
                className={`w-full border ${errors.location ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholder="City or remote"
              />
              {errors.location && <p className="text-red-500">{errors.location.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Salary Range</label>
              <input
               {...register("salary")}
                name="salary"
                type="text"
                className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="e.g. ₹30,000 - ₹50,000/month"
              />
              {errors.salary && <p className="text-red-500">{errors.salary.message}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Experience Required</label>
            <input
               {...register("experience")}
              name="experience"
              type="text"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. 1-3 years"
            />
            {errors.experience && <p className="text-red-500">{errors.experience.message}</p>}
          </div>
      <div className="pt-4 text-center">
            <button
              type="submit"
              className="bg-blue-600 btn-primary hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300"
            >
              Submit Hiring Request
            </button>
          </div>
    </form>
      </motion.div><div className="lg:w-1/2 hidden lg:flex items-center justify-center">
        <img src="/hire top talent.png" alt="Contact Us" className="contact-image max-w-[600px] max-h-[600px] w-fit h-fit object-cover rounded-lg shadow-lg" />
      </div>
    </div>
     <TestimonialSection testimonials={testimonialsForPage} />
    <Footer/></div>
  );
}
