import { useRef } from 'react';
import gsap from 'gsap';
import Footer from '../section/Footer.jsx';
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormSubmit } from "../hooks/useFormSubmit.js";
import { contactusSchema } from "../src/schema/contactusSchema.js";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  const formRef = useRef(null);
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
    <section>
      <Helmet>
        <title>Contact Us | DirectHire</title>
        <meta name="description" content="Contact DirectHire to discuss your hiring or job seeking needs." />
      </Helmet>
      <div className='text-4xl font-bold text-center mb-4 px-6 pt-20 max-w-5xl mx-auto'>
        <h1 className='sm:text-8xl text-6xl font-[ClashDisplay-Semibold]'>CONTACT <span className='text-blue-700'>US</span></h1>
      </div>

      <div className="min-h-fit flex flex-col lg:flex-row items-center justify-center gap-8 p-6 max-w-7xl mx-auto">
        {/* LEFT: FORM */}
        <div className="lg:w-1/2 w-full bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-lg">
          <h2 className="text-4xl font-bold mb-6">Reach Out to Us</h2>
          <p className="mb-4 text-gray-600">
            We would love to hear from you! Whether it's feedback, a query, or just to say hi, feel free to get in touch.
          </p>

          <form
            ref={formRef}
            className="space-y-4"
            onSubmit={handleSubmit((data) => onSubmit(data, reset))}
          >
            <div>
              <input
                {...register("name")}
                type="text"
                placeholder="Name"
                className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <input
                {...register("phone")}
                type="tel"
                placeholder="Mobile Number"
                className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <textarea
                {...register("message")}
                placeholder="Message"
                rows="4"
                className={`w-full border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none transition"
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
            >
              Send Message
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="https://www.linkedin.com/company/directhire15/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              LinkedIn
            </a>
            <span className="mx-2">|</span>
            <a
              href="https://mail.google.com/mail/?view=cm&to=ayushi@directhire.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Gmail
            </a>
          </div>
        </div>

        {/* RIGHT: SIDE BOX */}
        <div className="lg:w-1/2 w-full flex flex-col items-center justify-center p-6 bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg">
         
              <div className="space-y-4 sm:space-y-10">
                      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center lg:items-start xl:items-center gap-3 sm:gap-4">
                        <div className="bg-blue-600 rounded-full p-2 sm:p-3 flex-shrink-0">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                          </svg>
                        </div>
                        <div className="text-center sm:text-left lg:text-center xl:text-left">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Email</h4>
                          <p className="text-gray-600 text-xs sm:text-sm">ayushi@directhire.in</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center lg:items-start xl:items-center gap-3 sm:gap-4">
                        <div className="bg-blue-600 rounded-full p-2 sm:p-3 flex-shrink-0">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <div className="text-center sm:text-left lg:text-center xl:text-left">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Location</h4>
                          <p className="text-gray-600 text-xs sm:text-sm">Available Online</p>
                        </div>
                      </div>
        
          <a
            href="https://wa.me/9107976962153"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>  </div>
      <Footer />
    </section>
  );
};

export default ContactUs;
