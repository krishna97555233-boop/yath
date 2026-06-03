import { motion } from 'motion/react';
import aboutImage from '../assets/images/premium_gym_about_image_1780394299959.png';

export default function About() {
  return (
    <div className="flex flex-col flex-1 w-full bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm mb-2">Our Story</h2>
            <h1 className="text-4xl md:text-5xl font-serif uppercase tracking-widest text-white mb-6">Built For Excellence</h1>
            <p className="text-gray-400 mb-6 leading-relaxed">
              La Fitnesse Select was born out of a vision to provide a luxury fitness experience in the heart of Noida. We believe that fitness is not just a routine, it's a lifestyle. Our facility spans over 10,000 sq ft, equipped with the latest imported biomechanical machines.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We focus on community, personalized coaching, and measurable results. Whether you are beginning your journey or you are an elite athlete, our doors are open to help you achieve your goals.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="aspect-square relative flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#D4AF37]/20 border border-[#D4AF37] rotate-6 transform"></div>
            <img loading="lazy" src={aboutImage} alt="Gym" className="relative z-10 w-full h-full object-cover block" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
