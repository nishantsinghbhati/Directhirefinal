import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';
import SpotlightCard from '../components/Hovercoloreffect';

gsap.registerPlugin(ScrollTrigger);

// === Card Animation Variants ===
const cardVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

// === Testimonial Card ===
const TestimonialCard = ({ testimonial }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const cardElement = cardRef.current;

        const handleMouseEnter = () =>
            gsap.to(cardElement, {
                scale: 1.03,
                boxShadow:
                    '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
                duration: 0.3,
                ease: 'power1.out',
            });

        const handleMouseLeave = () =>
            gsap.to(cardElement, {
                scale: 1,
                boxShadow:
                    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                duration: 0.3,
                ease: 'power1.out',
            });

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
        <SpotlightCard className="custom-spotlight-card" spotlightColor="#0360af">
            <motion.div
                ref={cardRef}
                className="p-6 rounded-lg shadow-lg flex flex-col items-center text-center border border-gray-200"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
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
                            className={`w-5 h-5 ${
                                i < testimonial.stars
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                            }`}
                        />
                    ))}
                </div>
                <p className="text-gray-700 mb-4 italic text-sm">{testimonial.review}</p>
                <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                <p className="text-sm text-gray-500">{testimonial.position}</p>
            </motion.div>
        </SpotlightCard>
    );
};

// === Lazy Load Swiper ===
const LazySwiper = ({ testimonials }) => {
    const [SwiperModules, setSwiperModules] = useState(null);

    useEffect(() => {
        const load = async () => {
            const { Swiper, SwiperSlide } = await import('swiper/react');
            const { Pagination, Navigation, Autoplay } = await import('swiper/modules');
            await import('swiper/css');
            await import('swiper/css/pagination');
            await import('swiper/css/navigation');

            setSwiperModules({ Swiper, SwiperSlide, Pagination, Navigation, Autoplay });
        };

        load();
    }, []);

    if (!SwiperModules) return null;

    const { Swiper, SwiperSlide, Pagination, Navigation, Autoplay } = SwiperModules;

    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper pb-12"
        >
            {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                    <TestimonialCard testimonial={testimonial} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

// === Main Testimonial Section ===
const TestimonialSection = ({ testimonials = [] }) => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            [titleRef.current, subtitleRef.current],
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }, []);

    if (testimonials.length === 0) return null;

    return (
        <section ref={sectionRef} className="py-16 relative z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2
                        ref={titleRef}
                        className="text-4xl font-[ClashDisplay-Semibold] text-gray-900 sm:text-5xl relative z-20"
                    >
                        What Our <span className="text-blue-700">Clients Say</span>
                    </h2>
                    <p
                        ref={subtitleRef}
                        className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto relative z-20"
                    >
                        Hear from the job seekers who found success through our platform.
                    </p>
                </div>

                <LazySwiper testimonials={testimonials} />
            </div>
        </section>
    );
};

export default TestimonialSection;
