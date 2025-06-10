import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import {motion} from "framer-motion"
// Import Swiper styles - These are crucial for Swiper to work
import 'swiper/css';
import 'swiper/css/navigation'; // Only navigation CSS needed now

const industryData = [
    {
        label: "Automobile & Auto Components",
        link: "",
        icon: "https://www.abcconsultants.in/wp-content/uploads/2023/06/sp-icon-02.svg",
    },
    {
        label: "Financial Services",
        link: "",
        icon: "https://www.abcconsultants.in/wp-content/uploads/2023/10/Finance.svg",
    },
    {
        label: "Industrial",
        link: "",
        icon: "https://www.abcconsultants.in/wp-content/uploads/2023/06/sp-icon-04.svg",
    },
    {
        label: "Technology",
        link: "",
        icon: "https://www.abcconsultants.in/wp-content/uploads/2023/06/sp-icon-05.svg",
    },
    {
        label: "Consumer",
        link: "",
        icon: "https://www.abcconsultants.in/wp-content/uploads/2023/10/Consumer.svg",
    },
    {
        label: "Media & Entertainment",
        link: "",
        icon: "https://www.abcconsultants.in/wp-content/uploads/2023/10/Media.svg",
    },
    {
        label: "Pharma & Healthcare",
        link: "",
        icon: "https://www.abcconsultants.in/wp-content/uploads/2023/10/Healthcare.svg",
    },
    {
        label: "Retail",
        link: "",
        icon: "https://www.abcconsultants.in/wp-content/uploads/2023/10/Retail.svg",
    },
];

export default function IndustrySpecializations() {
    const [activeIndex, setActiveIndex] = useState(0);
    const circleRefs = useRef([]); // To store references to each circle SVG element

    useEffect(() => {
        // This useEffect will calculate and store rlen for each circle
        // and apply the initial strokeDashoffset to hide them.
        circleRefs.current.forEach((circle, index) => {
            if (circle) {
                const r = parseFloat(circle.getAttribute('r'));
                const rlen = 2 * Math.PI * r;
                circle.style.strokeDasharray = `${rlen}px`;
                // Initially hide all strokes
                circle.style.strokeDashoffset = `${rlen}px`;
            }
        });
    }, []); // Runs once on mount

    useEffect(() => {
        // This useEffect will animate the stroke of the active circle
        circleRefs.current.forEach((circle, index) => {
            if (circle) {
                const r = parseFloat(circle.getAttribute('r'));
                const rlen = 2 * Math.PI * r;
                if (index === activeIndex) {
                    // Animate to show stroke for the active circle
                    circle.style.transition = 'stroke-dashoffset 2.3s ease-out, stroke 0.3s ease-in-out';
                    circle.style.strokeDashoffset = '0px';
                    circle.style.stroke = '#2D6CDF'; // Active stroke color
                } else {
                    // Hide stroke for inactive circles
                    circle.style.transition = 'stroke-dashoffset 2.3s ease-out, stroke 0.3s ease-in-out';
                    circle.style.strokeDashoffset = `${rlen}px`;
                    circle.style.stroke = 'transparent'; // Inactive stroke color
                }
            }
        });
    }, [activeIndex]); // Re-run when activeIndex changes

    return (
        <section className=" relative  sm:min-h-screen   flex flex-col justify-center items-center z-20 text-gray-800">
            {/* Custom styles for Swiper navigation arrows */}
            <style>
                {`
                .swiper-button-next,
                .swiper-button-prev {
                    width: 40px; /* Adjust size */
                    height: 40px; /* Adjust size */
                    border-radius: 50%;
                    background-color:#2D6CDF; /* Light gray background for inactive */
                    color: white; /* Arrow color */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, color 0.3s ease;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 10;
                }

                

                /* Custom arrow icons (if default are not suitable) */
                .swiper-button-next::after,
                .swiper-button-prev::after {
                    font-size: 16px; /* Adjust arrow size */
                    font-weight: bold;
                }

                .swiper-button-prev {
                    left:  0; /* Position left arrow */
                }

                .swiper-button-next {
                    right: 0; /* Position right arrow */
                }
                `}
            </style>

            <div className="container  max-w- px-4">
                   <motion.div
      initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6 }}>  <div className="text-center sm:mb-40 mb-16 min-w-fit ">
                    <h2 className="text-center relative z-30 xl:text-7xl sm:text-5xl lg:text-2xl font-[ClashDisplay-Semibold] md:text-5xl text-4xl sm:pb-16 pb-5">Industry <span className='text-blue-700'>Specilisation</span></h2>
                    <p className="text-gray-600 sm:px-24 md:px-32 lg:px-30 font-[ClashDisplay-Regular] xl:px-30 text-sm sm:text-2xl">
                        We recognize that each industry has its own nuances in terms of management style,
                        hiring practices and compensation norms. To provide clients with specialized search
                        solutions, Direct Hire has developed expertise in the following industries:
                    </p>
                </div></motion.div>

                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1} // Changed to 3 to have a clear center
                    centeredSlides={true} // Center the active slide
                    loop={true} // Enable looping for continuous effect
                    navigation // Enable navigation arrows
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 3, centeredSlides: true },
                        768: { slidesPerView: 3, centeredSlides: true }, // Adjusted for more slides on larger screens
                        1024: { slidesPerView: 3, centeredSlides: true },
                    }}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Update activeIndex
                    className="mySwiper "
                >
                    {industryData.map((item, i) => (
                        <SwiperSlide key={i}>
                            <a href={item.link} className="group text-center block transition-transform duration-300 hover:scale-105">
                                <div className="relative w-32 h-32 mx-auto mb-4 ">
                                    {/* Background circle (light gray or light blue) */}
                                    <svg className="absolute inset-0 w-full  h-full" viewBox="0 0 150 150">
                                        <circle
                                            cx="75"
                                            cy="75"
                                            r="65"
                                            stroke="transparent" // No stroke for background circle
                                            strokeWidth="0" // No stroke for background circle
                                            fill={i === activeIndex ? "rgba(45, 108, 223, 0.1)" : "#E0E0E0"} // Conditional fill
                                            style={{ transition: "fill 0.3s ease-in-out" }} // Smooth transition for fill
                                        />
                                    </svg>
                                    {/* Progress circle (blue when active, transparent when inactive) */}
                                    <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 150 150">
                                        <circle
                                            ref={el => circleRefs.current[i] = el} // Store ref to each circle
                                            className="progress-circle"
                                            cx="75"
                                            cy="75"
                                            r="65"
                                            // Stroke color and dashoffset will be managed by useEffect
                                            strokeWidth="5"
                                            fill="transparent"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <img src={item.icon} alt={item.label} className="w-10 h-10" />
                                    </div>
                                </div>
                                <p className="text-sm font-medium">{item.label}</p>
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
