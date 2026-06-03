import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, HeartPulse, Sparkles, Activity, Flame, PersonStanding, Users, Salad, Presentation, Target, X } from 'lucide-react';

const SERVICES = [
  { id: 1, title: 'Strength Training', desc: 'Build muscle mass and increase overall body strength with our free weights and guided machines.', icon: Dumbbell, bookable: false },
  { id: 2, title: 'Weight Loss Programs', desc: 'Structured cardio and HIIT routines designed specifically for maximum calorie burn.', icon: Flame, bookable: false },
  { id: 3, title: 'Muscle Gain Programs', desc: 'Hypertrophy focused training regimens aimed at increasing lean muscle mass.', icon: Activity, bookable: false },
  { id: 4, title: 'Personal Training', desc: 'One-on-one coaching with certified experts to ensure perfect form and faster results.', icon: PersonStanding, bookable: true },
  { id: 5, title: 'Functional Training', desc: 'Improve your daily movement mechanics with kettlebells, battle ropes, and plyometrics.', icon: HeartPulse, bookable: false },
  { id: 6, title: 'Zumba Classes', desc: 'Fun and energetic dance workouts that burn massive calories to upbeat music.', icon: Users, bookable: true },
  { id: 7, title: 'Yoga Classes', desc: 'Enhance flexibility, core strength, and mental focus in our dedicated studio space.', icon: Sparkles, bookable: true },
  { id: 8, title: 'Nutrition Consultation', desc: 'Personalized dietary plans to complement your training and accelerate progress.', icon: Salad, bookable: true },
  { id: 9, title: 'Aerobics', desc: 'High energy rhythmic routines improving cardiovascular endurance and stamina.', icon: Presentation, bookable: true },
  { id: 10, title: 'Body Transformation', desc: 'Comprehensive programs combining custom workouts and strict nutrition planning.', icon: Target, bookable: false }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBookClick = (service: any) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to book a session');
      navigate('/login');
      return;
    }
    setSelectedService(service);
    setStatus('');
    setBookingDate('');
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !selectedService) return;
    
    setLoading(true);
    setStatus('');
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          serviceId: selectedService.id,
          serviceName: selectedService.title,
          date: bookingDate
        })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setStatus('success');
        setTimeout(() => setSelectedService(null), 2000);
      } else {
        setStatus(data.error || 'Failed to book session');
      }
    } catch (err) {
      setStatus('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full bg-black py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm mb-2">Our Expertise</h2>
          <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-widest text-white">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-600">Services</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900 border border-white/5 p-8 group hover:border-[#D4AF37]/50 transition-colors flex flex-col h-full"
            >
              <div className="w-16 h-16 bg-black flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors">
                <service.icon className="w-8 h-8 text-[#D4AF37] group-hover:text-black transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed flex-1">
                {service.desc}
              </p>
              
              {service.bookable && (
                <button 
                  onClick={() => handleBookClick(service)}
                  className="mt-6 w-full py-3 border border-[#D4AF37] text-[#D4AF37] font-bold uppercase tracking-widest text-sm hover:bg-[#D4AF37] hover:text-black transition-colors"
                >
                  Book Session
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Booking Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-950 border border-white/10 w-full max-w-md p-6 relative"
          >
            <button 
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-serif text-white uppercase tracking-widest mb-2 mt-2">Book a Session</h2>
            <p className="text-[#D4AF37] uppercase tracking-widest text-sm mb-6">{selectedService.title}</p>
            
            {status === 'success' ? (
              <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-4 text-center my-8">
                Booking confirmed! We will see you there.
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 my-6">
                {status && status !== 'success' && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 text-sm text-center">
                    {status}
                  </div>
                )}
                
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Select Date & Time</label>
                  <input
                    type="datetime-local"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                    min={new Date().toISOString().slice(0, 16)}
                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-sm py-4 hover:bg-white transition-colors disabled:opacity-50 mt-4"
                >
                  {loading ? 'Confirming...' : 'Confirm Booking'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
