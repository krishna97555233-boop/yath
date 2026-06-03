import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Star, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/images/premium_gym_hero_1780394031381.png';

const SERVICES = [
  { title: 'Personal Training', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600' },
  { title: 'Functional Training', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600' },
  { title: 'Weight & Strength', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=600' },
  { title: 'Yoga & Pilates', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600' },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full relative">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img loading="lazy" 
            src={heroImage} 
            alt="Gym Hero" 
            className="w-full h-full object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center pt-24 text-[120px] md:text-[250px] font-serif font-black text-white/[0.03] leading-none select-none pointer-events-none z-0">
          GOLD
        </div>
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h2 className="text-[#D4AF37] uppercase tracking-[0.3em] pl-[0.3em] text-sm mb-6 font-bold flex items-center justify-center gap-4">
              <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
              Exclusive Fitness Experience
              <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
            </h2>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif leading-none mb-4 tracking-tight">
              LA FITNESSE
              <span className="block text-4xl md:text-6xl lg:text-7xl italic font-light text-[#D4AF37] mt-2 tracking-normal">Select</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl font-medium tracking-wide max-w-2xl mx-auto mt-6 mb-12 leading-relaxed">
              Welcome to the most premium fitness facility in Noida. State-of-the-art equipment, elite trainers, and an atmosphere built for champions.
            </p>
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.3 }}
               className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link to="/membership" className="bg-[#D4AF37] text-black px-12 py-5 font-bold uppercase tracking-widest text-sm hover:bg-white transition-all transform hover:scale-105 active:scale-95 duration-300">
                Join Now
              </Link>
              <Link to="/membership" className="group flex items-center gap-3 text-white px-8 py-5 font-bold uppercase tracking-widest text-sm hover:text-[#D4AF37] transition-all">
                Membership Plans
                <span className="block w-8 h-[1px] bg-white group-hover:bg-[#D4AF37] transition-colors group-hover:w-12"></span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm mb-2">Our Offerings</h2>
            <h3 className="text-4xl font-serif uppercase text-white tracking-widest">Elite Services</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-[400px] overflow-hidden cursor-pointer"
              >
                <img loading="lazy" src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <h4 className="text-xl font-bold uppercase tracking-wider text-white group-hover:text-[#D4AF37] transition-colors">{service.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/services" className="inline-flex items-center gap-2 text-white hover:text-[#D4AF37] uppercase tracking-widest font-semibold transition-colors">
              View All Services <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-zinc-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm mb-2">The La Fitnesse Edge</h2>
              <h3 className="text-4xl font-serif uppercase text-white tracking-widest mb-8">Why We Stand Above The Rest</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {[
                  'Air Conditioned Gym', 
                  'Modern Imported Equipment', 
                  'Free WiFi', 
                  'Parking Facility', 
                  'Changing Rooms', 
                  'Locker Facility', 
                  'Certified Trainers', 
                  'Music System'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <p className="text-base text-gray-300 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square relative overflow-hidden border border-white/10 p-2">
                 <img loading="lazy" src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800" alt="Gym Facility" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-[#D4AF37]/10 mix-blend-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
