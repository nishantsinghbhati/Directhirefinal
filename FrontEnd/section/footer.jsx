import { useRef } from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn"; // Assuming this hook provides a good fade-in effect
import { Linkedin, Mail, MapPin, Phone, AtSign } from "lucide-react"; // Added more icons for contact info
import { links } from "../constants";

const socialLinks = [
  {
    icon: <Mail className="w-6 h-6 transition-transform duration-300 group-hover:scale-125" />,
    href: "https://mail.google.com/mail/?view=cm&to=ayushi@directhire.in",
    label: "Email Us",
  },
  {
    icon: <Linkedin className="w-6 h-6 transition-transform duration-300 group-hover:scale-125" />,
    href: "https://www.linkedin.com/company/directhire15/?viewAsMember=true ",
    label: "LinkedIn Profile",
  },
];

export default function Footer() {
  const footerRef = useRef(null);
  const quickLinksRef = useRef(null);
  const connectRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  // Apply scroll fade-in to individual sections for a staggered effect
  useScrollFadeIn(footerRef, { duration: 1, delay: 0.1 });
  useScrollFadeIn(aboutRef, { duration: 0.8, delay: 0.2 });
  useScrollFadeIn(quickLinksRef, { duration: 0.8, delay: 0.3 });
  useScrollFadeIn(connectRef, { duration: 0.8, delay: 0.4 });
  useScrollFadeIn(contactRef, { duration: 0.8, delay: 0.5 });


  return (
    <footer className="relative bg-gradient-to-br from-blue-700 to-blue-900 py-16 overflow-hidden">
      {/* Animated Background Elements (overlapping, continuous loops) */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-400 rounded-full mix-blend-screen filter blur-3xl animate-floating-blob-lg animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl animate-floating-blob-md animation-delay-4000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl animate-floating-blob-sm animation-delay-0"></div>
        <div className="absolute top-1/2 left-1/4 w-52 h-52 bg-blue-300 rounded-full mix-blend-screen filter blur-3xl animate-floating-blob-md animation-delay-1000"></div>
      </div>

      <div ref={footerRef} className="relative z-10 max-w-7xl mx-auto px-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 justify-items-center md:justify-items-start">

          {/* About / Branding */}
          <div ref={aboutRef} className="text-center md:text-left col-span-full lg:col-span-1">
            <h2 className="text-3xl font-extrabold mb-4 text-white tracking-wide">Direct Hire</h2>
            <p className="text-sm text-blue-100 leading-relaxed">
              Your trusted partner in bridging talent with opportunity. We connect top-tier professionals with leading companies to build successful careers and thriving businesses.
            </p>
            <p className="text-xs text-blue-200 mt-3">
              Innovation in recruitment, integrity in every connection.
            </p>
          </div>

          {/* Quick Links */}
          <div ref={quickLinksRef} className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-5 text-white border-b-2 border-blue-400 pb-2 inline-block">Explore</h3>
            <ul className="space-y-3 ">
              {links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="group text-blue-100 hover:text-white transition-all duration-300 transform hover:translate-x-1 hover:scale-105 flex items-center justify-center md:justify-start"
                  >
                    <span className="mr-2 opacity-0  group-hover:opacity-100 transition-opacity duration-300">&gt;</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect with Us */}
          <div ref={connectRef} className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-5 text-white border-b-2 border-blue-400 pb-2 inline-block">Connect</h3>
            <div className="flex justify-center md:justify-start space-x-6 mt-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group text-blue-100 hover:text-white transition-colors duration-300 p-3 rounded-full bg-white/10 hover:bg-white/30 transform hover:-translate-y-1 shadow-lg flex items-center justify-center tooltip"
                  data-tooltip={social.label}
                >
                  {social.icon}
                  {/* Tooltip implementation might need an additional CSS class or library */}
                </a>
              ))}
            </div>
            {/* Optional Call to Action */}
            <p className="mt-8 text-sm text-blue-200">
              Ready to find your next opportunity?
              <a href="/contact" className="font-medium text-white hover:underline ml-1">Let's Talk!</a>
            </p>
          </div>

          {/* Contact Information */}
          <div ref={contactRef} className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-5 text-white border-b-2 border-blue-400 pb-2 inline-block">Reach Us</h3>
            <div className="space-y-3 text-blue-100">
              <p className="flex items-center justify-center md:justify-start">
                <MapPin className="w-5 h-5 mr-3 text-blue-300 flex-shrink-0" />
                <a href="https://maps.app.goo.gl/3yhYprcX3nPb52Co6"> 151, Padmavti Colony, Nirman Nagar, Ranisati Nagar, Jaipur, Rajasthan 302019</a>
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <Phone className="w-5 h-5 mr-3 text-blue-300 flex-shrink-0" />
                <a href="tel:+91 079769 62153" className="hover:text-white transition-colors duration-200">079769 62153</a>
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <AtSign className="w-5 h-5 mr-3 text-blue-300 flex-shrink-0" />
                <a href="mailto:info@directhire.com" className="hover:text-white transition-colors duration-200">HR@directhire.in</a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-blue-600 mt-16 pt-8 text-center text-sm text-blue-200">
          © {new Date().getFullYear()} Direct Hire. All rights reserved. 
          <a href="https://nishant-singh-bhati-portfolio.onrender.com/" target="_blank"> (Managed by vision)</a>
        </div>
      </div>
    </footer>
  );
}