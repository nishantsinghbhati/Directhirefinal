import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom"; // Assuming you are using react-router-dom for routing
import { navLinks1, navLinks2, navLinks2opt } from "../constants/index.js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // New state for scroll hide
  const [lastScrollY, setLastScrollY] = useState(0); // New state to track last scroll position
  const location = useLocation(); // Hook to get current path for active links

  // Close mobile menu and dropdown on route change
  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  // Handle scroll to hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // Scrolling down and past a certain threshold (e.g., 100px)
        setIsVisible(false);
      } else {
        // Scrolling up or near the top
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]); // Re-run effect when lastScrollY changes

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Framer Motion variants for animations
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { scale: 1.05, color: "#3B82F6", transition: { duration: 0.2 } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scaleY: 0.95, originY: 0 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, scaleY: 0.95, transition: { duration: 0.15, ease: "easeIn" } },
  };

  const mobileMenuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { type: "spring", stiffness: 120, damping: 20 } },
    exit: { x: "100%", transition: { type: "spring", stiffness: 120, damping: 20 } },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  // Helper function to determine if a link is active
  const getIsActive = (path) => {
    return location.pathname === path || (path === "/" && location.pathname === "/home"); // Adjust for your home path if needed
  };

  return (
    <motion.nav
      className="bg-white fixed w-full top-0 left-0 z-50 shadow-lg py-3 px-6 transition-all duration-300"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }} // Animate based on isVisible
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto flex justify-between items-center h-14">
        {/* Left Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks1.map((link) => (
            <motion.a
              key={link.label}
              href={link.destination}
              className={`relative text-gray-700 font-medium tracking-wide transition-colors duration-200 group
                ${getIsActive(link.destination) ? "text-blue-600 after:scale-x-100" : "hover:text-blue-500"}`}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              // Add a subtle underline animation
            >
              {link.label}
              <span className="absolute bottom-[-5px] left-0 w-full h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              {getIsActive(link.destination) && isVisible && (
  <span
    layoutid="activeNavLink"
    className="absolute bottom-[-5px] left-0 w-full h-[2px] bg-blue-600 rounded-full"
  ></span>
)}
            </motion.a>
          ))}
        </div>

        {/* Logo */}
        <div className="flex-shrink-0 text-xl font-bold text-gray-900">
          <a href="/">
            <motion.img
              src="/NavLogo.webp" // Ensure path is correct
              alt="directhirelogo"
              className="h-10 w-auto cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            />
          </a>
        </div>

        {/* Right Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <div className="relative">
            <motion.button
              onClick={toggleDropdown}
              className="relative text-gray-700 font-medium tracking-wide hover:text-blue-500 flex items-center group"
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              Services <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`} />
              <span className="absolute bottom-[-5px] left-0 w-full h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </motion.button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  className="absolute bg-white shadow-xl rounded-lg mt-3 w-44 origin-top-right z-50 overflow-hidden"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {navLinks2opt.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.destination}
                      className={`block px-5 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200
                        ${getIsActive(link.destination) ? "bg-blue-100 text-blue-700 font-semibold" : ""}`}
                      variants={navItemVariants} // Use common variants for subtle entrance
                      whileHover="hover"
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {navLinks2.map((link) => (
            <motion.a
              key={link.label}
              href={link.destination}
              className={`relative text-gray-700 font-medium tracking-wide transition-colors duration-200 group
                ${getIsActive(link.destination) ? "text-blue-600 after:scale-x-100" : "hover:text-blue-500"}`}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              {link.label}
              <span className="absolute bottom-[-5px] left-0 w-full h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              {getIsActive(link.destination) && (
                <motion.span
                  layoutId="activeNavLink" // Unique ID for shared layout animation
                  className="absolute bottom-[-5px] left-0 w-full h-[2px] bg-blue-600 rounded-full"
                ></motion.span>
              )}
            </motion.a>
          ))}
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden cursor-pointer z-50" onClick={toggleMenu}>
          <motion.div
            key={isOpen ? "x" : "menu"} // Key change for animation
            initial={{ rotate: isOpen ? -90 : 0, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X size={26} className="text-gray-700" /> : <Menu size={26} className="text-gray-700" />}
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 right-0 w-full h-full bg-blue-700 text-white flex flex-col items-center justify-center p-8 z-40 overflow-y-auto"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
          
            <div className="flex flex-col space-y-6 text-xl">
              {[...navLinks1, { label: "Services", destination: "#", isDropdown: true, subLinks: navLinks2opt }, ...navLinks2].map((link, index) => (
                link.isDropdown ? (
                  <div key={link.label} className="relative text-center">
                    <motion.button
                      onClick={toggleDropdown}
                      className="text-white hover:text-blue-200 flex items-center justify-center"
                      variants={mobileLinkVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      {link.label} <ChevronDown size={20} className={`ml-2 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`} />
                    </motion.button>
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          className="mt-3 space-y-2 text-lg"
                          variants={dropdownVariants} // Re-use dropdown variants
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          {link.subLinks.map((subLink) => (
                            <motion.a
                              key={subLink.label}
                              href={subLink.destination}
                              className={`block text-blue-200 hover:text-white transition-colors duration-200
                                ${getIsActive(subLink.destination) ? "font-bold text-white" : ""}`}
                              onClick={toggleMenu} // Close menu on sub-link click
                              variants={mobileLinkVariants} // Subtle entrance
                              initial="hidden"
                              animate="visible"
                              transition={{ delay: 0.1 + index * 0.05 + 0.1 }}
                            >
                              {subLink.label}
                            </motion.a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.a
                    key={link.label}
                    href={link.destination}
                    className={`text-white hover:text-blue-200 transition-colors duration-200
                      ${getIsActive(link.destination) ? "font-bold text-blue-100" : ""}`}
                    onClick={toggleMenu} // Close menu on link click
                    variants={mobileLinkVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 + index * 0.05 }} // Staggered appearance
                  >
                    {link.label}
                  </motion.a>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;