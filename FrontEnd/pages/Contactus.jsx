import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Footer from '../section/footer';
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormSubmit } from "../hooks/useFormSubmit.js";
import { contactusSchema } from "../src/schema/contactusSchema.js";
import { useForm } from "react-hook-form";
const ContactUs = () => {
  const formRef = useRef(null);
  const textRefs = useRef([]);
  textRefs.current = [];

 


  const handleHover = (e) => {
    gsap.to(e.target, { scale: 1.05, duration: 0.3, ease: 'power1.inOut' });
  };

  const handleLeave = (e) => {
    gsap.to(e.target, { scale: 1, duration: 0.3, ease: 'power1.inOut' });
  };


   const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactusSchema),
  });

  const onSubmit = useFormSubmit("/api/contact");

  return (
    <contact>
      <div className='text-4xl font-bold text-center mb-4 px-6 pt-20 max-w-5xl mx-auto' style={{position: 'relative',}}>
      <h1 className='text-8xl font-[ClashDisplay-Semibold]'>CONTACT <span className='text-blue-700'>US</span></h1>
      </div>
    <div className="min-h-fit flex flex-col lg:flex-row items-center justify-center p-6">
      <div className="lg:w-1/2 p-8">
        <h2  className="text-4xl font-bold mb-6">Reach Out to Us</h2>
        <p  className="mb-4 text-gray-600">
          We would love to hear from you! Whether it's feedback, a query, or just to say hi, feel free to get in touch.
        </p>
         <form ref={formRef}  className="space-y-2 min-w-full" onSubmit={handleSubmit((data) => onSubmit(data, reset))}>
          <div> <input
           {...register("name")}
           name="name"
            
            type="text"
            placeholder="Name"
            className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          />{errors.name && <p className="text-red-500">{errors.name.message}</p>}</div>
          <div> <input
           {...register("email")}
           name="email"
            
            type="email"
            placeholder="Email"
            className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}           
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          />{errors.email && <p className="text-red-500">{errors.email.message}</p>}</div> 
         <div>  <input
           {...register("phone")}
           name="phone"
            
            type="tel"
            placeholder="Mobile Number"
            className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}           
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          />{errors.phone && <p className="text-red-500">{errors.phone.message}</p>}</div> 
          <div> <textarea
           {...register("message")}
           name="message"
            
            placeholder="Message"
            className={`w-full border ${errors.message ? 'border-red-500' : 'border-gray-400'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}           
            rows="4"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          />{errors.message && <p className="text-red-500">{errors.message.message}</p>}</div> 
          <button
            
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            Send Message
          </button>
        </form>
        <div className="mt-6 text-center">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
            
          >
            LinkedIn
          </a>
          <span className="mx-2">|</span>
          <a
            href="mailto:someone@example.com"
            className="text-blue-500 hover:underline"
            
          >
            Gmail
          </a>
        </div>
      </div>

      
      
    </div>
    <Footer/></contact>
  );
};

export default ContactUs;
