import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger for GSAP animations on scroll
import { Star } from 'lucide-react'; // For star icons
import SpotlightCard from '../components/Hovercoloreffect';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';


// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
    {
        name: 'Sarah Johnson',
        position: 'Senior Developer',
        image: 'https://source.unsplash.com/random/100x100/?person,face&1',
        review: 'This platform is a game-changer! The direct hiring process was incredibly efficient, and I landed my dream job faster than I ever expected. The support team is also top-notch.',
        stars: 5,
    },
    {
        name: 'Michael Chen',
        position: 'Marketing Specialist',
        image: 'https://source.unsplash.com/random/100x100/?person,face&2',
        review: 'I was struggling to find relevant job listings until I found this service. The curated opportunities and resume builder truly made a difference. Highly recommended for any job seeker!',
        stars: 4,
    },
    {
        name: 'Emily Rodriguez',
        position: 'Product Manager',
        image: 'https://source.unsplash.com/random/100x100/?person,face&3',
        review: 'The personalized guidance helped me refine my resume and interview skills. I felt much more confident throughout my job search. A truly invaluable resource!',
        stars: 5,
    },
    {
        name: 'David Lee',
        position: 'Data Analyst',
        image: 'https://source.unsplash.com/random/100x100/?person,face&4',
        review: 'Efficient, user-friendly, and effective! The direct connections to employers saved me so much time. This is the future of job searching.',
        stars: 5,
    },
    {
        name: 'Jessica White',
        position: 'UX Designer',
        image: 'https://source.unsplash.com/random/100x100/?person,face&5',
        review: 'Finding a job can be daunting, but this platform made it simple. The clear job descriptions and streamlined application process were fantastic. Thank you!',
        stars: 4,
    },
    {
        name: 'Chris Green',
        position: 'Financial Advisor',
        image: 'https://source.unsplash.com/random/100x100/?person,face&6',
        review: 'I appreciate the focus on direct hiring; it cuts out unnecessary steps. The quality of job listings is also very high. A great experience overall.',
        stars: 5,
    },
];

// Framer Motion variants for staggered card animation
const cardVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

const TestimonialCard = ({ testimonial }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        // GSAP hover effect for each card
        gsap.to(cardRef.current, {
            scale: 1, // Ensure it's at scale 1 initially
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // Default shadow
            duration: 0.3,
            ease: "power1.out",
        });

        // GSAP hover animations
        gsap.to(cardRef.current, {
            scale: 1.03, // Slightly larger on hover
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)', // Deeper shadow
            duration: 0.3,
            ease: "power1.out",
            paused: true, // Start paused
            onReverseComplete: () => {
                gsap.set(cardRef.current, { boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' });
            } // Reset shadow on reverse
        });

        const handleMouseEnter = () => gsap.to(cardRef.current, { scale: 1.03, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)', duration: 0.3, ease: "power1.out" });
        const handleMouseLeave = () => gsap.to(cardRef.current, { scale: 1, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', duration: 0.3, ease: "power1.out" });

        const cardElement = cardRef.current;
        if (cardElement) {
            cardElement.addEventListener('mouseenter', handleMouseEnter);
            cardElement.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (cardElement) {
                cardElement.removeEventListener('mouseenter', handleMouseEnter);
                cardElement.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <SpotlightCard
              
              className="custom-spotlight-card"
              spotlightColor="#0360af"
            >
        <motion.div
            ref={cardRef}
            className=" p-6 rounded-lg  shadow-lg flex flex-col items-center text-center border border-gray-200"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }} // Animate when 40% of the card is in view, only once
        >
            <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-blue-500"
            />
            <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                ))}
            </div>
            <p className="text-gray-700 mb-4 italic text-sm">{testimonial.review}</p>
            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
            <p className="text-sm text-gray-500">{testimonial.position}</p>
        </motion.div></SpotlightCard>
    );
};

const TestimonialSection = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useEffect(() => {
        // GSAP animation for the section title and subtitle
        gsap.fromTo(
            [titleRef.current, subtitleRef.current],
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%", // Animation starts when top of section enters 80% of viewport
                    toggleActions: "play none none none", // Play once
                },
            }
        );
    }, []);

    return (
        <section ref={sectionRef} className="py-16 relative z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 ref={titleRef} className="text-4xl relative z-20 font-[ClashDisplay-Semibold] text-gray-900 sm:text-5xl">
                        What Our <span className='text-blue-700'>Users Say</span> 
                    </h2>
                    <p ref={subtitleRef} className="mt-4 text-lg relative z-20 text-gray-600 max-w-3xl mx-auto">
                        Hear from the job seekers who found success through our platform.
                    </p>
                </div>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    autoplay={{
                        delay: 5000, // Auto-play every 5 seconds
                        disableOnInteraction: false, // Keep auto-play even after user interaction
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                    modules={[Pagination, Navigation, Autoplay]}
                    className="mySwiper pb-12" // Add padding-bottom for pagination dots
                >
                    {testimonialsData.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <TestimonialCard testimonial={testimonial} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default TestimonialSection;
