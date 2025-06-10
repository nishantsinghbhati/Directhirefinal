import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollFadeIn } from '../hooks/useScrollFadeIn';
import {  useRef } from "react";
const teamData = [
    {
        name: 'John Smith',
        position: 'CEO',
        linkedin: 'https://www.linkedin.com/in/johnsmith',
        description: 'John is the visionary leader of our company, with over 20 years of experience in the industry. He is passionate about innovation and creating a positive work environment.',
        image: 'https://source.unsplash.com/random/150x150/?portrait&1', // Example image URL
    },
    {
        name: 'Alice Johnson',
        position: 'CTO',
        linkedin: 'https://www.linkedin.com/in/alicejohnson',
        description: 'Alice is a brilliant technologist, driving our technical strategy and leading our engineering team.  She has a knack for solving complex problems.',
        image: 'https://source.unsplash.com/random/150x150/?portrait&2',
    },
    {
        name: 'Bob Williams',
        position: 'Marketing Director',
        linkedin: 'https://www.linkedin.com/in/bobwilliams',
        description: 'Bob is a creative marketing expert, responsible for our brand and marketing efforts. He is passionate about connecting with our customers.',
        image: 'https://source.unsplash.com/random/150x150/?portrait&3',
    },
    
];

const TeamProfileCard = ({ member }) => {
    const [isOpen, setIsOpen] = useState(false);

    const cardClasses = [
        'group',
        'overflow-hidden',
        'transition-all',
        'duration-300',
        'border-blue-800',
        'bg-gradient-to-br',
        'from-blue-800/90',
        'to-blue-950/90',
        'hover:shadow-lg',
        'hover:shadow-blue-600',
        'focus-within:ring-2',
        'focus-within:ring-blue-900',
        'backdrop-blur-md',
        'rounded-lg'
    ].join(' ');

    const buttonClasses = [
      "text-gray-400",
      "hover:text-blue-400",
      "transition-colors",
      "bg-transparent",
      "border-none",
      "p-0",
      "cursor-pointer"
    ].join(" ");
    
    return (
        <div
            className={cardClasses}
        >
            <div className="space-y-4 p-4" onClick={() => setIsOpen(!isOpen)}>
                <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-700">
                        <img
                            src={member.image}
                            alt={member.name}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                        <p className="text-sm text-gray-400">{member.position}</p>
                    </div>
                    <div className="ml-auto">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(member.linkedin, '_blank');
                            }}
                            className={buttonClasses}
                        >
                            <Linkedin className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="ml-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-gray-400 transition-transform" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400 transition-transform" />
                        )}
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden p-4"
                    >
                        <p className="text-sm text-gray-300 mb-4">{member.description}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const TeamProfiles = () => {
    const titleRef = useRef(null);
      const subtitleRef = useRef(null);
    
      useScrollFadeIn(titleRef);
      useScrollFadeIn(subtitleRef, { duration: 1, start: "top 70%" });
    return (
        <div ref={titleRef} className="lg:py-12 py-7">
            <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
      initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6 }}> <div className="text-center mb-10">
                    <h2 className="text-center  xl:text-7xl sm:text-5xl lg:text-8xl md:text-5xl text-4xl font-[ClashDisplay-Semibold] sm:pb-16 pb-5">
                       Our <span className='text-blue-700' >Team</span>
                    </h2>
                    <p className="mt-3 text-base text-gray-800 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto">
                        Meet our talented team of professionals.
                    </p>
                </div></motion.div>
                   <motion.div
      initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6 }}>  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamData.map((member, index) => (
                        <TeamProfileCard key={index} member={member} />
                    ))}
                </div></motion.div>
            </div>
        </div>
    );
};

export default TeamProfiles;
