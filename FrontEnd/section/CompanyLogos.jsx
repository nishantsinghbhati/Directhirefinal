import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const CompanyLogosCarousel = () => {
  const [companies, setCompanies] = useState([]);
  const carouselRef = useRef(null);
  const animationRef = useRef(null);

  const bufferToBase64 = async (buffer, contentType) => {
    const blob = new Blob([new Uint8Array(buffer)], { type: contentType });
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const fetchCompanies = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/apis/logos'); // Change endpoint as needed
      const formattedCompanies = await Promise.all(data.map(async (company) => {
        const base64 = await bufferToBase64(company.imageBuffer.data, company.contentType);
        return {
          id: company._id,
          name: company.name,
          logo: base64,
        };
      }));
      setCompanies(formattedCompanies);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const displayCompanies = [...companies, ...companies];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || displayCompanies.length === 0) return;

    const createAnimation = () => {
      const items = carousel.querySelectorAll('.logo-item');
      const itemWidth = items[0]?.offsetWidth || 200;
      const totalWidth = itemWidth * items.length;

      carousel.style.transform = 'translateX(0px)';

      animationRef.current = setInterval(() => {
        const currentTransform = getComputedStyle(carousel).transform;
        const matrix = new DOMMatrix(currentTransform);
        const currentX = matrix.m41;

        if (Math.abs(currentX) >= totalWidth / 2) {
          carousel.style.transform = 'translateX(0px)';
        } else {
          carousel.style.transform = `translateX(${currentX - 1}px)`;
        }
      }, 16);
    };

    const timer = setTimeout(createAnimation, 100);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [displayCompanies]);

  const handleMouseEnter = (e) => {
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }
    e.currentTarget.style.transform = 'scale(1.1)';
    e.currentTarget.style.filter = 'brightness(1.1)';
    e.currentTarget.style.zIndex = '10';
  };

  const handleMouseLeave = (e) => {
    const carousel = carouselRef.current;
    if (carousel) {
      const items = carousel.querySelectorAll('.logo-item');
      const itemWidth = items[0]?.offsetWidth || 200;
      const totalWidth = itemWidth * items.length;

      animationRef.current = setInterval(() => {
        const currentTransform = getComputedStyle(carousel).transform;
        const matrix = new DOMMatrix(currentTransform);
        const currentX = matrix.m41;

        if (Math.abs(currentX) >= totalWidth / 2) {
          carousel.style.transform = 'translateX(0px)';
        } else {
          carousel.style.transform = `translateX(${currentX - 1}px)`;
        }
      }, 16);
    }
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.filter = 'brightness(1)';
    e.currentTarget.style.zIndex = '1';
  };

  return (
    <div className="w-full py-12 bg-gradient-to-r from-blue-50 to-blue-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Trusted by Industry Leaders</h2>
          <p className="text-lg text-blue-700">Companies I've had the privilege to work with</p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-blue-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-blue-100 to-transparent z-10 pointer-events-none"></div>

          <div className="overflow-hidden z-40">
            <div
              ref={carouselRef}
              className="flex space-x-8 will-change-transform"
              style={{ width: 'fit-content' }}
            >
              {displayCompanies.map((company, index) => (
                <div
                  key={`${company.id}-${index}`}
                  className="logo-item flex-shrink-0 w-48 h-48 bg-white rounded-xl shadow-sm border border-blue-200 flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50 hover:border-blue-300"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="w-full h-48 flex items-center justify-center mb-2">
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="max-w-full max-h-full object-contain filter sm:grayscale hover:grayscale-0 transition-all duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg items-center justify-center text-white font-bold text-lg">
                      {company.name?.charAt(0)}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-blue-800 text-center">
                    {company.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-700 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-blue-700 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogosCarousel;
