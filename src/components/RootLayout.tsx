import { Outlet, Link, useLocation } from 'react-router-dom';
import { Dumbbell, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Membership', path: '/membership' },
  { name: 'Trainers', path: '/trainers' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Diet Cafe', path: '/cafe' },
  { name: 'Contact', path: '/contact' },
];

export default function RootLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-gold/30 selection:text-gold flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <Link to="/" className="flex items-baseline space-x-2 group">
              <Dumbbell className="h-6 w-6 text-[#D4AF37] group-hover:rotate-12 transition-transform duration-300 hidden sm:block" />
              <span className="text-3xl font-serif font-bold tracking-tighter text-[#D4AF37]">LA FITNESSE</span>
              <span className="text-sm uppercase tracking-widest text-white/60">Select</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex space-x-8 text-xs uppercase tracking-widest font-medium">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      "transition-colors hover:text-[#D4AF37]",
                      location.pathname === link.path ? "text-[#D4AF37]" : "text-gray-300"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="px-6 py-2 border border-white/20 text-white text-xs uppercase tracking-widest hover:border-white transition-all duration-300 font-bold"
                >
                  Admin Login
                </Link>
                <Link
                  to="/membership"
                  className="px-6 py-2 border border-[#D4AF37] text-[#D4AF37] text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-bold"
                >
                  Join Now
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-white/10 bg-black/95 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4 flex flex-col">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "text-base font-medium tracking-wide uppercase",
                      location.pathname === link.path ? "text-[#D4AF37]" : "text-gray-300"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/membership"
                  className="bg-[#D4AF37] text-black px-6 py-3 font-bold uppercase tracking-wide text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Join Now
                </Link>
                <Link
                  to="/login"
                  className="bg-black border border-white/20 text-white px-6 py-3 font-bold uppercase tracking-wide text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pt-20 flex flex-col">
        <Outlet />
      </main>

      {/* Floating Action Button for WhatsApp (Requested change color from orange to another) */}
      <a
        href="https://wa.me/918287715938"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 h-14 w-14 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-full flex items-center justify-center shadow-lg shadow-black/50 hover:scale-110 transition-transform z-50"
        title="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-white/5 py-10 lg:h-32 flex items-center mt-auto">
        <div className="max-w-7xl mx-auto px-4 lg:px-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] mb-1 font-bold">Location</span>
              <span className="text-xs leading-tight text-white/70">3rd Floor Dharam Palace, Sector 18, Noida, UP 201301</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] mb-1 font-bold">Connect</span>
              <span className="text-xs text-white/70 font-mono">+91 82877 15938</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] mb-1 font-bold">Hours</span>
              <span className="text-xs text-white/70">Mon–Sat: 6 AM – 10 PM<br/>Sun: 9 AM - 5 PM</span>
            </div>
            <div className="flex md:justify-end items-center">
              <div className="flex space-x-2">
                <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors cursor-pointer text-white/70">IG</a>
                <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors cursor-pointer text-white/70">FB</a>
                <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors cursor-pointer text-white/70">YT</a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-4 flex justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} La Fitnesse Select.</p>
            <Link to="/admin" className="hover:text-[#D4AF37] transition-colors">Admin Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
